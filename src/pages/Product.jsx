import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Product = () => {
    const [product, setProduct] = useState([]); // Initialize product as an empty array
    const [payment, setPayment] = useState();

    console.log(payment);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/items/get-item");

            if (data?.success) {
                setProduct(data?.item);
            }
        } catch (error) {
            console.log("Error in catching the Products:", error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className='flex flex-wrap p-20 justify-center gap-10'>
            {product.length > 0 && product.map((c) => ( // Check if product has items before mapping
                <div key={c._id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className='flex flex-row'>
                            <h2 className="card-title text-2xl">{c.name}</h2>
                            <div className="badge badge-primary mt-2 ml-2">{c.category}</div>
                        </div>
                        <p> <span className='text-lg font-semibold' > Price of Product : </span> {c.price}</p>
                        <p> <span className='text-lg font-semibold' > Quantity Ordered : </span> {c.quantity} </p>
                        <p> <span className='text-lg font-semibold' > Total Amount : </span> {c.quantity * c.price} </p>
                        <div className="card-actions justify-end">
                            <NavLink to={`/products/${c._id}`} >
                                <button className="btn btn-primary"> Order Now</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;
