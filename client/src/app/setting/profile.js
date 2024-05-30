"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const { token } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.auth);
  console.log(user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${config.baseURL}/api/auth/edit-user`,
        userData,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User Updated Successfully");
        // dispatch(setUser(response?.data?.user));
      } else {
        // toast.error("User Update Failed");
        console.log("User Update Failed");
      }
    } catch (error) {
      toast.error("User Update Failed");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />

      <section>
        <div className="border rounded-[5px] 2xl:mt-[30px] xl:mt-[15px] mt-[15px] 2xl:px-[105px] 2xl:py-[80px] xl:px-[50px] xl:py-[40px] px-[40px] py-[25px]">
          <form onSubmit={handleSubmit}>
            <div className="flex 2xl:gap-[20px] xl:gap-[15px] gap-[10px]">
              <div className="2xl:w-[375px] xl:w-[280px] w-[200px]">
                <input
                  name="firstname"
                  placeholder="First Name"
                  value={userData.firstname}
                  className="profile_input"
                  onChange={inputHandler}
                />
              </div>
              <div className="2xl:w-[375px] xl:w-[280px] w-[200px]">
                <input
                  name="lastname"
                  placeholder="Last Name"
                  value={userData.lastname}
                  className="profile_input"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className="2xl:w-[375px] xl:w-[280px] w-[200px] 2xl:mt-[15px] xl:mt-[10px] mt-[8px]">
              <input
                name="email"
                placeholder="Email"
                value={userData.email}
                className="profile_input"
                onChange={inputHandler}
              />
            </div>
            <div className="2xl:w-[770px] xl:w-[575px] w-[407px] 2xl:mt-[15px] xl:mt-[10px] mt-[8px]">
              <input
                name="mobile"
                placeholder="Phone no."
                value={userData.mobile}
                className="profile_input"
                onChange={inputHandler}
              />
            </div>
            <div className="2xl:mt-[50px] xl:mt-[30px] mt-[20px]">
              <button
                type="submit"
                className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[120px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[80px] xl:py-[8px] lg:py-[6px] lg:px-4 px-3 py-1 hover:bg-[#7e2727]"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
