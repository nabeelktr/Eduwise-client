"use client";
import { styles } from "../../styles/style";
import Ratings from "../../utils/Ratings";
import VideoPlayer from "../../utils/VideoPlayer";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { format } from "path";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseContentList from "../../components/Course/CourseContentList";
import {Elements} from '@stripe/react-stripe-js'
import CheckOutForm from '../payment/CheckOutForm'

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails: React.FC<Props> = ({ data, stripePromise, clientSecret}) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const discountPercentage = (
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) *
    100
  ).toFixed(0);
  const isPurchased =
  user && user?.courses?.find((item: any) => item._id === data._id);
  


  const handleOrder = (e: any) => {
    setOpen(true);
  };
  return (
    <div className="bg-gray-50">
      <div className="px-[12%] m-auto py-8">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[24px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center gap-2 pt-1 text-sm mb-1">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-black dark:text-white">
                  {data?.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data?.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-xl font-Poppins font-[500] text-black dark:text-white pb-2">
              What will you learn from this course?
            </h1>
            {data?.benefits?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-1" key={index}>
                <div className="w-[15px] mr-1">
                  <CheckIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <p className="pl-2 text-black dark:text-white text-sm">
                  {item.title}
                </p>
              </div>
            ))}
            <br />
            <h1 className="text-[25px] font-Poppins font-[500] text-black dark:text-white text-xl pb-2">
              What are the prerequisites for starting this course?
            </h1>
            {data?.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-1" key={index}>
                <div className="w-[15px] mr-1">
                  <CheckIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <p className="pl-2 text-black dark:text-white text-sm">
                  {item.title}
                </p>
              </div>
            ))}
            <br />

            <h1 className="text-xl font-Poppins font-[500] text-black dark:text-white">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseContentData} isDemo={true} />
            <br />
            <div className=" text-sm 800px:w-[80%]">
              <h1 className="text-xl font-Poppins font-[500] pb-2">
                Course Details
              </h1>
              {data?.description}
            </div>
            <br />

            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-md font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating : {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-gray-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[10px] text-black dark:text-white">
                            {item.user.name.slice(0, 2)}
                          </h1>
                        </div>
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <VideoPlayer
                videoUrl={data?.demoUrl}
                subtitleUrl={data?.subtitleUrl}
              />
              <div className="flex items-center">
                <h1 className="pt-5 text-[21px] font-bold">
                  {data?.price === 0 ? "Free" : <>&#x20b9; {data?.price}</>}
                </h1>
                <h5 className="pl-2 text-[16px] pt-6 line-through opacity-80 text-gray-700">
                  &#x20b9; {data?.estimatedPrice}
                </h5>
                <h4 className="pl-2 pt-5 text-[20px] font-semibold">
                  <span className="text-green-500">{discountPercentage}% </span>
                  off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button}`}
                    href={`/course-access/${data?._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} 800px:!text-sm !text-xs text-white font-thin !w-[30%] mt-2 mb-4 !py-2`}
                    onClick={handleOrder}
                  >
                    Buy Now
                  </div>
                )}
              </div>
              <p className="pb-1 text-sm">* Source code included</p>
              <p className="pb-1 text-sm ">* Full life time access</p>
              <p className="pb-1 text-sm">* Certificates of Completion</p>
              <p className="pb-3 800px:pb-6 text-sm">* Premium Support</p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[400px] min-h-[400px] bg-white rounded-md shadow p-3">
              <div className="w-full flex justify-end">
                <XMarkIcon
                  className="h-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full px-2">
                {
                  stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{clientSecret}} >
                      <CheckOutForm  setOpen={setOpen} data={data} />
                    </Elements>
                  )
                }
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
