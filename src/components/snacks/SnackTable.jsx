import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useParams} from "react-router-dom";
import {useSnack} from "../../context/SnackProvider";
import {useEffect} from "react";
import {styled} from "@mui/material/styles";

const columns = [{id: 'name', label: 'Naam', minWidth: 170}, {id: 'price', label: 'Price', minWidth: 180},];


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function SnackTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const snackbarId = useParams();
    const {snacks, getAllSnacksInSnackbar, loading, error} = useSnack();
    let [snacksInSnackbar, setSnacksInSnackbar] = React.useState([]);

    useEffect(() => {
        const fetchSnacks = async () => {
            let currentSnack = await getAllSnacksInSnackbar(snackbarId);
            setSnacksInSnackbar(currentSnack);
        }
        fetchSnacks();

    }, []);

    if (loading) {
        return (<p>loading</p>);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (<Paper sx={{ overflow: 'hidden', margin : 'auto'}}>
        <TableContainer sx={{maxHeight: 800}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" sx={{width : 350}}>Naam</StyledTableCell>
                        <StyledTableCell align="center" sx={{width : 350}}>Prijs</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {snacksInSnackbar.map((snack) => {
                        return (<TableRow hover role="checkbox" tabIndex={-1} key={snack.snack_id} >
                            <TableCell align="center">
                                {snack.naam}
                            </TableCell>
                            <TableCell align="center">
                                {snack.prijs}
                            </TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>);
}
