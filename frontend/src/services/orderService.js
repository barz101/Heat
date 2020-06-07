import httpService from './httpService';
export default {
    query,
    queryBySeller,
    queryByBuyer,
    add,
    update,
    queryAll
}


function queryAll() {
    return httpService.get(`order`)
}
// should have called it get!
function query(orderId) {
    return httpService.get(`order/${orderId}`)
}
function queryBySeller(sellerId) {
    return httpService.get(`order/seller/${sellerId}`)
}
function queryByBuyer(buyerId) {
    return httpService.get(`order/buyer/${buyerId}`)
}
async function add(newOrder) {
    return httpService.post(`order`, newOrder);
}


function update(order) {
    return httpService.put(`order/${order._id}`, order);
}

// function queryAll() {
//   return  httpService.get(`order`)
// }


// function get(userId) {
//     console.log('id',userId);

//     return httpService.get(`user/${userId}`)
// }

// function update(user) {
//     console.log('i am in update at productservice', user._id)
//     return httpService.put(`user/${user._id}`, user);
//   }
