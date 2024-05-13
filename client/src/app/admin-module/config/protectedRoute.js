"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Loader from "../components/admin/loader/Index";
import { setToken, removeToken, adDetails } from "../../redux/slice";

// import Loader from '../loader';

const protectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    //const dispatch = useDispatch();
    const { token, isLoggedIn } = useSelector((state) => state.auth);
    // const loading = true
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    // console.log(token);

    useEffect(() => {
      const checkAuth = () => {
        if (!isLoggedIn && !token) {
          router.push("http://13.43.174.21:4000/api/admin-module/admin/sign-in");
        }
        if (token) {
          verify();
        }
      };

      checkAuth();
    }, [token, isLoggedIn, router]);

    const verify = async () => {
      setIsLoading(true);
      setIsAuth(false);
      try {
        const res = await axios.get(`http://13.43.174.21:4000/api/auth/verifyUserToken/${token}`);
        console.log(res);
        if (res?.data?.data === null) {
          router.push("/admin-module/admin/sign-in");
          dispatch(removeToken());
        }
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
        ) : token && isAuth ? (
          <WrappedComponent {...props} />
        ) : null}
      </>
    );
  };

  return Wrapper;
};

export default protectedRoute;
