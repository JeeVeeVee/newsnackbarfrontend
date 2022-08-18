import {
    axios,
} from '.';

export async function getOrderById(id) {
    console.log("api-call getOrderById");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/orders/${id}`,
    });
    return data;
}


export async function getAllOrders(){
    console.log("api-call getAllOrders");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/orders/`
    });
    return data;
}

export async function createOrder(newOrder){
    console.log("api-call createOrder");
    const {
        data
    } = await axios({
        method: 'post',
        url: `/orders/`,
        data : newOrder,
    });
    return data;
}