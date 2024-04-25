import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../footer";
import Navbar from "../navbar";


const ChefDetail = () => {
  return (
    <>
      <section>
      <Navbar/>

        <Footer />
      </section>
    </>
  );
};
export default dynamic(() => Promise.resolve(ChefDetail), { ssr: false });
