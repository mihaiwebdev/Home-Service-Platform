const Service = require('../models/Service');

const filteredResult = (model, populateOne, populateTwo) => async (req, res, next) => {
    let query;
    const reqQuery = {...req.query};

    const removeFields = ['sort', 'limit', 'page'];
    removeFields.map(field => delete reqQuery[field]);

    // change in reqQuery obj the service slug value with id
    // let serviceQuery = reqQuery['services'];
    // if (serviceQuery) {
    //     const service = await Service.findOne({slug: serviceQuery.in})
    //     reqQuery.services.in = service._id
    // };
    console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // query = model.find(JSON.parse(queryStr))
    query = model.find({'services.type' : 'curatenie'})

    if (populateOne)
        query.populate(populateOne);
    
    if (populateTwo)
        query.populate(populateTwo);

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