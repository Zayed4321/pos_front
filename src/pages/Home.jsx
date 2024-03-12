import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {

        if (email === "admin@gmail.com") {
            return navigate("/admin");
        } else {
            return navigate("/products")
        }
    }

    return (
        <div className='w-[30%] mx-auto' >
            <form className="card-body" onSubmit={handleLogin} >
                <h1 className='text-center text-3xl font-bold' > Please Login to Browse Products </h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="your email here" name='email' value={email} className="input input-bordered" required onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="your password here" name='password' className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" >Login</button>
                </div>
            </form>
        </div>
    )
}

export default Home