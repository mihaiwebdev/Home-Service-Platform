const geocoder = require('../utils/geocoder');

const filteredResult = (model, populate) => async (req, res, next) => {
    let query;
    let loc;
    let lat;
    let long;

    const reqQuery = {...req.query};
    const { zipcode, countryCode } = req.params;

    if (zipcode && countryCode) {
        const locationQuery = `${zipcode} ${countryCode}`;
        
        loc = await geocoder.geocode(locationQuery);
        
        lat = loc[0].latitude;
        long = loc[0].longitude;
    };
    
    const radius = 20 / 6378;

    reqQuery.location = { $geoWithin: { $centerSphere: [ [long, lat], radius ]}};
    
    const removeFields = ['sort', 'limit', 'page'];
    removeFields.map(field => delete reqQuery[field]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|elemMatch)\b/g, match => `$${match}`);

    query = model.find(JSON.parse(queryStr));

    if (req.query.sort) {
        const sortBy = req.query.sort.replace(',', ' ');
        query.sort(sortBy);
    };

    if (populate)
        query.populate(populate);
    
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = await query.skip(startIndex).limit(limit);

    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    };
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit
        }
    };

    const result = await query;

    res.filteredResult = {
        success: true,
        count: result.length,
        pagination,
        data: result
    }

    next();
};

module.exports = filteredResult;