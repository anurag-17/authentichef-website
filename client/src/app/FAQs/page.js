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
      question: "What days do you deliver?",
      answer:
        "Choose your delivery day! We deliver Monday through Friday. For Monday delivery, get your orders in by midnight Saturday to guarantee your slot.",
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

  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the accordion item
  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <>
      <section>
        <Navbar />
        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  mx-auto 2xl:py-[150px] xl:py-[120px] py-[70px] mnavbar">
          <div className=" mx-auto text-center ">
            <h2 className="faqhead ">Your Questions Answered</h2>
            <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
              About Authentichef
            </h2>
          </div>
          <div className="bg-[#F38181] text-white mx-auto 2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] 2xl:h-[210px] flex items-center 2xl:px-[30px] xl:px-[20px] lg:px-[15px] sm:px-[10px] px-[] 2xl:mt-[30px] xl:mt-[20px] lg:mt-[10px] sm:mt-[10px] mt-[] py-[12px] xl:py-[15px] 2xl:py-0">
            <div className="">
              <h1 className="nine_p">
                What makes authentichef different from other food delivery
                companies?
              </h1>
              <h2 className="seven_p2">
                We believe food is not just a need; they’re journeys.
              </h2>
              <p className="2xl:w-[981px] xl:w-[] lg:w-[] sm:w-[] w-[] seven_p2">
                We connect you with delicious, authentic dishes from around the
                world, handcrafted by passionate independent chefs in the UK.
                Each dish is a culinary adventure, inspired by traditional
                recipes and infused with the chefs cultural heritage and their
                love for cooking.
              </p>
            </div>
          </div>

          <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center">
            <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
              Chef Community
            </h2>
            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] mx-auto mnavbar">
              <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                <div className="join join-vertical w-full text-start">
                  {/* Mapping through accordion items */}
                  {data.map((item, index) => (
                    <div
                      className="collapse collapse-arrow join-item border-b"
                      key={index}
                    >
                      <input
                        type="radio"
                        name="my-accordion-4"
                        defaultChecked={openIndex === index}
                      />
                      <div
                        className="collapse-title text-xl font-medium flex justify-between items-center nine_p"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.question}
                        <div
                          className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[] flex items-center justify-center`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="collapse-content">
                        <p className="seven_h2">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center">
            <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
              Ordering
            </h2>

            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] mx-auto mnavbar">
              <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                <div className="join join-vertical w-full text-start">
                  {/* Mapping through accordion items */}
                  {data2.map((item, index) => (
                    <div
                      className="collapse collapse-arrow join-item border-b"
                      key={index}
                    >
                      <input
                        type="radio"
                        name="my-accordion-4"
                        defaultChecked={openIndex === index}
                      />
                      <div
                        className="collapse-title text-xl font-medium flex justify-between items-center nine_p"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.question}
                        <div
                          className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[] flex items-center justify-center`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="collapse-content">
                        <p className="seven_h2">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center">
            <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
              Dish
            </h2>
            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] mx-auto mnavbar">
              <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                <div className="join join-vertical w-full text-start">
                  {/* Mapping through accordion items */}
                  {data3.map((item, index) => (
                    <div
                      className="collapse collapse-arrow join-item border-b"
                      key={index}
                    >
                      <input
                        type="radio"
                        name="my-accordion-4"
                        defaultChecked={openIndex === index}
                      />
                      <div
                        className="collapse-title text-xl font-medium flex justify-between items-center nine_p"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.question}
                        <div
                          className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[] flex items-center justify-center`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="collapse-content">
                        <p className="seven_h2">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center">
            <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
              Delivery
            </h2>

            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] mx-auto mnavbar">
              <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                <div className="join join-vertical w-full text-start">
                  {/* Mapping through accordion items */}
                  {data4.map((item, index) => (
                    <div
                      className="collapse collapse-arrow join-item border-b"
                      key={index}
                    >
                      <input
                        type="radio"
                        name="my-accordion-4"
                        defaultChecked={openIndex === index}
                      />
                      <div
                        className="collapse-title text-xl font-medium flex justify-between items-center nine_p"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.question}
                        <div
                          className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[] flex items-center justify-center`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="collapse-content">
                        <p className="seven_h2">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:mt-[60px] xl:mt-[40px] lg:mt-[20px] sm:mt-[10px] mt-[] text-center">
            <h2 className="pop-head 2xl:mt-[60px] xl:mt-[40px] lg:mt-[25px] sm:mt-[20px] mt-[]">
              Packaging and Sustainability
            </h2>

            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px] md:w-[700px] mx-auto mnavbar">
              <div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[] mx-auto">
                <div className="join join-vertical w-full text-start">
                  {/* Mapping through accordion items */}
                  {data5.map((item, index) => (
                    <div
                      className="collapse collapse-arrow join-item border-b"
                      key={index}
                    >
                      <input
                        type="radio"
                        name="my-accordion-4"
                        defaultChecked={openIndex === index}
                      />
                      <div
                        className="collapse-title text-xl font-medium flex justify-between items-center nine_p"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.question}
                        <div
                          className={`rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[] flex items-center justify-center`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="collapse-content">
                        <p className="seven_h2">{item.answer}</p>
                      </div>
                    </div>
                  ))}
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



<div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  mx-auto mnavbar">
<div className="2xl:w-[1129px] xl:w-[700px] lg:w-[550px] sm:w-[] w-[]  mx-auto">
  <div className="2xl:mt-[30px] xl:mt-[25px] lg:mt-[10px] sm:mt-[10px] mt-[] 2xl:px-[30px] xl:px-[20px] lg:px-[10px] sm:px-[10px] px-[]">
    <div className="2xl:h-[72px] xl:h-[50px] lg:h-[25px] sm:h-[20px] h-[] flex items-center border-b">
      <div className="flex justify-between w-full">
        <h1 className="nine_p">
          How do you keep the dishes frozen?
        </h1>
        <div className="relative flex justify-center items-center rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </div>
    <div className="2xl:h-[72px] xl:h-[50px] lg:h-[25px] sm:h-[20px] h-[] flex items-center border-b">
      <div className="flex justify-between w-full">
        <h1 className="nine_p">What’s this dry ice all about?</h1>
        <div className="relative flex justify-center items-center rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </div>
    <div className="2xl:h-[72px] xl:h-[50px] lg:h-[25px] sm:h-[20px] h-[] flex items-center border-b">
      <div className="flex justify-between w-full">
        <h1 className="nine_p">Is the packaging recyclable?</h1>
        <div className="relative flex justify-center items-center rounded-full bg-[#F38181] 2xl:w-[32px] 2xl:h-[32px] o xl:w-[25px] lg:w-[16px] sm:w-[16px] w-[]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" text-white 2xl:w-[25px] 2xl:h-[25px] xl:w-[18px] xl:h-[18px] w-[12px] h-[12px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</div>