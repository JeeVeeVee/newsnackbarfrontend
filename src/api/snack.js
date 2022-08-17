import {
    axios,
} from '.';

export async function getAllSnacksInSnackbar(SnackbarId) {
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snacks/bySnackbar/${SnackbarId}`
    });
    return data;
}


export const getAllSnacks = async () => {
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snacks/`
    });
    return data;
}