import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js"

type props = {
  clientSecret: string,
  amount : number
}

const StripePaymentGateway = ({ clientSecret,amount }: props) => {

  const stripePromise = loadStripe("pk_test_51PtJgy05p6nwFzXtRCDRTisnlwo4GrZGV4KA6B0gQIEdNqRMxgVlxx0GfdnHNFD4Vu3lEDimIfsymcTNfVk65mya00amHaFOwd");

  const options: StripeElementsOptions = {
    clientSecret : clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <Elements stripe={stripePromise} options={options} >
      <CheckoutForm amount={amount} />
    </Elements >
  )
}

export default StripePaymentGateway