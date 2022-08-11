import logo from "../logo.svg";
import {useSnackbar} from "../context/SnackbarProvider";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSnack} from "../context/SnackProvider";

export default function () {
    const snackbarId = useParams();
    console.log(snackbarId.id);
    const {snacks, getAllSnacksInSnackbar,  loading, error} = useSnack();
    const [snacksInSnackbar, setSnacksInSnackbar] = useState([]);

    const getSnacks = useEffect(() => {
        fetchSnacksInSnackbar();
    }, []);

    async function fetchSnacksInSnackbar() {
        const snacks = await getAllSnacksInSnackbar(snackbarId);
        setSnacksInSnackbar(snacks);
    }


    return (<>
        {loading ? <p>loading</p>
            :
            (
                <div className="container">
                    <h1> Lijst van de beschikbare snacks</h1>
                    <table className="table table-bordered">
                        <tr>
                            <th>Naam</th>
                            <th>Prijs</th>
                        </tr>
                        {snacksInSnackbar.map((snack, index) => (
                                <tr key={snack.snack_id}>
                                    <td>{snack.naam}</td>
                                    <td>{snack.prijs}</td>
                                </tr>
                            )
                        )}
                    </table>
                </div>
            )
        }
    </>)
}