"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import Footer from "../footer";

const FAQs = () => {
  const data = [
    {
      question: "How do you support your independent chefs?",
      answer:
        "We are passionate about supporting independent chefs from diverse communities in the UK. We provide them with a platform to share their culinary creations and connect with new customers all over the UK.",
    },
    {
      question: "How do I become a chef with authentichef?",
      answer:
        "Fill out our Chef Waiting List to learn more about the application process.",
    },
    {
      question: "Are the chefs on authentichef certified?",
      answer:
        "Absolutely! Our chefs are culinary rockstars! We ensure the highest quality by working with certified chefs. Each chef holds a level two food safety certificate and a hygiene rating approved by their local council. That means you get restaurant-grade food safety with a homemade touch.",
    },
  ];
  const data2 = [
    {
      question: "Is there a minimum spend?",
      answer: "Yes, there a minimum order of £30.",
    },
    {
      question: "Can I mix and match my dishes?",
      answer:
        " Yes, we encourage mixing and matching to suit your taste. You can even filter by dietary needs. Just add your favourites to your basket and we will deliver all dishes in one order for a convenient delivery.",
    },
    {
      question: "Can I order my dishes for the week?",
      answer:
        "Absolutley, we take the stress out of meal planning. Order our delicious frozen dishes and enjoy hot, authentic homemade dishes in under 20 minutes all week long!",
    },
    {
      question: "What do I do if my order arrives damaged or incomplete?",
      answer:
        " We take pride in careful packaging and handling. However, if your order arrives damaged or incomplete, please contact us immediately at support@authentichef.com with your order number and a brief description of the issue along with any photos. We'll rectify the situation as soon as possible.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards and secure online payment methods. Your information is safe and secure. ",
    },
    {
      question: "Do you offer any subscription plans or meal kits?",
      answer:
        "Currently, we don't offer subscriptions or meal kits. However, you can easily stock up on your favourite dishes by placing multiple orders or taking advantage of our free delivery on orders over £55. ",
    },
  ];
  const data3 = [
    {
      question: "Who cooks my dishes?",
      answer:
        "Our dishes are lovingly prepared by independent chefs in UK communities. We support their passion for authentic food.",
    },
    {
      question: "How long can I store frozen dishes in my freezer?",
      answer:
        "Our frozen dishes can last up to a month in your freezer, ensuring long-lasting freshness.",
    },
    {
      question: "Where do I find re-heating instructions?",
      answer:
        "Reheating instructions are included on the label and on the specific dish page on our website. You can also access them by scanning the QR code on the label.",
    },
    {
      question: "How do I know what allergens are in each dish?",
      answer:
        "Full ingredient lists and allergen information are available on each dish page.",
    },
    {
      question: "How do I find dishes that suit my dietary preferences?",
      answer:
        "We aim to offer a wide variety of dishes to suit different dietary needs and preferences. You can find options for vegetarians, vegans, Halal based dishes and those with specific allergies by filtering our Explore Dishes page.",
    },
    {
      question: "Does the dish include any preservatives or additives?",
      answer:
        "No preservatives or additives are added to the dish! Our chefs use fresh, high-quality ingredients and freeze the dishes in small batches to lock in flavour and extend shelf life.",
    },
  ];
  const data4 = [
    {
      question: "Where do you deliver?",
      answer:
        "We deliver to all Mainland UK. We currently do not deliver to Scottish Highlands and Northern Ireland.",
    },
    {
      question: "What time will my delivery arrive?",
      answer:
        "Your frozen dishes can arrive anytime between 8am and 6pm. DPD will provide a one-hour delivery window notification on the morning of delivery.",
    },
    {
      question: "What if I’m out when the delivery arrives?",
      answer:
        "We’ll ask you to enter some delivery instructions at checkout to let us know where we can leave your box if you’re not in. If you don't leave any instructions and you are out, your box will be placed by your front door. Just click on the link in your confirmation email to DPD's tracking portal online if you need to change the delivery instructions on the day!",
    },
    {
      question: "Can I change the delivery address of my order?",
      answer: "Yes, you can choose a different shipping address at checkout.",
    },
    {
      question: "Why do you deliver the dishes Frozen?",
      answer:
        "We freeze our dishes to lock in the freshness. Plus, frozen dishes offer incredible flexibility. They last much longer than refrigerated options (up to a month compared to just 2-3 days), reducing food waste and giving you the freedom to heat and enjoy them whenever you need. ",
    },
    {
      question: "What do I do when my dishes arrive?",
      answer: "Place them right in the freezer as soon as you can.",
    },
    {
      question: "Can I get free delivery?",
      answer:
        "Yes, we offer FREE delivery on orders over £55, otherwise delivery is £5.99.",
    },
    {
      question: "What time will my delivery arrive?",
      answer:
        "Your frozen dishes can arrive anytime between 8am and 6pm. Our courier partner will provide a one-hour delivery window notification on the morning of your delivery day.",
    },
    {
      question: "What if I’m out when the delivery arrives?",
      answer:
        "We’ll ask you to enter some delivery instructions at checkout to let us know where we can leave your box if you’re not in. If you don't leave any instructions and you are out, your box will be placed by your front door.",
    },
    {
      question: "What days do you deliver?",
      answer:
        "We offer the best food delivery service where you can choose your day of delivery! We deliver Monday to Thursday. Should you require a Saturday delivery, there will be an additional £10 surcharge added to your order. Please contact us should you require this. See our delivery schedule below for your fastest delivery date:",
    },
  ];
  const data5 = [
    {
      question: "How do you keep the dishes frozen?",
      answer:
        "We use specially designed insulated boxes which are recyclable, vegan friendly, frozen-safe packaging to keep your dishes frozen for up to 48 hours.",
    },
    {
      question: "What’s this dry ice all about?",
      answer:
        "We use dry ice to ensure your dishes arrive frozen. It evaporates naturally, but avoid touching it with bare hands! If some dry ice remains, leave the box open in a well-ventilated area to dispose of it safely. The cold can damage surfaces, so avoid placing it directly on anything. ",
    },
    {
      question: "Is the packaging recyclable?",
      answer:
        "We're committed to sustainability! All our packaging is 100% recyclable, and food containers/lids are compostable, which can go directly into your green waste.",
    },
  ];

  // const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the accordion item

  // const [isOpen, setIsOpen] = useState(false);

  // const toggleAccordion = () => {
  //   toggleAccordion(index);
  //   setOpenIndex(!openIndex);
  // };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index, section) => {
    const key = `${section}-${index}`;
    setOpenIndex((prevIndex) => (prevIndex === key ? null : key));
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
            <div className="text-center">
              <h2 className="pop-head  text-[#000000] alata font-[400] ">
                Chef Community
              </h2>
              <div className="custom_container mnavbar">
                <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                  <div className="join join-vertical w-full text-start">
                    {/* Mapping through accordion items */}
                    {data.map((item, index) => (
                      <div
                        className="collapse collapse-arrow join-item border-b sm:pt-[10px] text-[#000000]  cursor-pointer"
                        key={index}
                      >
                        <input
                          type="radio"
                          name="my-accordion-4"
                          checked={openIndex === `delivery-${index}`}
                          onClick={() => toggleAccordion(index, "delivery")}
                          className="cursor-pointer"
                        />
                        <div
                          className="collapse-title 2xl:text-[25px] md:text-[18px] flex justify-between items-center xs:text-[13px] xs:p-0 font-[400] alata"
                          onClick={() => toggleAccordion(index, "delivery")}
                        >
                          {item.question}
                          <div
                            className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] xl:w-[25px] xl:h-[25px] lg:w-[16px] sm:w-[16px] flex items-center justify-center xs:text-[12px]`}
                            onClick={() => toggleAccordion(index, "delivery")}
                          >
                            {openIndex === `delivery-${index}` ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px] cursor-pointer"
                                onClick={() =>
                                  toggleAccordion(index, "delivery")
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
                                  toggleAccordion(index, "delivery")
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
                        {openIndex === `delivery-${index}` && (
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

            <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center my-3">
              <h2 className="pop-head 2xl:mt-[60px] text-[#000000] alata font-[400] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
                Ordering
              </h2>

              <div className="custom_container  mnavbar">
                <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                  <div className="join join-vertical w-full text-start">
                    {/* Mapping through accordion items */}
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
            </div>

            <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center my-4">
              <h2 className="pop-head 2xl:mt-[60px] text-[#000000] alata font-[400] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
                Dish
              </h2>
              <div className="custom_container mnavbar">
                <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                  <div className="join join-vertical w-full text-start">
                    {/* Mapping through accordion items */}
                    {data3.map((item, index) => (
                      <div
                        className="collapse collapse-arrow join-item border-b sm:pt-[10px] text-[#000000] "
                        key={index}
                      >
                        <input
                          type="radio"
                          name="my-accordion-4"
                          checked={openIndex === `dish-${index}`}
                          onClick={() => toggleAccordion(index, "dish")}
                          className="cursor-pointer"
                        />
                        <div
                          className="collapse-title 2xl:text-[25px] flex justify-between items-center md:text-[18px] xs:text-[13px] xs:p-0  font-[400] alata gap-2"
                          onClick={() => toggleAccordion(index, "dish")}
                        >
                          {item.question}
                          <div
                            className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] xl:w-[25px] xl:h-[25px] lg:w-[16px] sm:w-[16px] flex items-center justify-center xs:text-[12px]`}
                            onClick={() => toggleAccordion(index, "dish")}
                          >
                            {openIndex === `dish-${index}` ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px]"
                                onClick={() => toggleAccordion(index, "dish")}
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
                                onClick={() => toggleAccordion(index, "dish")}
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
                        {openIndex === `dish-${index}` && (
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

            <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center my-4">
              <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] text-[#000000] alata font-[400] lg:mt-[25px] sm:mt-[20px] mt-[]">
                Delivery
              </h2>

              <div className="custom_container mnavbar">
                <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                  <div className="join join-vertical w-full text-start">
                    {data4.map((item, index) => (
                      <div
                        className="collapse collapse-arrow join-item border-b sm:pt-[10px] text-[#000000] "
                        key={index}
                      >
                        <input
                          type="radio"
                          name="my-accordion-4"
                          checked={openIndex === `data4-${index}`}
                          onClick={() => toggleAccordion(index, "data4")}
                          className="cursor-pointer"
                        />
                        <div
                          className="collapse-title 2xl:text-[25px] flex justify-between items-center md:text-[18px] xs:text-[13px] xs:p-0  font-[400] alata gap-2"
                          onClick={() => toggleAccordion(index, "data4")}
                        >
                          {item.question}
                          <div
                            className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] xl:w-[25px] xl:h-[25px] lg:w-[16px] sm:w-[16px] flex items-center justify-center xs:text-[12px]`}
                          >
                            {openIndex === `data4-${index}` ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px]"
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
                        {openIndex === `data4-${index}` && (
                          <div className="collapse-content xs:px-0">
                            <p className="fourth_p w-[94%]">
                              {item.answer}
                              {item.question ===
                                "What days do you deliver?" && (
                                <div className="overflow-x-auto mt-4">
                                  <table className="min-w-full border-collapse table-auto bg-white text-black border border-black">
                                    <thead>
                                      <tr className="border border-black">
                                        <th className="bg-white p-2 text-black font-bold border border-black">
                                          Order Day
                                        </th>
                                        <th className="bg-white p-2 text-black font-bold border border-black text-center">
                                          Delivery Day if order in BEFORE 8am
                                        </th>
                                        <th className="bg-white p-2 text-black font-bold border border-black text-center">
                                          Delivery Day if order in AFTER 8am
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-center">
                                      <tr className="bg-white border border-black">
                                        <td className="p-2 border border-black">
                                          Monday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Tuesday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Wednesday
                                        </td>
                                      </tr>
                                      <tr className="bg-gray-100 border border-black">
                                        <td className="p-2 border border-black">
                                          Tuesday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Wednesday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Thursday
                                        </td>
                                      </tr>
                                      <tr className="bg-white border border-black">
                                        <td className="p-2 border border-black">
                                          Wednesday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Thursday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Friday
                                        </td>
                                      </tr>
                                      <tr className="bg-gray-100 border border-black">
                                        <td className="p-2 border border-black">
                                          Thursday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Friday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Monday
                                        </td>
                                      </tr>
                                      <tr className="bg-white border border-black">
                                        <td className="p-2 border border-black">
                                          Friday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Monday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Tuesday
                                        </td>
                                      </tr>
                                      <tr className="bg-gray-100 border border-black">
                                        <td className="p-2 border border-black">
                                          Saturday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Tuesday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Tuesday
                                        </td>
                                      </tr>
                                      <tr className="bg-white border border-black">
                                        <td className="p-2 border border-black">
                                          Sunday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Tuesday
                                        </td>
                                        <td className="p-2 border border-black text-center">
                                          Tuesday
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center my-4">
              <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] text-[#000000] alata font-[400] lg:mt-[25px] sm:mt-[20px] mt-[]">
                Packaging and Sustainability
              </h2>

              <div className="custom_container mnavbar">
                <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                  <div className="join join-vertical w-full text-start">
                    {/* Mapping through accordion items */}
                    {data5.map((item, index) => (
                      <div
                        className="collapse collapse-arrow join-item border-b sm:pt-[10px] text-[#000000] "
                        key={index}
                      >
                        <input
                          type="radio"
                          name="my-accordion-4"
                          checked={openIndex === `data5-${index}`}
                          onClick={() => toggleAccordion(index, "data5")} // Add onClick handler here
                          className="cursor-pointer"
                        />
                        <div
                          className="collapse-title 2xl:text-[25px] flex justify-between items-center md:text-[18px] xs:text-[13px] xs:p-0 font-[400] alata gap-2"
                          onClick={() => toggleAccordion(index, "data5")} // Call toggleAccordion here as well
                        >
                          {item.question}
                          <div
                            className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] xl:w-[25px] xl:h-[25px] lg:w-[16px] sm:w-[16px] flex items-center justify-center xs:text-[12px]`}
                          >
                            {openIndex === `data5-${index}` ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px] xs:text-[12px]"
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
                        {openIndex === `data5-${index}` && (
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
        </div>

        <Footer />
      </section>
    </>
  );
};

export default FAQs;
