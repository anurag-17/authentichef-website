"use client";
import config from "@/config";
import React, { useState } from "react";

const ResetPassword = ({ params }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const resetToken = params?.slug || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${config.baseURL}/api/auth/resetpassword`,
        { password: password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resetToken}`,
          },
        }
      );

      if (response.status === 200) {
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
      <section>
        <div className="flex justify-center my-20">
          <div className="w-full md:w-[50%] mx-auto border text-center">
            <h1 className="mb-2 2xl:text-[40px] sm:text-[35px] xl:text-[24px] md:text-[18px] text-[16px] xl:leading-[38px] font-bold">
              Reset Password
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-1/2 mx-auto px-[10px]"
            >
              <div className="md:py-2 mx-auto">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="login-input w-full mt-2 custom-input h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px]"
                  value={newPassword}
                  onChange={(e) => setPassword(!password)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F38181] text-[14px] xl:text-[16px] 2xl:text-[18px] font-medium text-white p-2 rounded-lg hover:border hover:border-gray-300 h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px] login-btn my-5"
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
