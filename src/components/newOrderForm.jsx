import {useForm} from "react-hook-form";
import {useAuth0} from "@auth0/auth0-react";
import {useSnackbar} from "../context/SnackbarProvider";
import {useOrder} from "../context/OrderProvider";
import { useNavigate } from "react-router-dom";



const validationRules = {
    order_naam: {
        required: "you must name your orders"
    }, date: {
        required: 'please tell us when your order will be ordered'
    }, snackbar_id: {
        required: 'you have to tell us which snackbar you are ordering from'
    },
}

export default function NewOrderForm() {
    const {getAccessTokenSilently} = useAuth0();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createOrder} = useOrder();
    const {snackbars, loading} = useSnackbar();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        let result = await createOrder(data);
        console.log(result[0].order_id);
        //console.log(result.data[0].order_id)
        let order_id =result[0].order_id
        await navigate("/orders/" + order_id);
    }

    const restos = snackbars;
    return (<>
        <div className={"my-6"}>
            <form
                className="w-max mx-auto my-auto"
                onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("order_naam", validationRules.order_naam)}
                    placeholder="bestelling naam"
                />

                <input
                    type="date"
                    {...register("date", validationRules.date)}
                    placeholder="datum"
                />

                <select
                    {...register("snackbar_id", validationRules.snackbar_id)}
                >
                    <option value="">
                        Kies...
                    </option>
                    {loading ? (<p>loading</p>) : (restos.data.map((resto) => (<option
                        key={resto.snackbar_id}
                        value={resto.snackbar_id}
                    >
                        {resto.naam}
                    </option>)))}
                </select>
                {errors["order_naam"] && (<p data-cy="labelinput-error-order-naam" className="text-red-500">
                    {errors["order_naam"].message}
                </p>)}
                {errors["date"] && (<p data-cy="labelinput-error-order-date" className="text-red-500">
                    {errors["date"].message}
                </p>)}
                {errors["snackbar_id"] && (<p data-cy="labelinput-error-snackbar-id" className="text-red-500">
                    {errors["snackbar_id"].message}
                </p>)}
                <br/>
                {getAccessTokenSilently ? <input
                    className={"w-min mx-auto my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                    type="submit" cy-data={"submit-new-order-btn"}/> : <></>}
            </form>
        </div>
    </>);
}
