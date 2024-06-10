"use client";
import React, { useRef, useState } from "react";
import Footer from "../footer";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../navbar";
import mail from "./assets/mail.svg";
import { useSelector } from "react-redux";
import axios from "axios";

const ContactUS = () => {
  const { token } = useSelector((state) => state?.auth);
  const formRef = useRef(null);

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [first, setFirst] = useState({
    FirstName: "",
    Surname: "",
    Phone: "",
    Email: "",
    Postcode: "",
    Status: "Pending",
  });

  const inputHandler = (e) => {
    setFirst({
      ...first,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.baseURL}/api/chefProfile`,
        first,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Your form has been submitted.");
        setFirst({
          FirstName: "",
          Surname: "",
          Phone: "",
          Email: "",
          Postcode: "",
        });
      } else {
        toast.error("Failed to submit the form. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <section>
        <Navbar />

        <section>
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[800px] w-full px-10 md:px-0 text-center mx-auto 2xl:pt-[160px] xl:pt-[120px] md:pt-[90px] pt-[75px] mnavbar">
            <h1 className="globalhead">Get In Touch</h1>
            <div className="flex justify-between items-center  2xl:my-[35px] xl:my-[30px] my-[15px]">
              <div className="">
                <Image
                  src={mail}
                  className="2xl:w-[60px] 2xl:h-auto lg:w-[40px] lg:h-[30px] w-[30px] h-[20px] mx-auto 2xl:my-[35px] xl:my-[20px] lg:my-[15px] my-[10px]"
                />
                <p className="checkoutlable">
                  If you have any questions, please contact us at
                </p>
                <h3 className="become-para cursor-pointer ">
                  <a href="mailto:support@authentichef.com" target="_blank">
                    {" "}
                    support@authentichef.com{" "}
                  </a>
                </h3>
              </div>

              <div className="w-[70%] px-10 md:px-0 text-center mr-040px 2xl:py-[40px] xl:py py-[30px] mnavbar">
                <h1 className="globalhead2 capitalize">
                  We would love to hear from you
                </h1>
                <div className=" w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col alata gap-x-3 lg:gap-x-5 xs:gap-x-2"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 xs:gap-2">
                      <input
                        name="FirstName"
                        placeholder="First Name"
                        className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full sm:w-1/3"
                        value={first.FirstName}
                        onChange={inputHandler}
                      />
                      <input
                        name="Surname"
                        placeholder="Last Name"
                        className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full sm:w-1/3"
                        value={first.Surname}
                        onChange={inputHandler}
                      />
                      <input
                        name="Phone"
                        placeholder="Phone"
                        type="text"
                        className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full sm:w-1/3"
                        value={first.Phone}
                        onChange={(e) => {
                          const input = e.target.value;
                          // Accept only numbers and limit to 15 characters
                          const filteredInput = input
                            .replace(/\D/g, "")
                            .slice(0, 15);
                          // Update state with the filtered input
                          inputHandler({
                            target: { name: "Phone", value: filteredInput },
                          });
                        }}
                      />
                    </div>
                    {/* <input
                name="Phone"
                placeholder="Phone"
                type="number"
                className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full"
                value={first.Phone}
                onChange={inputHandler}
              /> */}
                    <div className="flex flex-col sm:flex-row gap-4 xs:gap-2">
                      <input
                        name="Email"
                        placeholder="Email"
                        type="email"
                        className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full sm:w-1/3"
                        value={first.Email}
                        onChange={inputHandler}
                      />
                      {/* <input
                name="Postcode"
                placeholder="Post Code"
                className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full"
                value={first.Postcode}
                onChange={inputHandler}
              /> */}
                      <input
                        name="Postcode"
                        placeholder="Post Code"
                        type="text"
                        className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full sm:w-1/3"
                        value={first.Postcode}
                        onChange={(e) => {
                          const input = e.target.value;
                          // Accept only numbers and limit to 15 characters
                          const filteredInput = input
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          // Update state with the filtered input
                          inputHandler({
                            target: { name: "Postcode", value: filteredInput },
                          });
                        }}
                      />
                      <button className="font-alata font-medium bg-[#DB5353] text-white rounded-5 py-2  mt-3 lg:mt-[17px] xs:mt-2 hover:bg-[#7e2727]  h-auto lg:w-30 lg:h-14  xl:h-14 2xl:h-14 w-1/3">
                        Submit
                      </button>
                    </div>
                    {/* <button className="font-alata font-medium bg-[#DB5353] text-white rounded-5 py-2 mt-4 hover:bg-[#7e2727] w-auto h-auto lg:w-30 lg:h-14 xl:w-30 xl:h-14 2xl:w-30 2xl:h-14">
                      Submit
                    </button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section>
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[800px] w-full px-10 md:px-0 text-center mx-auto 2xl:py-[40px] xl:py py-[30px] mnavbar">
            <h1 className="globalhead2 capitalize">We would love to hear from you</h1>
            <div className="flex justify-center items-center sm:px-10 md:px-0">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col alata gap-3 lg:gap-5 xs:gap-2 w-[50%]"
            >
              <div className="flex flex-col sm:flex-row gap-4 xs:gap-2">
                <input
                  name="FirstName"
                  placeholder="First Name"
                  className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full sm:w-1/2"
                  value={first.FirstName}
                  onChange={inputHandler}
                />
                <input
                  name="Surname"
                  placeholder="Last Name"
                  className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full sm:w-1/2"
                  value={first.Surname}
                  onChange={inputHandler}
                />
              </div>
          
              <input
                name="Phone"
                placeholder="Phone"
                type="text"
                className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full"
                value={first.Phone}
                onChange={(e) => {
                  const input = e.target.value;
                  const filteredInput = input.replace(/\D/g, "").slice(0, 15);
                  inputHandler({
                    target: { name: "Phone", value: filteredInput },
                  });
                }}
              />

              <input
                name="Email"
                placeholder="Email"
                type="email"
                className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full"
                value={first.Email}
                onChange={inputHandler}
              />
            
              <input
                name="Postcode"
                placeholder="Post Code"
                type="text"
                className="profile_input mt-3 lg:mt-[17px] xs:mt-2 w-full"
                value={first.Postcode}
                onChange={(e) => {
                  const input = e.target.value;
                  const filteredInput = input.replace(/\D/g, "").slice(0, 10);
                  inputHandler({
                    target: { name: "Postcode", value: filteredInput },
                  });
                }}
              />
              <button className="font-alata font-medium bg-[#DB5353] text-white rounded-5 py-2 mt-4 hover:bg-[#7e2727] w-auto h-auto lg:w-30 lg:h-14 xl:w-30 xl:h-14 2xl:w-30 2xl:h-14">
                Submit
              </button>
            </form>
            </div>
          </div>
        </section> */}
        <Footer />
      </section>
    </>
  );
};

export default ContactUS;
