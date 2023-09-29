const formatObject = (param) => {
    if (param instanceof Array) {
        const arrObject = [];

        param.map(item => {
            const formatedObject = {};
        
            Object.keys(item._doc).map(prop => {
                if (prop == "_id") {
                    formatedObject["_id"] = item._id;
                }
                else {
                    formatedObject[prop] = item[prop];
                }
            });
        
            arrObject.push(formatedObject);
        });

        return arrObject;
    }
    else if (param instanceof Object) {
        const formatedObject = {};
        
            Object.keys(param._doc).map(prop => {
                if (prop == "_id") {
                    formatedObject["_id"] = param._id;
                }
                else {
                    formatedObject[prop] = param[prop];
                }
            });
        
            return formatedObject;
    }
};

module.exports = formatObject;