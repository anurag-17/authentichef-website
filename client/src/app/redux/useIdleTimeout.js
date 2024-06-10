"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { removeToken, removeUser, removeSuccess } from './slice'; // Adjust the path to your authSlice
import config from '@/config'; // Adjust the path to your config file

const useIdleTimeout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = async () => {
    try {
      await axios.get(`${config.baseURL}/api/auth/logout`, {
        headers: {
          Authorization: token,
        },
      });

      dispatch(removeToken());
      dispatch(removeUser());
      dispatch(removeSuccess());

      // Redirect to the explore dishes page
      router.push("/explore-dishes");
      console.log("Logged out due to inactivity");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleLogout();
      }, 10 * 60 * 1000); // 10 minutes in milliseconds
    };

    const handleActivity = () => {
      resetTimeout();
    };

    // List of events that reset the timeout
    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart'];

    // Add event listeners for user activity
    events.forEach(event => window.addEventListener(event, handleActivity));

    // Initialize the timeout
    resetTimeout();

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [dispatch, token, router]);
};

export default useIdleTimeout;