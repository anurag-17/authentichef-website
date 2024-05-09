"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setToken, removeToken,adDetails } from "@/redux/adminSlice/authSlice";
import RightSection from "./RightSection";
import Link from "next/link";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const state = useSelector((state) => state);

  const InputHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/adminLogin", loginDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res?.data?.success) {
        toast.success("Login successfully!");
        setLoading(false);
        dispatch(setToken(res?.data?.user?.token));
        navigate("/admin-dashboard");
      } else {
        toast.error("Login failed please try later!");
         dispatch(removeToken());
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error?.response?.data?.error || "Server error !");
       dispatch(removeToken());
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <RightSection />

        <div className="bg-[#ffff] flex flex-col justify-center px-[40px] py-[40px] border-l border-[#f3f3f3]">
          <form
            className="max-w-[80%] w-full mx-auto bg-[#ffff] p-4 rounded"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4 justify-center p-8 lg:p-14 md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
              <div className="text-left ">
                <p className="mb-2 bold-40 ">Welcome Admin</p>
                <p className="regular-16 leading-[26px] text-gray-400 mb-4">
                  Welcome back! Please enter your details
                </p>
              </div>
              <div className="md:py-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="login-input"
                  onChange={InputHandler}
                  title="enter valid email ex. abc@gmail.com"
                  required
                />
              </div>
              <div className="">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="login-input "
                  onChange={InputHandler}
                  minLength={8}
                  required
                  autoComplete="current-password"
                />
                <div className="flex items-center mt-4 px-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label htmlFor="showPassword" className="login-input-label">
                    Show Password
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="login_button"
                >
                  {isLoading ? "Loading.." : "Sign In"}
                </button>
                <Link href="/admin/forgot-password">
                <div className="regular-16 underline text-center py-3 cursor-password">
                  Forgot password
                </div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
