import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Address = () => {
  const { token } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.auth);
  const id = user._id;

  const [deliveryInfo, setDeliveryInfo] = useState({
    houseNo: "",
    buildingName: "",
    streetName: "",
    City: "",
    country: "",
    Postcode: "",
    phone: "",
    Type_of_Address: "Shipping Address",
    FirstName: user.firstname,
    LastName: user.lastname,
  });

  const [billingInfo, setBillingInfo] = useState({
    houseNo: "",
    buildingName: "",
    streetName: "",
    City: "",
    country: "",
    Postcode: "",
  });

  useEffect(() => {
    defaultUser();
  }, []);

  const defaultUser = async () => {
    try {
      const response = await axios.post(
        `${config.baseURL}/api/auth/getUserById`,
        { _id: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const fetchedDeliveryInfo = response.data.user.deliveryInfo[0] || {};
        const fetchedBillingInfo = response.data.user.BillingInfo[0] || {};

        setDeliveryInfo({
          ...deliveryInfo,
          ...fetchedDeliveryInfo,
        });
        setBillingInfo({
          ...billingInfo,
          ...fetchedBillingInfo,
        });
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Server error");
    }
  };

  const inputHandler = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        deliveryInfo: [deliveryInfo],
        BillingInfo: [billingInfo],
      };

      const response = await axios.put(
        `${config.baseURL}/api/auth/edit-user`,
        updatedUser,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User Address Updated Successfully");
      } else {
        toast.error("User Update Failed");
      }
    } catch (error) {
      toast.error("User Update Failed");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />

      <section>
        <div className="border rounded-[5px] 2xl:mt-[30px] xl:mt-[15px] mt-[15px] 2xl:px-[105px] 2xl:py-[40px] xl:px-[50px] xl:py-[20px] px-[10px] sm:px-[40px] py-[15px] ">
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <h2 className="pop-heads 2xl:mt-[30px]">Shipping Address</h2>
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                  <div className="2xl:w-[388px] w-full">
                    <label className="checkoutlable">
                      House No. <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      placeholder="Enter"
                      type="text"
                      name="houseNo"
                      value={deliveryInfo.houseNo}
                      onChange={(e) => inputHandler(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={200}
                      required
                    />
                  </div>
                  <div className="2xl:w-[388px] w-full">
                    <label className="checkoutlable">Building Name.</label>
                    <input
                      type="text"
                      name="buildingName"
                      placeholder="Enter"
                      value={deliveryInfo.buildingName}
                      onChange={(e) => inputHandler(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={200}
                    />
                  </div>
                </div>
                <div>
                  <label className="checkoutlable">
                    Street Name <span className="text-[#DB1414]">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetName"
                    placeholder="Enter"
                    value={deliveryInfo.streetName}
                    onChange={(e) => inputHandler(e, setDeliveryInfo)}
                    className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    maxLength={200}
                    required
                  />
                </div>
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                  <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                    <label className="checkoutlable">
                      Town/City <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      type="text"
                      name="City"
                      placeholder="Enter"
                      value={deliveryInfo.City}
                      onChange={(e) => inputHandler(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                    <label className="checkoutlable">
                      Country <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      name="country"
                      type="text"
                      placeholder="Enter"
                      value={deliveryInfo.country}
                      onChange={(e) => inputHandler(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                    <label className="checkoutlable">
                      Postcode <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      type="text"
                      name="Postcode"
                      placeholder="Enter"
                      value={deliveryInfo.Postcode}
                      onChange={(e) => inputHandler(e, setDeliveryInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={8}
                      inputMode="numeric"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                        appearance: "none",
                        paddingRight: "16px",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h2 className="pop-heads 2xl:mt-[30px]">Billing Address</h2>
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                  <div className="2xl:w-[388px] w-full">
                    <label className="checkoutlable">
                      House No. <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      placeholder="Enter"
                      type="text"
                      name="houseNo"
                      value={billingInfo.houseNo}
                      onChange={(e) => inputHandler(e, setBillingInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={200}
                      required
                    />
                  </div>
                  <div className="2xl:w-[388px] w-full">
                    <label className="checkoutlable">Building Name.</label>
                    <input
                      type="text"
                      name="buildingName"
                      placeholder="Enter"
                      value={billingInfo.buildingName}
                      onChange={(e) => inputHandler(e, setBillingInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={200}
                    />
                  </div>
                </div>
                <div>
                  <label className="checkoutlable">
                    Street Name <span className="text-[#DB1414]">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetName"
                    placeholder="Enter"
                    value={billingInfo.streetName}
                    onChange={(e) => inputHandler(e, setBillingInfo)}
                    className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                    maxLength={200}
                    required
                  />
                </div>
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                  <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                    <label className="checkoutlable">
                      Town/City <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      type="text"
                      name="City"
                      placeholder="Enter"
                      value={billingInfo.City}
                      onChange={(e) => inputHandler(e, setBillingInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                    <label className="checkoutlable">
                      Country <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      name="country"
                      type="text"
                      placeholder="Enter"
                      value={billingInfo.country}
                      onChange={(e) => inputHandler(e, setBillingInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                    <label className="checkoutlable">
                      Postcode <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      type="text"
                      name="Postcode"
                      placeholder="Enter"
                      value={billingInfo.Postcode}
                      onChange={(e) => inputHandler(e, setBillingInfo)}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={8}
                      inputMode="numeric"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                        appearance: "none",
                        paddingRight: "16px",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="2xl:mt-[50px] xl:mt-[30px] mt-[20px]">
              <button
                type="submit"
                className="alata font-[400] bg-[#DB5353] text-white mx-auto rounded-[5px] 2xl:w-[120px] 2xl:h-[56px] 2xl:text-[20px] 2xl:leading-[27.6px] xl:text-[12px] text-[10px] xl:w-[80px] xl:py-[8px] lg:py-[6px] lg:px-4 px-3 py-1 hover:bg-[#7e2727]"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Address;
