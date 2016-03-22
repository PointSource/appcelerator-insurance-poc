var data = {};
function setCurrentPolicy (obj){
    data.currentPolicy = obj;
}
function getCurrentPolicy () {  
    return data.currentPolicy;
}

// The special variable 'exports' exposes the functions as public
exports.setCurrentPolicy = setCurrentPolicy;
exports.getCurrentPolicy = getCurrentPolicy;