import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import {useOrder} from "../../context/OrderProvider";
import {useEffect, useState} from "react";
import {useOrderRow} from "../../context/OrderRowProvider";
import {Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black, color: theme.palette.common.white,
    }, [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }, // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function OrderOverView() {
    const orderId = useParams().id;
    const {getOrderById, currentOrder, setCurrentOrderId, currentOrderDetails, refreshCurrentOrder} = useOrder();
    const {getAllOrderRowsInOrder, deleteOrderRow} = useOrderRow();
    const {currentOrderRows} = useOrderRow();


    if (currentOrder && currentOrderRows && currentOrder.data && currentOrder.data[0]) {
        return (<>
            {<div className={"w-3/4 mx-auto pt-6"}>
                <Typography variant="h4" gutterBottom>
                    Your Current Order:
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Naam</StyledTableCell>
                                <StyledTableCell align="center">Prijs</StyledTableCell>
                                <StyledTableCell align="center">Verwijder</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentOrderRows.map((order_row) => (<StyledTableRow key={order_row.order_row_id}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {order_row.naam}
                                </StyledTableCell>
                                <StyledTableCell align="center">{order_row.prijs}</StyledTableCell>
                                <StyledTableCell align="center"><DeleteForeverIcon onClick={ async () => {
                                    await deleteOrderRow(order_row.order_row_id);
                                    console.log(currentOrder.data[0].order_id)
                                    refreshCurrentOrder();
                                }
                                }/></StyledTableCell>
                            </StyledTableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>}
            <span className={" mx-auto flex flex-row justify-evenly pt-6"}>
                <div className={"mx-auto w-1/3"}>
                    <Typography variant="h4" gutterBottom>
                              Totaal te bestellen:
                         </Typography>
                      <TableContainer component={Paper}>
                        <Table className={"w-1/3"} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Naam</StyledTableCell>
                                    <StyledTableCell align="center">Prijs</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentOrderDetails.snackTotals.map((snackTotal) => (<StyledTableRow key={snackTotal.naam}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {snackTotal.naam}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{snackTotal.count}</StyledTableCell>
                                </StyledTableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                   <div className={"mx-auto w-1/3"}>
                       <Typography className={"m-3"} variant="h4" gutterBottom>
                              Totaal te betalen:
                         </Typography>
                        <TableContainer component={Paper}>
                        <Table className={"w-1/3"} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Naam</StyledTableCell>
                                    <StyledTableCell align="center">Prijs</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentOrderDetails.payments.map((payment) => (<StyledTableRow key={payment.user_name}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {payment.user_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{payment.som}</StyledTableCell>
                                </StyledTableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                   </div>
                </span>
        </>);
    } else {
        return <p>loading</p>;
    }
}
