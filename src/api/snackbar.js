import {
    axios,
} from '.';

export const getAllSnackBars = async () => {
    const {
        data
    } = await axios({
        method: 'get',
        url: `/snackbars/`
    });
    return data;
}