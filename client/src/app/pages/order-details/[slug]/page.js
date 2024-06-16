"use client";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = ({ params }) => {
  const { token } = useSelector((state) => state?.auth);
  const [getOrders, setGetOrders] = useState({});

  useEffect(() => {
    defaultOrder();
  }, []);
  const defaultOrder = () => {
    const option = {
      method: "GET",
      url: `${config.baseURL}/api/order/orderListById/${params.slug}`,
      headers: {
        authorization: token,
      },
    };
    axios
      .request(option)
      .then((response) => {
        setGetOrders(response?.data?.order);
        console.log(response?.data?.order, "orders");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  return (
    <>
      <Navbar />
      <section>
        <div className="flex justify-center py-10 2xl:pt-[180px] xl:pt-[130px] md:pt-[100px] pt-[80px]">
          <div className=" lg:w-1/2 border rounded-lg py-[20px] sm:w-[75%] w-[95%]">
            <h1 className="inter font-[600] 2xl:text-[40px] xl:text-[25px] text-[20px] text-center">
              Order Details
            </h1>

            <div className="flex flex-col items-center w-full px-[40px]">
              {/* Displaying total amount */}
              <h1 className="2xl:text-[25px] xl:text-[16px] text-[12px] font-semibold">
                Total Amount: £
                {getOrders.totalAmount}
              </h1>

              {/* Iterating over the items */}
              {Array.isArray(getOrders.items) &&
                getOrders.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-5 md:gap-0 2xl:gap-10 justify-between items-center mt-5 w-full"
                  >
                    <div className="w-[20%]">
                      <img
                        src={item.ProfileImage[0]}
                        className="rounded-[15px] 2xl:w-[250px] h-auto w-full md:w-[80%]"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[80%] pop-detail">
                      <h2 className=" 2xl:text-[25px] 2xl:leading-[35px] xl:text-[16px] text-[16px] lg:text-[14px] leading-[20px] lg:leading-[18px] xl:leading-[20px] capitalize">{item.name}</h2>
                      <p className="text-[14px] leading-[18px] lg:text-[16px] xl:leading-[20px] 2xl:text-[18px] lg:my-1">Quantity : {item.quantity}</p>
                      <p className="text-[14px] leading-[18px] lg:text-[16px] xl:leading-[20px] 2xl:text-[18px] lg:my-1">Price : £
                      {item.price}</p>
                    </div>
                  </div>
                ))}
              <div className="sm:flex justify-around w-full">
                <div className="sm:w-1/2">
                  {/* Displaying delivery info */}
                  {Array.isArray(getOrders.deliveryInfo) &&
                    getOrders.deliveryInfo.map((info, index) => (
                      <div key={index} className="mt-5">
                        <h2 className="font-semibold 2xl:text-[25px] xl:text-[16px] text-[16px]">
                          Delivery Information:
                        </h2>
                        <p className="footer_text flex w-full">Phone : {info.phone}</p>
                        <p className="footer_text flex w-full">House No : {info.houseNo}</p>
                        <p className="footer_text flex w-full">Building : {info.buildingName}</p>
                        <p className="footer_text flex w-full">Street : {info.streetName}</p>
                        <p className="footer_text flex w-full">City : {info.City}</p>
                        <p className="footer_text flex w-full">Country : {info.country}</p>
                        <p className="footer_text flex w-full">First Name : {info.FirstName}</p>
                        <p className="footer_text flex w-full">Last Name : {info.LastName}</p>
                        <p className="footer_text flex w-full">Type of Address : {info.Type_of_Address}</p>
                      </div>
                    ))}
                </div>

                {/* Displaying other order details */}
                <div className=" sm:w-1/2 mt-5">
                  <h2 className="2xl:text-[25px] xl:text-[16px] text-[16px] font-semibold">
                    Order Details:
                  </h2>
                  <p className="footer_text flex w-full">Status : {getOrders.status}</p>
                  <p className="footer_text flex w-full">
                    Order Date :{" "}
                    {new Date(getOrders.orderDate).toLocaleString()}
                  </p>
                  <p className="footer_text flex w-full">
                    Delivery Date :{" "}
                    {/* {new Date(getOrders.deliveryDate).toLocaleDateString()} */}
                    2-3 Working Days
                  </p>
                  <p className="footer_text flex w-full">Promo Code : {getOrders.Promo_code}</p>
                  <p className="footer_text flex w-full">Discount Applied : £{getOrders.discountApplied}</p>
                  <p className="footer_text flex w-full">Discount Percentage : {getOrders.DiscountPercentage.tofixed(2)}%</p>
                  <p className="footer_text flex w-full">Shipping Charge : £{getOrders.shippingCharge}</p>
                  <p className="footer_text flex w-full">
                    Total Before Discount : £
                    {getOrders.totalAmountBeforeDiscount.toFixed(2)}                  </p>
                  <p className="footer_text flex w-full">Payment ID : {getOrders.payment}</p>
                  <p className="footer_text flex w-full">Transaction ID : {getOrders.TransactionId}</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderDetails;


// {
//   "totalOrders": 1,
//   "totalPages": 1,
//   "currentPage": 1,
//   "orders": [
//       {
//           "_id": "666c8cfb6fba916d0baabb30",
//           "items": [
//               {
//                   "menuItem": {
//                       "popular_chef": "No",
//                       "_id": "666a33836995ad2fbba02c21",
//                       "name": "Chicken Tikka with Pilau Rice",
//                       "popular_dish": "Yes",
//                       "description": "<p><span style=\"color: rgb(31, 31, 31);\">An authentic Indian chicken curry in a creamy tomato tikka masala sauce served pilau rice</span></p>",
//                       "price": 7.6,
//                       "weight": 400,
//                       "portion_Size": "1",
//                       "Ingredients": "<p><span style=\"color: rgb(31, 31, 31);\">Pilau Rice (49%) [Water, Basmati Rice, Onion, Rapeseed Oil, Lemon Juice, Cumin Seeds, Cardamom Seeds, Turmeric], Chicken Tikka Masala (30%) [Onion, Tomatoes, Water, Cream</span><strong style=\"color: rgb(31, 31, 31);\"> (Milk)</strong><span style=\"color: rgb(31, 31, 31);\">, Tomato Purée, Rapeseed Oil, Yogurt </span><strong style=\"color: rgb(31, 31, 31);\">(Milk)</strong><span style=\"color: rgb(31, 31, 31);\">, Ginger, Garlic, Sugar, Salt, Paprika, Ground Coriander, Chilli Powder, Garam Masala, Turmeric, Fenugreek Seeds, Ground Cumin, Cinnamon, Basil], Marinated Chicken Tikka(20%) [Halal Chicken, Yogurt</span><strong style=\"color: rgb(31, 31, 31);\"> (Milk)</strong><span style=\"color: rgb(31, 31, 31);\">, Garlic, Ginger, Rapeseed Oil, Paprika, Garam Masala, Lemon Juice, Chilli Powder, (Coriander, Chilli Red, Cumin, Turmeric, Salt, Musk Melon, </span><strong style=\"color: rgb(31, 31, 31);\">Mustard</strong><span style=\"color: rgb(31, 31, 31);\">, Fenugreek Leaves, Dried Garlic, Dried Ginger, Black Pepper, Dried Onion, Cardamom, Cinnamon, Fennel, Cloves, Nutmeg, Mace, Green Cardamom, Asafoetida), Dried Fenugreek Leaves], Sunflower Seeds, Spring Onions.</span></p>",
//                       "Heating_Instruction": "<p>MICROWAVE FROM FROZEN<span style=\"color: rgb(31, 31, 31);\"> </span></p><p>Remove sleeve. Pierce film in several places. Place in Microwave (<span style=\"color: rgb(31, 31, 31);\">700-800W) for 6-7 minutes. Remove film and add 1-2 tsp of water, stir it and further heat it for 2 minutes. Ensure that the meal is piping hot before serving.</span></p>",
//                       "List_of_Allergens": "<p><span style=\"color: rgb(31, 31, 31);\">Milk, Mustard</span></p>",
//                       "Cuisines_id": "6625ea4c9fff9e1fc6ea306c",
//                       "Dietary_id": [
//                           "662100e285c40f67b662e722"
//                       ],
//                       "spice_level_id": "662101a585c40f67b662e730",
//                       "chef_id": "6646e0099d23de49def8a049",
//                       "Nutrition_id": [
//                           "664ae34db9d2a1b40506f7ca",
//                           "664ae327b9d2a1b40506f7c4"
//                       ],
//                       "nutritional_information": "<p><strong>Per Portion (400g)</strong></p><p>Calories: 418kcal</p><p>Fat: 19g</p><p>Carbs: 30g</p><p>Sugar: 3.5g</p><p>Protein: 32g</p><p>Salt: 1.3g</p>",
//                       "ProfileImage": [
//                           "https://authimages.s3.eu-west-2.amazonaws.com/profile-images/Chicken%20Tikka%20with%20Pilau%20Rice-1718236306528-0"
//                       ],
//                       "qrCode": "data:image/png;base64,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",
//                       "createdAt": "2024-06-12T23:47:15.585Z",
//                       "updatedAt": "2024-06-14T20:25:23.646Z",
//                       "__v": 1,
//                       "Dishtype_id": "6621002685c40f67b662e70e",
//                       "SKU_Number": "ChickenTikkawithPilauRice122"
//                   },
//                   "quantity": 1,
//                   "price": 7.6,
//                   "ProfileImage": [
//                       "https://authimages.s3.eu-west-2.amazonaws.com/profile-images/Chicken%20Tikka%20with%20Pilau%20Rice-1718236306528-0"
//                   ],
//                   "name": "Chicken Tikka with Pilau Rice",
//                   "_id": "666c8cfb6fba916d0baabb31",
//                   "OrderId": "666c8cfb6fba916d0baabb30"
//               },
//               {
//                   "menuItem": {
//                       "popular_chef": "No",
//                       "_id": "666a39b36995ad2fbba02d66",
//                       "name": "Creamy Garlic Prawn Spaghetti",
//                       "popular_dish": "Yes",
//                       "description": "<p>Africana Tandoori Spiced Seasoned King Prawn folded in a garlic creamy tomato-based sauce served with spaghetti.</p>",
//                       "price": 7.8,
//                       "weight": 400,
//                       "portion_Size": "1",
//                       "Ingredients": "<p><span style=\"color: rgb(31, 31, 31);\">Spaghetti</span><strong style=\"color: rgb(31, 31, 31);\"> (Wheat, Egg)</strong><span style=\"color: rgb(31, 31, 31);\">, Butter Pasta Sauce (Cream</span><strong style=\"color: rgb(31, 31, 31);\"> (Milk)</strong><span style=\"color: rgb(31, 31, 31);\">, Water, Tomato Paste, Water, Rapeseed Oil, </span><strong style=\"color: rgb(31, 31, 31);\">Butter</strong><span style=\"color: rgb(31, 31, 31);\"> </span><strong style=\"color: rgb(31, 31, 31);\">(Milk)</strong><span style=\"color: rgb(31, 31, 31);\">, Tandoori Masala (Garlic Powder, Paprika, Fenugreek Leaves, Nigella Seeds, Salt, Garam Masala, Ground Cumin, Ground Coriander, Turmeric, Cayenne Pepper, Black Pepper, Ground Ginger, Coriander Leaves), Lemon Juice, Salt, </span><strong style=\"color: rgb(31, 31, 31);\">Cooked King Prawns (Crustaceans)</strong><span style=\"color: rgb(31, 31, 31);\">, Edamame Beans</span><strong style=\"color: rgb(31, 31, 31);\"> (Soya)</strong><span style=\"color: rgb(31, 31, 31);\">, Tomatoes, Coriander Leaves</span></p>",
//                       "Heating_Instruction": "<p>MICROWAVE FROM FROZEN</p><p>Remove sleeve. Pierce film in several places. <span style=\"color: rgb(31, 31, 31);\">Place the meal tray in Microwave (700-800W) and heat it for 6-7 minutes. Add 1-2 tsp of water, stir it and further heat it for 2 minutes. Once piping hot, stir the sauce thoroughly the pasta.</span></p>",
//                       "List_of_Allergens": "<p><span style=\"color: rgb(31, 31, 31);\">Crustaceans, Eggs, Fish, Milk, Soya</span></p>",
//                       "Cuisines_id": "6620fe31a5e862e9eff322f4",
//                       "Dietary_id": [
//                           "662100e285c40f67b662e722"
//                       ],
//                       "spice_level_id": "662101a585c40f67b662e730",
//                       "chef_id": "6646e0099d23de49def8a049",
//                       "Nutrition_id": [
//                           "664ae34db9d2a1b40506f7ca",
//                           "664ae327b9d2a1b40506f7c4"
//                       ],
//                       "nutritional_information": "<p><strong>Per Portion (400g)</strong></p><p>Calories: 489kcal</p><p>Fat: 17g</p><p>Carbs: 66g</p><p>Sugar: 4.9g</p><p>Protein: 26g</p><p>Salt: 2g</p>",
//                       "ProfileImage": [
//                           "https://authimages.s3.eu-west-2.amazonaws.com/profile-images/Creamy%20Garlic%20Prawn%20Pasta-1718237619024-0"
//                       ],
//                       "qrCode": "data:image/png;base64,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",
//                       "createdAt": "2024-06-13T00:13:39.107Z",
//                       "updatedAt": "2024-06-14T10:13:32.407Z",
//                       "__v": 0,
//                       "Dishtype_id": "6621002685c40f67b662e70e",
//                       "SKU_Number": "CreamyGarlicPrawnPasta124"
//                   },
//                   "quantity": 1,
//                   "price": 7.8,
//                   "ProfileImage": [
//                       "https://authimages.s3.eu-west-2.amazonaws.com/profile-images/Creamy%20Garlic%20Prawn%20Pasta-1718237619024-0"
//                   ],
//                   "name": "Creamy Garlic Prawn Spaghetti",
//                   "_id": "666c8cfb6fba916d0baabb32",
//                   "OrderId": "666c8cfb6fba916d0baabb30"
//               },
//               {
//                   "menuItem": {
//                       "popular_chef": "No",
//                       "_id": "666a377c6995ad2fbba02d18",
//                       "name": "Sweet Potato & Butter Bean Curry",
//                       "popular_dish": "Yes",
//                       "description": "<p><span style=\"color: rgb(31, 31, 31);\">Delicious and tender sweet potato and butter beans in an aromatic coconut and thyme sweet and spicy curry sauce with rice.</span></p>",
//                       "price": 7.4,
//                       "weight": 400,
//                       "portion_Size": "1",
//                       "Ingredients": "<p><span style=\"color: rgb(31, 31, 31);\">Sweet Potato &amp; Butter Bean Curry (50%) (Butter Beans, Potato, Sweet Potato, Water, Onion, Coconut Milk [Coconut Extract (54.6%), Water, Stabilser: Carbomethyl Cellulose, Emulsifier: Polysorbate 60], Rapeseed Oil, Ground Coriander, Ground Turmeric, Ground Cumin, Salt , Ground Fenugreek, Ground Chilli, Ground Black Pepper, Garlic Powder, Ground Ajowan, Coriander Leaves, Spring Onion, Lemon Juice, Ginger, Garlic, Thyme, Salt), Cooked Rice (50%) (Water, Cooked Basmati Rice, Spring Onion, Rapeseed Oil, Salt),Baby Corn, Spring Onion.</span></p>",
//                       "Heating_Instruction": "<p>MICROWAVE FROM FROZEN</p><p><span style=\"color: rgb(31, 31, 31);\">Remove sleeve. Pierce film in several places. Place the meal tray in Microwave (700-800W) and heat it for 6-7 minutes. Add 1-2 tsp of water, stir it and further heat it for 2 minutes. Ensure that the meal is piping hot before serving.</span></p>",
//                       "List_of_Allergens": "<p>None</p>",
//                       "Cuisines_id": "6620fdfea5e862e9eff322ee",
//                       "Dietary_id": [
//                           "662100d685c40f67b662e720"
//                       ],
//                       "spice_level_id": "6621018d85c40f67b662e72e",
//                       "chef_id": "6646e0099d23de49def8a049",
//                       "Nutrition_id": [
//                           "664ae34db9d2a1b40506f7ca",
//                           "664ae33cb9d2a1b40506f7c7",
//                           "664ae327b9d2a1b40506f7c4",
//                           "664ae306b9d2a1b40506f7be"
//                       ],
//                       "nutritional_information": "<p><strong>Per Portion (400g)</strong></p><p>Calories: 332kcal</p><p>Fat: 10g</p><p>Carbs: 45g</p><p>Sugar: 4.9g</p><p>Protein: 10g</p><p>Salt: 0.46g</p>",
//                       "ProfileImage": [
//                           "https://authimages.s3.eu-west-2.amazonaws.com/profile-images/Sweet%20Potato%20%26%20Butter%20Bean%20Curry-1718237052290-0"
//                       ],
//                       "qrCode": "data:image/png;base64,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",
//                       "createdAt": "2024-06-13T00:04:12.374Z",
//                       "updatedAt": "2024-06-14T20:25:07.969Z",
//                       "__v": 0,
//                       "Dishtype_id": "6621002685c40f67b662e70e",
//                       "SKU_Number": "SweetPotato&ButterBeanCurrywithRice123"
//                   },
//                   "quantity": 2,
//                   "price": 7.4,
//                   "ProfileImage": [
//                       "https://authimages.s3.eu-west-2.amazonaws.com/profile-images/Sweet%20Potato%20%26%20Butter%20Bean%20Curry-1718237052290-0"
//                   ],
//                   "name": "Sweet Potato & Butter Bean Curry with Rice",
//                   "_id": "666c8cfb6fba916d0baabb33",
//                   "OrderId": "666c8cfb6fba916d0baabb30"
//               }
//           ],
//           "user": "666c44dcdae2562f772a4e27",
//           "status": "pending",
//           "deliveryInfo": [
//               {
//                   "phone": "917000549126",
//                   "houseNo": "567",
//                   "buildingName": " 35",
//                   "streetName": " Bhawarkua",
//                   "City": " Indore ",
//                   "country": " India",
//                   "FirstName": "Shubham",
//                   "LastName": "Raikwar",
//                   "Postcode": "462022",
//                   "Type_of_Address": "Shipping Address",
//                   "_id": "666c8cfb6fba916d0baabb34"
//               }
//           ],
//           "billingInfo": null,
//           "deliveryDate": "2024-06-14T18:33:31.446Z",
//           "totalAmount": 36.19,
//           "discountApplied": 0,
//           "totalAmountBeforeDiscount": 30.2,
//           "discountPercentage": 0,
//           "payment": {
//               "_id": "666c8cfb6fba916d0baabb36",
//               "order": "666c8cfb6fba916d0baabb30",
//               "paymentMethod": [
//                   "card"
//               ],
//               "status": "completed",
//               "amount": 36.19,
//               "transactionId": "pi_3PRewDIgkJfAedR12gq1eExE",
//               "paymentDate": "2024-06-14T18:33:31.583Z",
//               "createdAt": "2024-06-14T18:33:31.583Z",
//               "__v": 0
//           },
//           "orderDate": "2024-06-14T18:33:31.444Z"
//       }
//   ]
// }