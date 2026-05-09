import { memo } from "react";
import "./App.css"
import About from "./page/About";
import Home from "./page/Home";
import { Route, Routes } from "react-router-dom";
import PaymentPage from "./page/PaymentPage";
import Success from "./page/Success";
import NotFound from "./page/NotFound";
import Login from "./page/auth/Login";
import ProtectedRoute from "./utils/ProtectedRoute";


const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/about" element={<About />} />
      <Route path="/payment/:amount" element={<PaymentPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default memo(App);