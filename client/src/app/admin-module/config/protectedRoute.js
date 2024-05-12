"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Loader from "../components/admin/loader/Index";
import {
  setToken,
  removeToken,
  adDetails,
} from "../redux/adminSlice/authSlice";

// import Loader from '../loader';

const protectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    //const dispatch = useDispatch();
    const { ad_token, isLoggedIn } = useSelector((state) => state.auth);
    // const loading = true
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    // console.log(ad_token);

    useEffect(() => {
      const checkAuth = () => {
        if (!isLoggedIn && !ad_token) {
          router.push("/admin/sign-in");
        }
        if (ad_token) {
          verify();
        }
      };

      checkAuth();
    }, [ad_token, isLoggedIn, router]);

    const verify = async () => {
      setIsLoading(true);
      setIsAuth(false);
      try {
        const res = await axios.get(`/api/auth/verifyUserToken/${ad_token}`);
        console.log(res);
        // if (res?.data?.data === null) {
        //   router.push("/admin/sign-in");
        //   dispatch(removeToken());
        // }
        if (res.status === 200) {
          setIsAuth(true);
          setIsLoading(false);
          router.push("/admin-module/admin/sign-in");
          return;
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
        ) : ad_token && isAuth ? (
          <WrappedComponent {...props} />
        ) : null}
      </>
    );
  };

  return Wrapper;
};

export default protectedRoute;
