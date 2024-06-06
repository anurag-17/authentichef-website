import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Address = () => {
  const { token } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.auth);
  const id = user._id || "";

  const [addressinfo, setAddressinfo] = useState({});

  const [userData, setUserData] = useState({
    houseNo: "",
    buildingName: "",
    streetName: "",
    City: "",
    country: "",
    Postcode: "",
    FirstName: user.firstname,
    LastName: user.lastname,
    Type_of_Address: "Shipping Address",
    phone: "", // Add phone field if required
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
        const fetchedAddressInfo = response.data.user.deliveryInfo[0] || {};
        setAddressinfo(fetchedAddressInfo);
        setUserData({
          ...userData,
          houseNo: fetchedAddressInfo.houseNo || "",
          buildingName: fetchedAddressInfo.buildingName || "",
          streetName: fetchedAddressInfo.streetName || "",
          City: fetchedAddressInfo.City || "",
          country: fetchedAddressInfo.country || "",
          Postcode: fetchedAddressInfo.Postcode || "",
          phone: fetchedAddressInfo.phone || "",
        });
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Server error");
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        deliveryInfo: [
          {
            ...userData,
          },
        ],
      };

      const response = await axios.put(
        `${config.baseURL}/api/auth/edit-user`,
        updatedUser,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User Address Updated Successfully");
      } else {
        console.log("User Update Failed");
      }
    } catch (error) {
      toast.error("User Update Failed");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />

      <section>
        <div className="border rounded-[5px] 2xl:mt-[30px] xl:mt-[15px] mt-[15px] 2xl:px-[105px] 2xl:py-[80px] xl:px-[50px] xl:py-[40px] px-[40px] py-[25px] w-[80%]">
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div className="flex justify-between 2xl:gap-[20px] xl:gap-[15px] gap-[10px] xl:my-[10px] my-[8px] 2xl:my-[15px]">
                  <div className="2xl:w-[388px] w-full">
                    <label className="checkoutlable">
                      House No. <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      placeholder="Enter"
                      type="text"
                      name="houseNo"
                      value={userData.houseNo}
                      onChange={inputHandler}
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
                      value={userData.buildingName}
                      onChange={inputHandler}
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
                    value={userData.streetName}
                    onChange={inputHandler}
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
                      value={userData.City}
                      onChange={inputHandler}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="2xl:w-[251px] xl:w-[180px] w-[140px]">
                    <label className="checkoutlable">
                      County <span className="text-[#DB1414]">*</span>
                    </label>
                    <input
                      name="country"
                      type="text"
                      placeholder="Enter"
                      value={userData.country}
                      onChange={inputHandler}
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
                      value={userData.Postcode}
                      onChange={inputHandler}
                      className="w-full bg-[#F3F3F3] 2xl:h-[60px] xl:h-[40px] h-[30px] 2xl:text-[16px] xl:text-[12px] text-[9px] 2xl:p-[20px] xl:p-[10px] p-[8px] 2xl:mt-[10px] xl:mt-[5px] mt-[3px]"
                      maxLength={8}
                      inputMode="numeric" // Prevent increase/decrease arrows on mobile
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "textfield", // For Firefox
                        appearance: "none",
                        paddingRight: "16px", // Add some padding to compensate for hidden arrows
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
