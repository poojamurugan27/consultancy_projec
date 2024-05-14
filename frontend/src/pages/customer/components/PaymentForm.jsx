import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { fetchProductDetailsFromCart, removeAllFromCart, removeSpecificProduct } from '../../../redux/userSlice';

const PaymentForm = ({ handleBack }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, currentUser, productDetailsCart } = useSelector(state => state.user);
    const params = useParams();
    const productID = params.id;

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (productID) {
            dispatch(fetchProductDetailsFromCart(productID));
        }
    }, [productID, dispatch]);

    useEffect(() => {
        if (status === 'failed') {
            setMessage("Order Failed");
            setShowPopup(true);
        } else if(status === 'added'){
            navigate('/')
        }else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [status]);

    const handleStripeRedirect = () => {
        // Redirect to the Stripe URL
        window.location.href = "https://buy.stripe.com/test_dR63dVaJ21R79sA7ss";
    };

    const handlePlaceOrder = () => {
        if (productID) {
            // For single product purchase
            const singleProductPrice = productDetailsCart && productDetailsCart.price && productDetailsCart.price.cost;
           // console.log(singleProductPrice)
            const singleOrderData = {
                buyer: currentUser._id,
                shippingData: currentUser.shippingData,
                orderedProducts: [productDetailsCart], // Wrap productDetailsCart in an array since it's a single product
                paymentInfo: { id: 'dummy_payment_id', status: 'Successful' },
                productsQuantity: productDetailsCart.quantity,
                totalPrice: singleProductPrice * productDetailsCart.quantity,
            };

            // Dispatch actions to add the order and remove the product from the cart
            dispatch(addStuff("newOrder", singleOrderData));
            dispatch(removeSpecificProduct(productID));

            // Navigate to Aftermath
            navigate('/Aftermath');
        } else {
            // For multiple product purchase
            const productsQuantity = currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = currentUser.cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

            const multiOrderData = {
                buyer: currentUser._id,
                shippingData: currentUser.shippingData,
                orderedProducts: currentUser.cartDetails,
                paymentInfo: { id: 'dummy_payment_id', status: 'Successful' },
                productsQuantity,
                totalPrice,
            };

            // Dispatch actions to add the order and remove all products from the cart
            dispatch(addStuff("newOrder", multiOrderData));

            // Dispatch action to add each product to My Products
            currentUser.cartDetails.forEach(product => {
                dispatch(addStuff("newProduct", {
                    name: product.name,
                    price: product.price,
                    // Add any other relevant fields from the product object
                }));
            });

            dispatch(removeAllFromCart());

            // Navigate to Aftermath
            navigate('/Aftermath');
        }
    };
    const handlePlaceOrder1 = () => {
        if (productID) {
            // For single product purchase
            const singleProductPrice = productDetailsCart && productDetailsCart.price && productDetailsCart.price.cost;
            const singleOrderData = {
                buyer: currentUser._id,
                shippingData: currentUser.shippingData,
                orderedProducts: [productDetailsCart], // Wrap productDetailsCart in an array since it's a single product
                paymentInfo: { id: 'dummy_payment_id', status: 'Successful' },
                productsQuantity: productDetailsCart.quantity,
                totalPrice: singleProductPrice * productDetailsCart.quantity,
            };

            // Dispatch actions to add the order and remove the product from the cart
            dispatch(addStuff("newOrder", singleOrderData));
            dispatch(removeSpecificProduct(productID));

            // Navigate to Aftermath
            // navigate('/Aftermath');
        } else {
            // For multiple product purchase
            const productsQuantity = currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = currentUser.cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

            const multiOrderData = {
                buyer: currentUser._id,
                shippingData: currentUser.shippingData,
                orderedProducts: currentUser.cartDetails,
                paymentInfo: { id: 'dummy_payment_id', status: 'Successful' },
                productsQuantity,
                totalPrice,
            };

            // Dispatch actions to add the order and remove all products from the cart
            dispatch(addStuff("newOrder", multiOrderData));

            // Dispatch action to add each product to My Products
            currentUser.cartDetails.forEach(product => {
                dispatch(addStuff("newProduct", {
                    name: product.name,
                    price: product.price,
                    // Add any other relevant fields from the product object
                }));
            });

            dispatch(removeAllFromCart());

            // Navigate to Aftermath
            // navigate('/Aftermath');
        }
    };

    const handleOnlinePayment = () => {
        handlePlaceOrder1();
        handleStripeRedirect();
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>
                <Button onClick={handleOnlinePayment} sx={{ mt: 3, ml: 1 }}>
                    Online Payment
                </Button>
                <Button onClick={handlePlaceOrder} variant="contained" sx={{ mt: 3, ml: 1 }}>
                    Cash on delivery
                </Button>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </React.Fragment>
    );
}

export default PaymentForm;
