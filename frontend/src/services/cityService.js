import httpService from './httpService';

export default {
    query,
    getById
}

function query() {
    return httpService.get('city')
}

function getById(cityId) {
    return httpService.get(`city/${cityId}`)
}