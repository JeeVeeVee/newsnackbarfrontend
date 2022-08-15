import {useSnackbar} from "../context/SnackbarProvider";

export default function () {
    const {snackbars, loading, error} = useSnackbar();
    if (snackbars) {
        return (<>
            {loading ? (<p>loading</p>) : (<div className="container">
                    <h1> Lijst van de beschikbare snackbars</h1>
                    <table className="table table-bordered">
                        <tr>
                            <th>Naam</th>
                            <th>Straat</th>
                            <th>PostCode</th>
                        </tr>
                        {snackbars.data.map((snackbar, index) => (

                            <tr key={snackbar.snackbar_id}>
                                <a href={snackbar.snackbar_id}>
                                    <td>{snackbar.naam}</td>
                                </a>
                                <td>{snackbar.straat}</td>
                                <td>{snackbar.stad}</td>
                            </tr>


                        ))}

                    </table>

                </div>)}
        </>)
    } else {
        return (<p>loading</p>)
    }
}