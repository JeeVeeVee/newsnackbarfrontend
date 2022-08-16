import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSnackbar} from "../../context/SnackbarProvider";
import {RestaurantMenu} from "@mui/icons-material";
import {Link} from "@mui/material";

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

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

export default function SnackbarTable() {
    const {snackbars, loading, error} = useSnackbar();

    return (
        <>
            {
                loading ? (<p>loading</p>) : (<TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Naam</StyledTableCell>
                                <StyledTableCell align="center">Locatie</StyledTableCell>
                                <StyledTableCell align="center">Postcode</StyledTableCell>
                                <StyledTableCell align="center">Menu</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {snackbars.data.map((snackbar) => (<StyledTableRow key={snackbar.snackbar_id}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {snackbar.naam}
                                </StyledTableCell>
                                <StyledTableCell align="center">{snackbar.straat}</StyledTableCell>
                                <StyledTableCell align="center">{snackbar.stad}</StyledTableCell>
                                <StyledTableCell align="center"><Link
                                    href={"/snackbars/" + snackbar.snackbar_id}><RestaurantMenu/></Link></StyledTableCell>
                            </StyledTableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>)
            }
        </>
    );
}
