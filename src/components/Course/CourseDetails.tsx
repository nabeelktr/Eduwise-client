import Ratings from "@/utils/Ratings";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  data: any;
};

const CourseDetails: React.FC<Props> = ({ data }) => {
  const { user } = useSelector((state: any) => state.auth);
  const discountPercentage = (
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) *
    100
  ).toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    console.log("object");
  };
  return (
    <div>
      <div className="px-[12%] m-auto py-8">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center gap-3 pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              what will you learn from this course?
            </h1>
            {data.benefits?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <CheckIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              what are the prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <CheckIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
         
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course Overview
            </h1>
            {/*  Course content list */}
            <br />
          <div className=" text-sm 800px:w-[60%]">
          <h1 className="text-xl font-Poppins font-[600] pb-2">
            Course Details
          </h1>
          {data?.description}
        </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
