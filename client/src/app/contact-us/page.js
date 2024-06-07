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

        <section>
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[800px] w-full px-10 md:px-0 text-center mx-auto 2xl:pt-[160px] xl:pt-[120px] md:pt-[90px] pt-[75px] mnavbar">
            <h1 className="globalhead">Get In Touch</h1>
            <div className="flex justify-center items-center bg-[#F3F3F3] 2xl:h-[322px] xl:h-[200px] lg:h-[150px] md:h-[120px] sm:h-[100px] h-[100px] sm:px-10 md:px-0 2xl:mt-[35px] xl:mt-[30px] mt-[15px]">
              <div className="">
                <Image
                  src={mail}
                  className="2xl:w-[44px] 2xl:h-[35px] lg:w-[40px] lg:h-[30px] w-[30px] h-[20px] mx-auto 2xl:my-[35px] xl:my-[20px] lg:my-[15px] my-[10px]"
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
        </section>
        <section>
          <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[800px] w-full px-10 md:px-0 text-center mx-auto 2xl:py-[40px] xl:py py-[30px] mnavbar">
            <h1 className="globalhead2 capitalize">We would love to hear from you</h1>
            <div className="flex justify-center items-center sm:px-10 md:px-0">
              <div className="w-full ">
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px]  2xl:w-[932px] w-[60%] mx-auto">
                  <div className="2xl:w-[456px] xl:w-[95%] w-full">
                    <input
                      placeholder="First Name"
                      type="text"
                      name="firstname"
                      // value={deliveryInfo.houseNo}
                      // onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    />
                  </div>
                  <div className="2xl:w-[456px] xl:w-[95%] w-full">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Surname"
                      // value={deliveryInfo.buildingName}
                      // onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] 2xl:w-[932px] w-[60%] mx-auto">
                  <div className="2xl:w-[456px] xl:w-[95%] w-full">
                    <input
                      placeholder="Phone"
                      type="number"
                      name="mobile"
                      // value={deliveryInfo.houseNo}
                      // onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    />
                  </div>
                  <div className="2xl:w-[456px] xl:w-[95%] w-full">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      // value={deliveryInfo.buildingName}
                      // onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] 2xl:w-[932px] w-[60%] mx-auto">
                  <textarea
                    type="text"
                    name="comment"
                    placeholder="Message"
                    // value={deliveryInfo.buildingName}
                    // onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                    className="w-full bg-[#F3F3F3] 2xl:h-[170px] h-[50%] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default ContactUS;
