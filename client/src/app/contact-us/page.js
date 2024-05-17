import React from "react";
import Footer from "../footer";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../navbar";
import mail from "./assets/mail.svg";

const ContactUS = () => {
  return (
    <>
      <section>
        <Navbar />

        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[800px] w-full px-10 md:px-0 text-center mx-auto 2xl:pt-[160px] xl:pt pt-[120px] ">
          <h1 className="globalhead">Get In Touch</h1>
          <div className="flex justify-center items-center bg-[#F3F3F3] 2xl:h-[322px] xl:h-[200px] lg:h-[150px] px-10 md:px-0 2xl:my-[45px] xl:my-[35px] my-[20px]">
            <div className="">
              <Image
                src={mail}
                className="2xl:w-[44px] 2xl:h-[35px] xl:w-[40px] xl:h-[30px] mx-auto 2xl:my-[35px] xl:my-[20px] my-[15px]"
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
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default ContactUS;
