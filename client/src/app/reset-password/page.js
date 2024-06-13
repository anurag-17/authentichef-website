"use client";
import React, { useState } from "react";

const ResetPassword = () => {
  const [isLoading, setLoading] = useState(false);


  const handleSubmit = () =>{
    
  }

  return (
    <>
      <section>
        <div className="flex justify-center my-20">
          <div className="w-[50%] mx-auto border text-center">
            <h1 className="mb-2 2xl:text-[40px] sm:text-[35px]  xl:text-[24px] md:text-[18px] text-[16px] xl:leading-[38px] font-bold">
              Reset Password
            </h1>
            <form  className="w-1/2 mx-auto">
              <div className="md:py-2 mx-auto">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="login-input w-full mt-2 custom-input h-[35px] lg:h-[40px]  xl:h-[50px] 2xl:h-[60px]"
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="md:py-2 mx-auto">
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  className="login-input w-full mt-2 custom-input h-[35px] lg:h-[40px]  xl:h-[50px] 2xl:h-[60px]"
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F38181] text-[14px] xl:text-[16px] 2xl:text-[18px] font-medium text-white p-2 rounded-lg hover:border hover:border-gray-300 h-[35px] lg:h-[40px]  xl:h-[50px] 2xl:h-[60px] login-btn my-5"
              >
                {isLoading ? "Loading.." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
