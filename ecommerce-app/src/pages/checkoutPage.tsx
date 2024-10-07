import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BasketContext } from '../contexts/BasketContext';
import { Button, notification } from 'antd';

const stripePromise = loadStripe('pk_live_51Q7FjR00dtorWeCgRGNal2QGLYUfp2Gz9Jf96GGRQu1YY9l7nWOPv5DYJglUT0v02dDahzXuav5Fzo8JFie2FDC0006VCRtDAM');

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const basketContext = useContext(BasketContext);
    const basketItems = basketContext?.basketItems || [];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            notification.error({
                message: 'Payment Error',
                description: error.message,
            });
        } else {
            notification.success({
                message: 'Payment Successful',
                description: 'Your payment was successful!',
            });
            // Handle successful payment here (e.g., save order to database)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <Button type="primary" htmlType="submit" disabled={!stripe}>
                Pay
            </Button>
        </form>
    );
};

const CheckoutPage: React.FC = () => {
    const basketContext = useContext(BasketContext);
    const basketItems = basketContext?.basketItems || [];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
                <ul>
                    {basketItems.map(item => (
                        <li key={item.id} className="mb-2">
                            {item.name} - {item.brand} - {item.type} x {item.duration} - ${item.price}
                        </li>
                    ))}
                </ul>
                <div className="font-bold">
                    Total: ${basketItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default CheckoutPage;