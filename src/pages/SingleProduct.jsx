import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import emailjs from "@emailjs/browser";

const SingleProduct = () => {

    const [product, setProduct] = useState([]);
    const [payment, setPayment] = useState("");
    const { id } = useParams();

    console.log(payment);

    const getSingleProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/items/get-item/${id}`);

            if (data?.success) {
                setProduct(data?.singleItem);
            }

        } catch (error) {
            console.log("Error fetching single product:", error); // Log the error object
        }
    };


    useEffect(() => {
        getSingleProducts();
    }, []); // 

    const handlePayment = (paymentMethod) => {
        setPayment(paymentMethod);
        sendInvoice(paymentMethod); // Pass the paymentMethod directly to sendInvoice
    };

    const sendInvoice = (paymentMethod) => {
        if (!product || !product.name || !product.price || !product.quantity) {
            console.log("Product information is not available yet");
            return;
        }

        const service_id = 'service_4ppdtin';
        const template_id = 'template_nfm0k9m';
        const user_id = 'TDlROgCt4-FEi-2fr';

        const templateParams = {
            from_name: "Sareem",
            to_name: "Sareem",
            product_name: product.name,
            product_price: product.price,
            product_quantity: product.quantity,
            product_total: product.price * product.quantity,
            payment_method: paymentMethod,
            message: "This is the invoice of your selected product"
        }

        // Your code to send invoice using Axios or any other method

        emailjs.send(service_id, template_id, templateParams, user_id).then((response) => {
            console.log("Email is sent successfully", response);
            setPayment(""); // Clear the payment state after sending email
        }).catch((error) => {
            console.log("Error sending email", error)
        });
    };


    return (
        <div className='max-w-screen-xl space-x-4 flex flex-row flex-wrap container mx-auto p-20' >
            <NavLink to={'/'} className={"py-3 ml-5"} > <button className='btn btn-primary' > Go Back to Login Page </button> </NavLink>
            <div className="hero bg-base-200 rounded-md">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold"> {product.name}</h1>
                        <p className="py-3">  <span className='text-lg font-semibold' > Price of Product : </span> {product.price}</p>
                        <p className="py-3" >  <span className='text-lg font-semibold' > Product Quantity : </span> {product.quantity} </p>
                        <p className='py-3' > <span className='text-lg font-semibold' > Total Amount : </span> {product.price * product.quantity} </p>

                        <div className='flex flex-row gap-3' >
                            <button className='btn btn-primary' onClick={() => handlePayment('On Credit')} > On Credit </button>
                            <button className='btn btn-primary' onClick={() => handlePayment('Cash')} > Cash </button>
                            <button className='btn btn-primary' onClick={() => document.getElementById('my_modal_5').showModal()}> Credit Card </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => handlePayment('Credit Card')} >Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default SingleProduct;
