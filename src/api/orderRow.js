import {
    axios,
} from '.';

export async function deleteOrderRow(id) {
    console.log("api-call deleteOrderRow");
    const {
        data
    } = await axios({
        method: 'delete',
        url: `/order_rows/${id}`,
    });
    return data;
}


export async function getAllOrderRowsInOrder(orderID) {
    console.log("api-call getAllOrderRowsInOrder");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/order_rows/byOrderID/${orderID}`,
    });
    return data;
}


export async function getOrderRowById(id) {
    console.log("api-call getOrderRowById");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/order_rows/${id}`,
    });
    return data;
}


export async function getAllOrderRows(){
    console.log("api-call getAllOrderRows");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/order_rows/`
    });
    return data;
}

export async function createOrderRow(newOrder){
    console.log("api-call createOrderRow");
    const {
        data
    } = await axios({
        method: 'post',
        url: `/order_rows/`,
        data : newOrder,
    });
    return data;
}