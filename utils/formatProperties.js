const camelCaseToSnakeCase = (obj) => {
    
    const newObj = {};
    
    Object.keys(obj).map(prop => {
        if (prop != "_id") {
            (/([a-z])([A-Z])/g).test(prop) ? newObj[prop.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()] = obj[prop] : newObj[prop] = obj[prop] ;
        }
        else {
            newObj[prop] = obj[prop]
        }
    });

    return newObj;
}

const snakeCaseToCamelCase = (obj) => {
    
    const newObj = {};

    Object.keys(obj).map(prop => {
        if (prop != "_id") {
            const camelCase = prop.replace(/_([a-z])/g, (match, letter) => {
                return letter.toUpperCase();
        });

        newObj[camelCase] = obj[prop];
        }
        else {
            newObj[prop] = obj[prop]
        }
    });

    return newObj;
}

module.exports = { camelCaseToSnakeCase, snakeCaseToCamelCase };