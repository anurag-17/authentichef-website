"use client";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ChefDetails = ({ params }) => {
  const [getAChef, setGetAChef] = useState({});
  const [chefItems, setChefItems] = useState("");

  useEffect(() => {
    defaultChef();
    defaultChefitems();
  }, []);
  const defaultChef = () => {
    const option = {
      method: "GET",
      url: `http://13.43.174.21:4000/api/chef/chefs/${params.slug}`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetAChef(response?.data);
        console.log(response?.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  const defaultChefitems = () => {
    const option = {
      method: "GET",
      url: `http://13.43.174.21:4000/api/menu/menuItems/chef/${params.slug}`,
    };
    axios
      .request(option)
      .then((response) => {
        setChefItems(response?.data);
        console.log(response?.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  return (
    <>
      <div>
        <Navbar />
        <div>
          <section className="h-screen">
            <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px] w-full px-10 md:px-0  flex justify-between items-center mnavbar pt-[116px] mx-auto text-black">
              {Array.isArray(chefItems) &&
                chefItems.map((item) => (
                  <div className="flex">
                    <div>
                      {/* <Image src={item?.images[0]} /> */}
                    </div>
                    <div>
                      <h1>{item?.email}</h1>
                    </div>
                  </div>
                ))}
              hh
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ChefDetails;
