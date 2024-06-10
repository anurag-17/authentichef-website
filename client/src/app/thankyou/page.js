"use client";
import React,{useState,useEffect} from "react";
import thanku from "../assets/thankyou.svg";
import Image from "next/image";
import Navbar from "../navbar";
import Footer from "../footer";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "@/config";

const ThankU = () => {
  const { token } = useSelector((state) => state?.auth);
  const [sessionId, setSessionId] = useState("");

  const pollForSessionId = async () => {
    const pollInterval = 5000; 
    const maxAttempts = 1; 

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const sessionIdResponse = await axios.get(
          `${config.baseURL}/api/order/getSessionId`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (sessionIdResponse.status >= 200 && sessionIdResponse.status < 300) {
          const { sessionId, successUrl } = sessionIdResponse.data.success;
          console.log("Session ID:", sessionId);

          // Send the session ID to the second API
          try {
            const bookOrderResponse = await axios.post(
              `${config.baseURL}/api/order/bookOrder`,
              {
                sessionId,
              },
              {
                headers: {
                  authorization: token,
                },
              }
            );

            if (
              bookOrderResponse.status >= 200 &&
              bookOrderResponse.status < 300
            ) {
              console.log("Session ID sent successfully");
              // Redirect to success URL
              window.location.href = successUrl.replace(
                "{CHECKOUT_SESSION_ID}",
                sessionId
              );
              return; // Stop polling once successful
            } else {
              console.error(
                "Failed to send session ID",
                bookOrderResponse.data.message
              );
            }
          } catch (error) {
            console.error("Error sending session ID:", error);
          }
        } else {
          console.log("Session ID not available yet, retrying...");
        }
      } catch (error) {
        console.error("Error getting session ID:", error);
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval)); // Wait for the poll interval before retrying
    }

    toast.error("Failed to get session ID after multiple attempts.");
  };

  const handleStripePaymentSuccess = async () => {
    pollForSessionId();
  };

  console.log("Session ID:", sessionId);

  // Call handleStripePaymentSuccess when component mounts
  useEffect(() => {
    handleStripePaymentSuccess();
  }, []);

  return (
    <>
      <section className="">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div>
            <Image
              src={thanku}
              className="2xl:w-[122px] xl:w-[70px] w-[40px] mx-auto"
            />
            <p className="alata font-[400] 2xl:text-[30px] 2xl:leading-[45px] xl:text-[20px] text-[16px] text-center">
              Thank you for your order! <br />A confirmation email has been sent
              to your inbox.
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default ThankU;
