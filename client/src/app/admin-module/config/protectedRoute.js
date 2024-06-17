"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/admin/loader/Index";
import { removeToken } from "../../redux/slice";
import config from "@/config";
import { toast } from "react-toastify";

const protectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth?.token);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        if (!token) {
          router.push("/admin-module/admin/sign-in");
          return;
        }
        verify();
      };
      checkAuth();
    }, [token, router]);

    const verify = async () => {
      setIsLoading(true);
      setIsAuth(false);
      try {
        const res = await axios.get(
          `${config.baseURL}/api/auth/verifyUserToken/${token}`
        );
        if (res.status === 200) {
          setIsAuth(true);
          setIsLoading(false);
          // toast.success("Registration success")
        } else {
          dispatch(removeToken());
          router.push("/admin-module/admin/sign-in");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        router.push("/admin-module/admin/sign-in");
        setIsLoading(false);
      }
    };

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          token && isAuth && <WrappedComponent {...props} />
        )}
      </>
    );
  };

  return Wrapper;
};

export default protectedRoute;
