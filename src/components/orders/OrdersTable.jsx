import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {styled} from "@mui/material/styles";
import {useAuth} from "../../context/AuthProvider";
import {useOrder} from "../../context/OrderProvider";
import {Link} from "react-router-dom";



const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black, color: theme.palette.common.white,
    }, [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function OrdersTable() {

    const {orders, loading} = useOrder();
    const {ready} = useAuth();

    if (loading && !ready) {
        return (<p>loading</p>);
    }


    return (<Paper sx={{overflow: 'hidden', margin: 'auto'}}>
        <TableContainer sx={{maxHeight: 800}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" sx={{width: 350}}>Name</StyledTableCell>
                        <StyledTableCell align="center" sx={{width: 350}}>Your price</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => {
                        return (<TableRow hover role="checkbox" tabIndex={-1} key={order.order_id}>
                                <TableCell align="center">
                                    <Link to={"/orders/" + order.order_id}>
                                        {order.order_naam}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    jouw prijs hier
                                </TableCell>
                            </TableRow>);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>);
}
