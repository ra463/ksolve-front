import "./App.scss";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader.jsx";
import Header from "./components/Header/Header.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const AllClass = lazy(() => import("./pages/AllClass.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  const { token } = useSelector((state) => state.auth);
  let user = false;
  if (token) user = true;

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/all-class" element={<AllClass />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
