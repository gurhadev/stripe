import { useLayoutEffect, useState, memo } from "react"
import { lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosIntance from "../utils/AxiosInstance";

const StripePaymentGateway = lazy(() => import('../component/StripePaymentGateway'));

type Data = {
    clientSecret: string;
    status: boolean;
    message: string;
}

const PaymentPage = () => {
    const [clientSecret, setCLientSecret] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { amount } = useParams();
    const navigate = useNavigate();

    async function getClientSecret(): Promise<void> {
        try {
            setLoading(true);
            
            const response = await AxiosIntance.post("/create-checkout-indent",{amount : amount});

            const data : Data = response.data ; 
            setLoading(false)
            setCLientSecret(data.clientSecret);

        } catch (error : any) {
            setLoading(false)
            toast(error?.response?.data?.error, {
                type: "error"
            })
            navigate('/');
        }
    }


    useLayoutEffect(() => {
        getClientSecret();
    }, []);

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-85 pt-30">
                {clientSecret && !loading ? <StripePaymentGateway clientSecret={clientSecret} amount={Number(amount)} /> : <p>loading...</p>}
          
            </div>
        </div>
    )


}

export default memo(PaymentPage);