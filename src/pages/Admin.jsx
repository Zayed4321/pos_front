import axios from 'axios';
import { useState } from 'react';

const Admin = () => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleCreate = async () => {
        try {
            const { data } = await axios.post('http://localhost:8080/api/items/add-item', {
                name,
                category,
                price,
                quantity
            });

            if (data.success) {
                console.log("done")
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='w-[30%] mx-auto p-20'>

            <h1 className='text-center text-3xl font-bold mb-5 bg-green-300 p-3 rounded-md text-white' > Add New Products Below </h1>

            {/* Category -> Product */}
            <div className='mb-5' >
                <select className="select select-bordered w-full max-w-xs" defaultValue={"Category"} onChange={(e) => setCategory(e.target.value)}>
                    <option >Select a Category</option>
                    <option>Fruits</option>
                    <option>Salads</option>
                </select>
            </div>

            {/* Name -> Product */}
            <div className='mb-5'>
                <label className="input input-bordered flex items-center gap-2" >
                    <input type="text" placeholder='Product Name Here' onChange={(e) => setName(e.target.value)} />
                </label>
            </div>

            {/* Price */}
            <div className='mb-5'>
                <label className="input input-bordered flex items-center gap-2" >
                    <input type="text" placeholder='Price - example(1.000)' onChange={(e) => setPrice(e.target.value)} />
                </label>
            </div>

            {/* Quantity */}
            <div className='mb-5'>
                <label className="input input-bordered flex items-center gap-2" >
                    <input type="text" placeholder='Product Quantity' onChange={(e) => setQuantity(e.target.value)} />
                </label>
            </div>
            <button className='btn btn-primary' onClick={handleCreate} > Create Product </button>
        </div>
    );
};

export default Admin;
