import React, { useState } from "react";

const DishDetails = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <section>
        <div>
          <div className="flex 2xl:gap-[60px] xl:gap-[40px] gap-[20px] justify-between ">
            <div className="2xl:w-[459px] xl:w-[360px] w-[260px] ">
              {/* <Image src={popimg} className="rounded-[15px]" /> */}
            </div>
            <div className="2xl:w-[400px] xl:w-[359px] w-[300px]">
              <div>
                <h1 className="pop-head">Chicken kabab</h1>
                <p className="pop-chef">by Chef Radha</p>
              </div>
              <div className="flex justify-between pop-detail">
                <h3>Price: £8.50</h3>
                <h3>Weight: 400g</h3>
                <h3>Portion Size: Serves 1</h3>
              </div>
              <div className="flex flex-wrap 2xl:gap-[10px] xl:gap-[8px] gap-[6px]  2xl:my-[15px] xl:my-[12px] my-[8px]">
                <div className="pop">
                  {/* <Image
                      src={nonveg}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    /> */}
                  <h3>Non-Veg</h3>
                </div>
                <div className="pop">
                  {/* <Image
                      src={glutenfree}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    /> */}
                  <h3>Gulten Free</h3>
                </div>{" "}
                <div className="pop">
                  {/* <Image
                      src={organic}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    /> */}
                  <h3>Organic</h3>
                </div>{" "}
                <div className="pop">
                  {/* <Image
                      src={dairyfree}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    /> */}
                  <h3>Dairy Free</h3>
                </div>{" "}
                <div className="pop">
                  {/* <Image
                      src={spicemedium}
                      className="2xl:[18px] xl:w-[14px] w-[12px]"
                    /> */}
                  <h3>Medium</h3>
                </div>
              </div>
              <div className="flex justify-center 2xl:w-[103px] 2xl:h-[39px] xl:w-[60px] xl:h-[22px] lg:w-[50px] lg:h-[20px] border rounded-[5px] 2xl:mt-[25px] xl:mt-[20px] mt-[15px]">
                {" "}
                <button
                  className="   text-[#DB5353] rounded-l w-1/3"
                  onClick={() => {
                    handleDecrement();
                    // alert("Removed from cart");
                  }}
                >
                  -
                  {/* <Image
                      src={minus}
                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                    /> */}
                </button>
                <p className=" flex mx-auto items-center text-[10px] xl:text-[12px] 2xl:text-[18px]  2xl:leading-[28px] ">
                  {count}
                </p>
                <button
                  className="    text-[#DB5353] rounded-r w-1/3"
                  onClick={() => handleIncrement()}
                >
                  +
                  {/* <Image
                      src={plus}
                      className="2xl:w-[15px] 2xl:h-[15px] xl:w-[10px] xl:h-[10px] lg:w-[8px] lg:h-[8px] mx-auto "
                    /> */}
                </button>
              </div>
              <div>
                <button className="pop-btn">Add to basket</button>
              </div>
            </div>
          </div>
          <div className="2xl:my-[15px] xl:my-[10px] my-[8px]">
            <div className="">
              <p className="fourth_p text-[#555555]">Description</p>{" "}
              <p className="fourth_p 2xl:w-[890px] xl:w-[660px] w-[550px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
            <div className="flex justify-between">
              <div>
                <p className="fourth_p text-[#555555]">Ingredients</p>{" "}
                <p className="fourth_p ">Chicken, Egg, Tomato, etc</p>
              </div>
              <div className="2xl:w-[578px] xl:w-[430px] w-[360px]">
                <p className="fourth_p text-[#555555]">Heating instructions</p>{" "}
                <p className="fourth_p ">
                  As our food is hand-made by our chefs, these reheating
                  instructions are a guide. Check your food is piping hot
                  throughout before serving.
                </p>
              </div>
            </div>
          </div>
          <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
            <div className="flex justify-between">
              <div>
                <p className="fourth_p text-[#555555]">List of Allergens</p>{" "}
                <p className="fourth_p ">Dish contains i.e Celery,  Egg</p>
              </div>
              <div className="2xl:w-[578px] xl:w-[430px] w-[360px]">
                <p className="fourth_p text-[#555555]">
                  Best Cooked directly from FROZEN
                </p>{" "}
                <p className="fourth_p ">
                  OVEN: Preheat oven to 180°C (Gas Mark 5). Remove lid and any
                  outer packaging. Place on a baking tray at the top of oven for
                  20 minutes or until piping hot.
                </p>
              </div>
            </div>
          </div>
          <div className="2xl:my-[20px] xl:my-[12px] my-[10px]">
            <div className="flex justify-between">
              <div>
                <p className="fourth_p text-[#555555]">Storage</p>{" "}
                <p className="fourth_p 2xl:w-[270px] xl:w-[200px] w-[160px]">
                  Store immediately in freezer on delivery.
                </p>
                <p className="fourth_p ">Keep frozen at -18℃.</p>
                <p className="fourth_p 2xl:w-[270px] xl:w-[200px] w-[180px]">
                  Should this product defrost, keep refrigerated, heat and eat
                  within 48 hours.
                </p>
              </div>
              <div className="2xl:w-[578px] xl:w-[430px] w-[360px]">
                <p className="fourth_p ">
                  MICROWAVE: Remove lid and place loosely on the container.
                  Place on a microwaveable plate and heat on full power for 7-8
                  minutes. Halfway through heating, add 2 tablespoons of water
                  to rice and stir contents together. Re-cover and continue
                  heating. Heat until piping hot and stand for 1 minute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DishDetails;
