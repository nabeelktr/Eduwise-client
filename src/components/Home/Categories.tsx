import React from "react";
import Carousell from "../ui/Carousel/Carousel";

type Props = {};

const Categories = (props: Props) => {
  return (
    <div
      className=" w-full flex flex-col pb-12 800px:pb-36"
      style={{ backgroundImage: "url(/assets/category.png)" }}
    >
      <div className="items-center justify-center flex flex-col 800px:py-20 py-6 gap-2">
        <h1 className="text-lg 800px:text-4xl font-[1000] text-center">
          Expand Your Career
        </h1>
        <h1 className="text-lg 800px:text-4xl text-center">With Our Courses</h1>
      </div>
      <div className="pl-[25%] pr-[3%] ">
        <Carousell />
      </div>
    </div>
  );
};

export default Categories;
