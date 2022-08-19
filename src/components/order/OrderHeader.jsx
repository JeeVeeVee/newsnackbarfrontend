import * as React from 'react';
import {useSnackbar} from "../../context/SnackbarProvider";
import {useOrder} from "../../context/OrderProvider";
import Typography from "@mui/material/Typography";


export default function OrderHeader() {

    const {currentOrder} = useOrder();
    const {currentSnackbar} = useSnackbar();

    if ( currentOrder && currentOrder.data && currentOrder.data[0] && currentSnackbar) {
        return (<>.
            <div className={"mx-3"}>
                <Typography variant="h2" gutterBottom>
                    {currentOrder.data[0].order_naam}
                </Typography>
                <p>This orders is due for {currentOrder.data[0].date},and created  by {currentOrder.data[0].created_by}.</p>
                <p>You can pick any snacks from {currentSnackbar[0].naam}</p>
            </div>
        </>);
    }
    return (<>

        </>
    );
}
