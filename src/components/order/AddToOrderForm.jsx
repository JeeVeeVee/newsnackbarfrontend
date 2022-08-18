import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSnack} from "../../context/SnackProvider";
import {useOrder} from "../../context/OrderProvider";
import {useForm} from "react-hook-form";
import {useOrderRow} from "../../context/OrderRowProvider";


const validationRules = {
    order_naam: {
        required: "you must name your orders"
    }, date: {
        required: 'please tell us when your order will be ordered'
    }, snackbar_id: {
        required: 'you have to tell us which snack you want'
    },
}

export default function AddToOrderForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const orderId = useParams().id;
    const {currentOrder, getOrderById, setCurrentOrder, refreshCurrentOrder} = useOrder();
    const {currentSnack} = useSnack();
    const {createOrderRow, getAllOrderRowsInOrder} = useOrderRow();


    const onSubmit = async (data) => {
        data["order_id"] = currentOrder.data[0].order_id;
        await createOrderRow(data);
        await refreshCurrentOrder();
    }
    if(currentOrder && currentSnack){
        return (<>
            <div className={"my-6"}>
                <form
                    className="w-max mx-auto my-auto"
                    onSubmit={handleSubmit(onSubmit)}>
                    <select
                        {...register("snack_id", validationRules.snackbar_id)}
                    >
                        <option value="">
                            Kies...
                        </option>
                        {currentSnack.map((snack) => (<option
                            key={snack.snack_id}
                            value={snack.snack_id}
                        >
                            {snack.naam}
                        </option>))}
                    </select>
                    <input
                        className={"w-min mx-auto my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        type="submit"/> : <></>}
                </form>
            </div>
        </>);
    }
    return (<></>);
}
