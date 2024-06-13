"use client";
import config from "@/config";
import React, { useState } from "react";

const ResetPassword = ({ params }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const resetToken = params?.slug || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${config.baseURL}/api/auth/resetpassword`,
        { newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resetToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Password reset successfully");
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-center my-20">
          <div className="w-[50%] mx-auto border text-center">
            <h1 className="mb-2 2xl:text-[40px] sm:text-[35px] xl:text-[24px] md:text-[18px] text-[16px] xl:leading-[38px] font-bold">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
              <div className="md:py-2 mx-auto">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="login-input w-full mt-2 custom-input h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px]"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="md:py-2 mx-auto">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="login-input w-full mt-2 custom-input h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-500">{success}</div>}
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
