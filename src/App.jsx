import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import SingleProduct from "./pages/SingleProduct";


function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
