import {
    axios,
} from '.';

export async function getSnackBarById(id) {
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snackbars/${id}`,
    });
    return data;
}


export const getAllSnackBars = async () => {
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snackbars/`
    });
    return data;
}