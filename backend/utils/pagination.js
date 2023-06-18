
const pagination = (data, pageNum) => {

    const page = +pageNum || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = data.length;

    const slicedData = data.slice(startIndex, endIndex);

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

    const result = {
        success: true,
        count: slicedData.length,
        pagination,
        data: slicedData,
    };

    return result;
};

module.exports = pagination;