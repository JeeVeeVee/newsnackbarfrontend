import {
    axios,
} from '.';

export async function getAllSnacksInSnackbar(SnackbarId) {
    console.log("api-call getAllSnacksInSnackbar");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snacks/bySnackbar/${SnackbarId}`
    });
    return data;
}


export const getAllSnacks = async () => {
    console.log("api-call getAllSnacks");
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snacks/`
    });
    return data;
}