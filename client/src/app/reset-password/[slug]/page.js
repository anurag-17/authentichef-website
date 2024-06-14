"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = ({ params }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const resetToken = params?.slug;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://13.43.174.21:4000/api/auth/resetpassword/${resetToken}`,
        { password: password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resetToken}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Password Update Successfully");
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);

      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="flex mt-20 ">
        <div className="w-1/3 border rounded-lg p-5 mx-auto items-center shadow-black">
          <div
            className="flex justify-between items-center  border-[#f3f3f3] rounded-lg bg-white
    2xl:px-5  2xl:h-[50px] 2xl:my-5
    xl:px-4  xl:h-[40px] xl:my-2
    lg:px-3  lg:h-[35px] lg:my-2
    md:px-2  md:h-[30px] md:my-2
    sm:px-1 sm:h-[25px] sm:my-2
    px-1 h-[25px] my-2
     "
          >
            <h2 className="2xl:text-[30px] xl:text-[22px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px] font-semibold ">
              Change Password
            </h2>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className=" bg-white   rounded-lg 2xl:p-2 xl:p-5  lg:p-1 md:p-2 p-1  mx-auto"
            >
              <div className="">
                {/* <label
                  className="custom_input_label"
                >
                  New Password
                </label> */}
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input w-full mt-2 custom-input h-[35px] lg:h-[40px]  xl:h-[50px] 2xl:h-[60px]"
                  required
                  placeholder="Enter New Password"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                  // title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                />
              </div>

              <div className="mt-4">
                <button
                  
                  // disabled={isLoading}
                  className="w-full bg-[#F38181] hover:bg-[#7e2727] text-[14px] xl:text-[16px] 2xl:text-[18px] font-medium text-white p-2 rounded-lg hover:border hover:border-gray-300 h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px] login-btn my-5"
                >
                  {/* {isLoading ? "Loading.." : "Submit"} */}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
