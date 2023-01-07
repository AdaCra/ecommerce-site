class APIFeatures {
    constructor ( query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Query field removal
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        
        //advanced filter
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultsShownPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsShownPerPage * (currentPage - 1);

        this.query = this.query.limit(resultsShownPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures