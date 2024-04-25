import React from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import Navbar from "../navbar";

const PrivacyPolicy = () => {
  return (
    <>
      <section>
        <Navbar />
        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  mx-auto 2xl:py-[150px] xl:py-[120px] py-[70px] mnavbar">
          <div>
            <h1 className="third_head mb-5 text-center">Privacy Policy</h1>

            <p className="become-para mb-5">
              At Authentichef, accessible from [Your Website URL], one of our
              main priorities is the privacy of our visitors. This Privacy
              Policy document contains types of information that is collected
              and recorded by Authentichef and how we use it.
            </p>

            <h2>Log Files</h2>

            <p className="become-para mb-5">
              Authentichef follows a standard procedure of using log files...
            </p>

            {/* Add more sections as needed */}

            <h2>Contact Us</h2>

            <p className="become-para mb-5">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul>
              <li>Email: [Your Contact Email]</li>
            </ul>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default PrivacyPolicy;
