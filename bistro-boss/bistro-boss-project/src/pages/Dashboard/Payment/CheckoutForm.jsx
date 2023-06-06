import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecrect, setClientsecrect] = useState('');
    console.log(clientSecrect);
    useEffect(() => {
        axiosSecure.get('/create-payment-intent', { price })
            .then((res) => {
                setClientsecrect(res.data.clientSecret);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,

                })
            })
    }, [price, axiosSecure])
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message);
        }
        else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError(' ');
        }
        const { paymentIntent, error: confirmedError } = await stripe.confirmCardPayment(
            clientSecrect,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            },
        )
        if (confirmedError) {
            console.log(confirmedError);
        }
        console.log(paymentIntent);
    }
    return (
        <div>
            <p className="text-4xl ms-96 mb-3" >Payment</p>
            <form className=" w-full " onSubmit={handleSubmit}>
                <CardElement
                    className=" mt-3 mb-3"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-outline btn-primary mt-2 w-24 ms-96" type="submit" disabled={!stripe && !clientSecrect}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600" >{cardError}</p>}
        </div>
    );
};

export default CheckoutForm;