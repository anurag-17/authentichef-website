"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import Footer from "../footer";
import axios from "axios";
import config from "@/config";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/api/faq/all`)
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);


  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section>
        <Navbar />

        <div className="custom_container 2xl:pt-[160px] xl:pt-[120px] md:pt-[90px] pt-[75px]  mnavbar">
          <div className="">
            <div className=" mx-auto text-center ">
              <h1 className="faqhead text-[#000000] alata font-[400] 2xl:text-[55px] xl:text-[40px] lg:text-[30px] md:text-[30px] xs:text-[25px]">
                Your Questions Answered
              </h1>
              <h2 className="pop-head 2xl:mt-[30px] 2xl:text-[30px] xl:text-[20px] xl:mt-[20px] text-[#000000] alata font-[400] lg:mt-[10px] sm:mt-[20px]  mt-[] my-3">
                About Authentichef
              </h2>
            </div>
          </div>
          <div className="bg-[#F38181] text-white mx-auto 2xl:w-[1129px] xl:w-[700px]  lg:w-[550px] sm:w-[] w-[] 2xl:h-[210px] flex items-center 2xl:px-[30px] xl:px-[20px] lg:px-[15px] sm:px-[10px] px-[] 2xl:mt-[30px] xl:mt-[20px] lg:mt-[10px] sm:mt-[10px] mt-[] py-[12px] xl:py-[15px] 2xl:py-0">
            <div className="">
              <h4 className=" xs:text-[15px] alata font-[400] xs:center xs:mx-5 2xl:text-[20px] xl:text-[20px] md:text-[14px] sm:text-[15px]">
                What makes authentichef different from other food delivery
                companies?
              </h4>
              <h2 className="seven_p2 xs:text-[15px] sm:text-[15px] alata font-[400]  2xl:text-[18px] xl:text-[14px] xs:center xs:mx-5 xs:my-2 md:my-2 md:text-[18px]">
                We believe food is not just a need; they’re journeys.
              </h2>
              <p className="2xl:w-[981px] xl:w-[] lg:w-[]  sm:w-[] w-[] alata font-[400] seven_p2 xs:text-[15px] 2xl:text-[18px] xl:text-[14px] xs:center xs:mx-5 xs:my-2 md:my-2 md:text-[14px] xl:leading-5 2xl:leading-[30px] md:leading-5 sm:text-[15px] ">
                We connect you with delicious, authentic dishes from around the
                world, handcrafted by passionate independent chefs in the UK.
                Each dish is a culinary adventure, inspired by traditional
                recipes and infused with the chefs cultural heritage and their
                love for cooking.
              </p>
            </div>
          </div>

          <div className="2xl:py-[60px] xl:py-[40px] lg:py-[20px] sm:py-[10px] py-[]">
            {faqs.map((category, catIndex) => (
              <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center my-4" key={catIndex}>
                <div >
                  <h2 className="pop-head text-[#000000] alata font-[400]">
                    {category.title}
                  </h2>
                  <div className="custom_container mnavbar">
                    <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                      <div className="join join-vertical w-full text-start">
                        {category.Queries.map((item, index) => (
                          <div
                            className="collapse collapse-arrow join-item border-b sm:pt-[10px] text-[#000000] cursor-pointer"
                            key={item._id}
                          >
                            <input
                              type="radio"
                              name={`my-accordion-${catIndex}`}
                              checked={openIndex === `${catIndex}-${index}`}
                              onChange={() =>
                                toggleAccordion(`${catIndex}-${index}`)
                              }
                              className="cursor-pointer"
                            />
                            <div
                              className="collapse-title 2xl:text-[25px] md:text-[18px] flex justify-between items-center xs:text-[13px] xs:p-0 font-[400] alata"
                              onClick={() =>
                                toggleAccordion(`${catIndex}-${index}`)
                              }
                            >
                              {item.question}
                              <div
                                className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] xl:w-[25px] xl:h-[25px] lg:w-[16px] sm:w-[16px] flex items-center justify-center xs:text-[12px]`}
                                onClick={() =>
                                  toggleAccordion(`${catIndex}-${index}`)
                                }
                              >
                                {openIndex === `${catIndex}-${index}` ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px] cursor-pointer"
                                    onClick={() =>
                                      toggleAccordion(`${catIndex}-${index}`)
                                    }
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M18 12H6"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px] cursor-pointer"
                                    onClick={() =>
                                      toggleAccordion(`${catIndex}-${index}`)
                                    }
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            {openIndex === `${catIndex}-${index}` && (
                              <div className="collapse-content xs:px-0">
                                <p className="fourth_p">{item.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center my-3">
              <h2 className="pop-head 2xl:mt-[60px] text-[#000000] alata font-[400] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
                Ordering
              </h2>

              <div className="custom_container  mnavbar">
                <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                  <div className="join join-vertical w-full text-start">
                    {data2.map((item, index) => (
                      <div
                        className="collapse collapse-arrow join-item border-b  sm:pt-[10px] text-[#000000] "
                        key={index}
                      >
                        <input
                          type="radio"
                          name="my-accordion-4"
                          checked={openIndex === `ordering-${index}`}
                          onClick={() => toggleAccordion(index, "ordering")}
                          className="cursor-pointer"
                        />
                        <div
                          className="collapse-title 2xl:text-[25px]  flex justify-between items-center   md:text-[18px] xs:text-[13px] xs:p-0 font-[400] alata gap-2"
                          onClick={() => toggleAccordion(index, "ordering")}
                        >
                          {item.question}
                          <div
                            className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] xl:w-[25px] xl:h-[25px] lg:w-[16px] sm:w-[16px] flex items-center justify-center xs:text-[12px]`}
                            onClick={() => toggleAccordion(index, "ordering")}
                          >
                            {openIndex === `ordering-${index}` ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px]"
                                onClick={() =>
                                  toggleAccordion(index, "ordering")
                                }
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 12H6"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px]"
                                onClick={() =>
                                  toggleAccordion(index, "ordering")
                                }
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        {openIndex === `ordering-${index}` && (
                          <div className="collapse-content xs:px-0">
                            <p className="fourth_p">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default FAQs;
