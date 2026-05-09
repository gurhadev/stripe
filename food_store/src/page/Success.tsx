import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import AxiosIntance from "../utils/AxiosInstance";

type PaymentDetailsType = {
  id: string,
  amount: number,
  status: string,
  payment_method: string,
  latest_charge: string,
  currency: string,
  created: number,
  livemode: boolean,
}

const Success = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [paymentDetails,setPaymentDetails] = useState<PaymentDetailsType | null>(null);
  const id: string | null = searchParams.get("payment_intent");

  const getPaymentDetails = async (id: string | null): Promise<void> => {
    try {
      const response = await AxiosIntance.get(`/payment/${id}`);
      const data: PaymentDetailsType = response.data.data;
      setPaymentDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPaymentDetails(id);
  }, [id]);

  useEffect(()=>{
    if(!id){
      navigate("/");
    }
  },[[id]])


  return (
    <div style={{ flexDirection: "column" }} className="w-full p-4 bg-slate-400 flex items-center justify-center">
      {paymentDetails ?  <div><h1 className="text-3xl text-white">Thank You ruppes {(paymentDetails?.amount || 0) / 100} pay.</h1>
      <h1 className="text-2xl text-white">{paymentDetails?.id}</h1></div> : <div className="">Loading...</div>}
      <button className="mt-2 px-10 py-2 rounded-md bg-blue-600 text-white transition-all duration-500 cursor-pointer hover:bg-blue-900">
        <Link to={`/`}>Shop Now</Link>
      </button>
    </div>
  )
}

export default Success