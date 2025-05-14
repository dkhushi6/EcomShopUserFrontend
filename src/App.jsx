import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import DashboardUser from "./components/home/DashboardUser";
import Shop from "./components/shop/Shop";
import DetailProduct from "./components/shop/DetailProduct";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import AddtoCart from "./components/shop/AddtoCart";
import Order from "./components/shop/Order";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div
      className="font-sans text-[#24251F]
"
    >
      <Routes>
        <Route>
          {" "}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardUser />} />

          <Route path="/cart" element={<AddtoCart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/product" element={<DetailProduct />} />
        </Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
