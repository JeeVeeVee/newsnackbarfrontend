import {
    axios,
} from '.';

export async function getSnackBarById(id) {
    console.log("api-call getSnackBarById");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snackbars/${id}`,
    });
    return data;
}


export const getAllSnackBars = async () => {
    console.log("api-call getAllSnackBars");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snackbars/`
    });
    return data;
}