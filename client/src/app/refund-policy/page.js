"use client";
import React from "react";
import Footer from "../footer";
import Navbar from "../navbar";

const RefundPolicy = () => {
  return (
    <>
      <section>
        <Navbar />
        <div className="2xl:w-[1600px] mnavbar alata xl:w-[1100px] lg:w-[850px]  md:w-[747px] xs:w-[90%] sm:w-[93%]  mx-auto 2xl:pt-[120px]  xl:pt-[100px] lg:pt-[80px] md:pt-[60px] xs:pt-[60px] sm:pt-[60px] mnavbar">
          <div>
            <h1 className="third_head mb-7 alata 2xl:pt-[20px]  2xl:mb-8 xl:mb-6 lg:mb-5 md:mb-4 sm:mb-4 xs:mb-4 xs:items-center xs:justify-center">
              REFUND POLICY
            </h1>

            <p className="footer_text mb-7 2xl:mb-10 alata  ">
              Thank you for choosing Authentichef. We strive to provide the best
              possible service to our Customers at all times. However, we
              understand that there may be occasions where a refund is
              necessary. Please read our Refund Policy below to understand our
              terms and conditions for processing refund requests.
            </p>

            <h2 className="mb-2 privacyHead font-[400] alata">
              1. ELIGIBILITY FOR REFUND
            </h2>

            <p className="footer_text mb-7 2xl:mb-10 flex items-center justify-center">
              As a general rule, Customers are encouraged not to cancel their
              orders once placed. However, refunds will be considered for orders
              placed through the Authentichef Website that meet any one or more
              of the following conditions – <br></br>• The order was cancelled by
              Customer within thirty (30) minutes of being placed, irrespective
              of reason of cancellation. Please note, subject to the Customer’s
              previous cancellation history, Authentichef reserves the right to
              deny them any refund even if the same is within the thirty-minute
              timeframe.
              <br></br>• The order was cancelled by the Chef within thirty (30)
              minutes of being placed, irrespective of reason of cancellation.
              Please note, subject to the Chef’s previous cancellation history,
              Authentichef reserves the right to suspend or otherwise block
              access or remove the Chef from the Website for unreasonable
              cancellations.<br></br>• The order could not be fulfilled as the
              delivery address was incorrect or incomplete or out-of-zone.
              Please note, subject to the Customer’s previous refund history,
              Authentichef reserves the right to deduct any applicable
              administrative fee from the final refund amount for such avoidable
              errors, and/or refuse to accept future orders in the same delivery
              address. <br></br>• The order could not be fulfilled as the ordered
              item or some of its ingredients were out of stock.<br></br>• The
              order could not be fulfilled as the special instructions or
              customisations requested by the Customer could not be implemented
              by the Chef, or the Chef was unable to prepare the food without
              incorporating items that do not conflict with the Customer’s
              instructions or customisation request. <br></br>• The order could
              not be fulfilled as there was a force majeure event outside the
              control of Authentichef, or the Chef or the delivery personnel.
              <br></br>• The order could not be fulfilled as no delivery
              personnel was available for pickup, or the delivery timeframe
              estimate given by such delivery personnel was more than four (4)
              hours.
              <br></br>• The order received had missing items in the order.
              <br></br>• The order received had packaging or spillage issues or
              otherwise was not fit to be delivered.
              <br></br>• The order received had food safety or hygiene issues or
              otherwise was not fit to be delivered.
              <br></br>• The order was not received by the Customer but was
              marked by our delivery partners as delivered, provided the
              Customer supplies sufficient evidence that satisfactorily
              contradicts the delivery tracker.
              <br></br>• The order was not received by the Customer within the
              timeframe specified by Authentichef, and all efforts to resolve
              the delay were unsuccessful.
              <br></br>• Notwithstanding any of the above, Authentichef reserves
              the right to refuse a refund for an order, should we feel the
              reasons stated are incorrect, inaccurate, invalid, fictitious or
              false.
              <br></br>• For all of the above, Authentichef’s decision on refunds
              shall be final and binding.
            </p>

            {/* Add more sections as needed */}

            <h2 className="mb-2 privacyHead font-[400]">2. REFUND PROCESS</h2>

            <p className="footer_text mb-7 2xl:mb-10">
              To request a refund, you must contact our customer support team at
              support@authentichef.com, who will review your request and decide
              whether they require additional information or evidence to process
              it, such as photographs of the food received (when refund is
              requested for spillage or missing items) or alternative tracker
              record (when refund is requested for delivery marked as delivered
              but not received). Once the request is approved, your refund will
              be issued to the original payment method used and processed within
              7 business days. Please note there is no need or provision for
              return of a food order to receive a refund, since the orders are
              typically perishable in nature.
            </p>

            <h2 className="mb-2 privacyHead font-[400]">
              3. DISPUTE RESOLUTION
            </h2>

            <p className="footer_text mb-7 2xl:mb-10">
              In the event of a dispute related to refunds, Authentichef will
              work with both the Customer and the Chef to reach a resolution.
              Authentichef reserves the right to make the final decision
              regarding refund eligibility based on the provided evidence and
              this Refund Policy.{" "}
            </p>

            <p className="footer_text mb-7 2xl:mb-10">
              If you have any further questions, comments or requests regarding
              this Refund Policy, please email us at support@authentichef.com.
            </p>
            <p className="footer_text mb-7 2xl:mb-10">
              This Refund Policy was last updated in April 2024.
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default RefundPolicy;
