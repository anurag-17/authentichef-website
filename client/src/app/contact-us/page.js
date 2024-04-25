import React from "react";
import Footer from "../footer";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../navbar";

const ContactUS = () => {
  return (
    <>
      <section>
        <Navbar />

        <div className="2xl:w-[859px] xl:w-[] lg:w-[] sm:w-[] w-[] text-center mx-auto 2xl:pt-[160px] xl:pt pt-[120px] ">
          <h1 className="globalhead">Contact-US</h1>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default ContactUS;
