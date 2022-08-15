import {
    axios,
} from '.';

export async function getAllOrders(){
    const {
        data
    } = await axios({
        method: 'get',
        url: `/orders/`
    });
    return data;
}

export async function createOrder(newOrder){
    const {
        data
    } = await axios({
        method: 'post',
        url: `/orders/`,
        data : newOrder,
    });
    return data;
}