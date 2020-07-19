import httpService from './httpService';
export default {
    // query,
    query,
    get,
    update,
    getFav,
    // queryAllFilter
}
// JsonServer
// function query(cityId) {
//     return httpService.get(`user?product.city._id=${cityId}`)
// }

// ToDo - change that
// function query(cityId) {
//     return httpService.get(`user/city/${cityId}`)
// }

// function queryAll(filterBy) {
//     return httpService.get(`user`)
// }

function query(filterBy) {
    if (!filterBy) return httpService.get(`user`)
    // console.log('filterBy', filterBy)
    var queryStr = `?city=${filterBy.city}&category=${filterBy.category}`;
    // console.log('queryStr', queryStr)
    return httpService.get(`user${queryStr}`)
}

function getFav(favIds) {
    var query = '?';
    favIds.forEach((favId, idx) => {
        query += `id${idx}=${favId}&`
    });
    return httpService.get(`user/fav/${query}`)
}

function get(userId) {
    return httpService.get(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user);
}
