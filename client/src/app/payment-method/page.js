import React from "react";
import Image from "next/image";
import visa from "./assets/visa.svg";
import master from "./assets/mastercard.svg";
import maestro from "./assets/Maestro.svg";
import rupay from "./assets/Rupay.svg";
import airtel from "./assets/Airtel.svg";
import amazon from "./assets/Amazon_icon 2.svg";
import amex from "./assets/amex.svg";
import paytm from "./assets/Paytm.svg";

const PaymentMethod = () => {
  return (
    <>
      <section>
        <div className=" rounded-[5px] 2xl:mt-[30px] xl:mt-[15px] mt-[15px] ">
          <div className=" ">
            <h2 className="alata font-[400] 2xl:text-[16px] 2xl:leading-[26px] xl:text-[12px] xl:leading-[18px] text-[10px] leading-[16px] my-1 2xl:my-0">
              Authentichef accepts all major debit and credit cards
            </h2>
            <div className="flex justify-between 2xl:mt-[40px] xl:mt-[25px] mt-[15px]">
              <div>
                <h1 className=" alata font-[400] 2xl:text-[20px] 2xl:leading-[30px] xl:text-[14px] xl:leading-[24px] text-[12px] leading-[18px] ">
                  Add A Card
                </h1>
              </div>
              <div className="flex gap-2">
                <Image
                  src={visa}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />
                <Image
                  src={master}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />

                <Image
                  src={maestro}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />

                <Image
                  src={rupay}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />

                <Image
                  src={amex}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />

                <Image
                  src={paytm}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />

                <Image
                  src={airtel}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />
                <Image
                  src={amazon}
                  className="2xl:w-[38px] 2xl:h-[24px] xl:w-[26px] w-[20px] h-auto"
                />
              </div>
            </div>
            <div className="bg-[#F3F3F3] flex justify-between  2xl:mt-[30px] xl:mt-[15px] mt-[10px] 2xl:px-[45px] 2xl:py-[30px] xl:px-[30px] xl:py-[20px] px-[20px] py-[15px]">
              <div className="flex 2xl:gap-[25px] xl:gap-[20px] gap-[15px]">
                <div className="2xl:w-[378px] xl:w-[280px] w-[180px]">
                  <label className="checkoutlable">Card number</label>
                  <input
                    placeholder="Enter"
                    className="w-full bg-white 2xl:h-[55px] xl:h-[35px] h-[25px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                  />
                </div>
                <div className="2xl:w-[231px] xl:w-[140px] w-[100px]">
                  <label className="checkoutlable">Expiration date</label>
                  <input
                    placeholder="Enter"
                    className="w-full bg-white 2xl:h-[55px] xl:h-[35px] h-[25px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                  />
                </div>
                <div className="2xl:w-[231px] xl:w-[140px] w-[100px]">
                  <label className="checkoutlable">CVC</label>
                  <input
                    placeholder="Enter"
                    className="w-full bg-white 2xl:h-[55px] xl:h-[35px] h-[25px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <button className=" alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[196px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[140px] xl:py-[8px]  lg:py-[6px] lg:px-4 px-3 py-1 hover:bg-[#7e2727]  ">
                  Add Your Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentMethod;
