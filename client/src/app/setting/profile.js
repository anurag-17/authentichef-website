"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const { token } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.auth);
  const [isRefresh, setRefresh] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

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
        refreshData();
      } else {
        console.log("User Update Failed");
      }
    } catch (error) {
      toast.error("User Update Failed");
    }
  };

  const defaultUser = async () => {
    try {
      const response = await axios.post(
        `${config.baseURL}/api/auth/getUserById`,
        { _id: user._id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const userData = response.data.user;
        setUserData({
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          email: userData.email || "",
          mobile: userData.mobile || "",
        });
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    defaultUser();
  }, [isRefresh]);

  const inputHandlerr = (event) => {
    const { name, value } = event.target;
    setPasswordUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${config.baseURL}/api/auth/updatePassword`,
        passwordUpdate,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert("Success");
      } else {
        alert("Failed");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <div className="border rounded-[5px] 2xl:mt-[30px] xl:mt-[15px] mt-[15px] 2xl:px-[105px] 2xl:py-[80px] xl:px-[50px] xl:py-[40px] px-[40px] py-[25px] w-[80%]">
          {/* <form
            onSubmit={(event) => {
              handleSubmit();
              handlePasswordUpdate();
              event.preventDefault();
            }}
          > */}
          <form onSubmit={handleSubmit}>
            <div>
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
              <div className="my-5">
                <input
                  placeholder="Enter phone number"
                  type="number"
                  name="mobile"
                  value={userData.mobile}
                  onChange={inputHandler}
                  maxLength={15}
                  className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                  required
                />
              </div>
            </div>
            <label className="checkoutlable">
              Password Update <span className="text-[#DB1414]">*</span>
            </label>
            <div className="flex 2xl:gap-[20px] xl:gap-[15px] gap-[10px]">
              <div className="2xl:w-[375px] xl:w-[280px] w-[200px]">
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={passwordUpdate.oldPassword}
                  onChange={inputHandlerr}
                  className="profile_input"
                />
              </div>
              <div className="2xl:w-[375px] xl:w-[280px] w-[200px]">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordUpdate.newPassword}
                  onChange={inputHandlerr}
                  className="profile_input"
                />
              </div>
            </div>
            <div className="2xl:mt-[50px] xl:mt-[30px] mt-[20px]">
              <button
                type="submit"
                className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[120px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[80px] xl:py-[8px] lg:py-[6px] lg:px-4 px-3 py-1 hover:bg-[#7e2727]"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
