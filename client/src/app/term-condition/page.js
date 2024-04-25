
import React from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import Navbar from "../navbar";

const TermCondition = () => {
  return (
    <>
      <section>
        <Navbar />
        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  mx-auto 2xl:py-[150px] xl:py-[120px] py-[70px] mnavbar">
          <div
            className="max-w-3xl mx-auto px-4 md:px-6 text-xl text-gray-800 leading-normal"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <h1 className="third_head mb-5 text-center">
              Terms & Conditions
            </h1>
            <p className="become-para mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ut erat eget ipsum cursus facilisis. Quisque congue ultricies
              lectus, ac sollicitudin lorem vestibulum sit amet. Donec feugiat
              leo ut enim lobortis, et eleifend lectus laoreet. Morbi at semper
              justo, eget consectetur urna. Nam nec neque vel leo egestas
              dictum.
            </p>
            <p className="become-para mb-5">
              Phasellus ac lacus vel sem aliquet vehicula. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Donec malesuada erat in odio condimentum, vel aliquet
              orci blandit. Integer et sollicitudin dolor. Fusce fermentum
              pretium magna nec fermentum.
            </p>
            <p className="become-para mb-5">
              Suspendisse potenti. Donec ut odio ut mauris dictum euismod.
              Quisque sit amet aliquet ex. Nullam sit amet neque dui. Nam non
              velit vel nisi fermentum maximus. Phasellus et lorem id quam
              venenatis ultrices. Fusce nec libero nec metus euismod malesuada.
            </p>
            {/* Add more paragraphs as needed */}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default TermCondition;
