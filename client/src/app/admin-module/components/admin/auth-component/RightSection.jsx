import Image from "next/image";
import React from "react";

const RightSection = () => {
  return (
    <div className="">
      <Image src="/images/right.svg" alt="img" height={500} width={500} objectFit="cover" className="mx-auto" />
    </div>
  );
};

export default RightSection;
