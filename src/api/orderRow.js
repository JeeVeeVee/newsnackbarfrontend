import {
    axios,
} from '.';

export async function getAllOrderRowsInOrder(orderID) {
    const {
        data
    } = await axios({
        method: 'get',
        url: `/order_rows/byOrderID/${orderID}`,
    });
    return data;
}


export async function getOrderRowById(id) {
    const {
        data
    } = await axios({
        method: 'get',
        url: `/order_rows/${id}`,
    });
    return data;
}


export async function getAllOrderRows(){
    const {
        data
    } = await axios({
        method: 'get',
        url: `/order_rows/`
    });
    return data;
}

export async function createOrderRow(newOrder){
    console.log(newOrder);
    const {
        data
    } = await axios({
        method: 'post',
        url: `/order_rows/`,
        data : newOrder,
    });
    console.log(data);
    return data;
}