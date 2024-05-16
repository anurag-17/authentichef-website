"use client";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { sideMenus } from "../../config/data";
import CloseIcon from "./admin-pages/Svg/CloseIcon";
import { rem_AdDetails, removeToken } from "@/app/redux/slice";
import protectedRoute from "../../config/protectedRoute";

const AdminDashboard = () => {
  const { token } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [ComponentId, setComponentId] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  const handleClick = (id, url) => {
    setComponentId(id);
    setShowDrawer(false);
  };
  const handleSignout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/logout", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      if (res?.data?.success) {
        toast.success("Logout successfully !");
        dispatch(removeToken());
        dispatch(rem_AdDetails());
        router.push("/admin-module/admin/sign-in");
      } else {
        dispatch(removeToken());
        dispatch(rem_AdDetails());
        router.push("/admin-module/admin/sign-in");
        // toast.error("Logout failed try again !");
      }
    } catch (error) {
      dispatch(removeToken());
      dispatch(rem_AdDetails());
      router.push("/admin-module/admin/sign-in");
      console.error("Error occurred:", error);
      // toast.error(error?.response?.data?.error || "Invalid token !");
    }
  };

  return (
    <section className="bg-black">
      <div className="flex max-h-screen relative lg:static">
        <div
          className="py-2 px-3  absolute top-4 left-2 flex flex-col gap-[5px] cursor-pointer lg:hidden"
          onClick={() => setShowDrawer(true)}
        >
          <div className="bg-black h-[2px] w-[20px]"></div>
          <div className="bg-black h-[2px] w-[20px]"></div>
          <div className="bg-black h-[2px] w-[20px]"></div>
        </div>

        <div
          className={`xl:w-[20%] lg:w-[25%]  w-[280px] md:h-auto h-full z-[11] bg-theme-color text-white xl:py-[40px] xl:px-[25px] px-[10px] py-[10px] transition-all duration-1000 delay-100 ease-linear
                 ${
                   showDrawer
                     ? "block  absolute top-0 left-0 min-h-screen is-show"
                     : "hidden lg:block"
                 }`}
        >
          <div
            className="relative text-white  flex flex-col gap-[5px] cursor-pointer lg:hidden  text-right mr-3 mt-2"
            onClick={() => setShowDrawer(false)}
          >
            <div className="">
              {" "}
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <div className="flex justify-center items-center whitespace-pre-wrap pb-[20px]">
              <h1 className="bold-32 text-center whitespace-nowrap ">
                Admin Dashboard
              </h1>
            </div>
            <div className="bg-white h-[1px] w-[70%] mx-auto overscroll-y-auto"></div>
            <div className="flex flex-col 2xl:gap-5 gap-2 pt-[30px]">
              {sideMenus.map((item, index) => (
                <div
                  key={index}
                  className={`pl-6 py-[10px] mx-4 rounded flex gap-x-3 items-center cursor-pointer  transition-colors font-semibold 2xl:text-[16px] text-[15px] 
                                    ${
                                      item.id === ComponentId
                                        ? "bg-theme-secondary text-primary"
                                        : "hover:bg-theme-secondary hover:text-primary hover:rounded "
                                    }  `}
                  onClick={() => handleClick(item.id, item.url)}
                >
                  {item?.icon}
                  <p className=" capitalize whitespace-nowrap ">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white h-[1px] w-[70%] mx-auto mt-[100px]"></div>
          </div>

          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer my-3 flex items-center transition-colors dash-menu gap-x-3 font-semibold  2xl:text-[16px] text-[15px] hover:bg-theme-secondary hover:text-primary hover:rounded-md }`}
            onClick={handleSignout}
          >
            {/* <LogoutIcon /> */}
            <div>
              <p>Sign Out</p>
            </div>
          </div>
        </div>
        <div className=" bg-[#f3f3f3] xl:w-[80%] lg:w-[75%] w-full">
          {sideMenus.map((item, index) => (
            <Fragment key={index}>
              {ComponentId === item.id && item.component}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default protectedRoute(AdminDashboard);
