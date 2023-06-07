import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    return (
        <div className=" mx-10" >
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className="mx-56 mb-48">
                <SectionTitle
                    heading={"--PAYMENT GATEWAY--"}
                    subHeading={"Your Payment is always secure here"}
                ></SectionTitle>
            </div>
            <Elements stripe={stripePromise} >
                <CheckoutForm cart={cart} price={price} ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;