import React from "react";
import UserAnalytics from "../analytics/UserAnalytics";
import { ScaleIcon, UsersIcon } from "@heroicons/react/24/outline";
import OrderAnalytics from "../analytics/OrderAnalytics";
import CourseAnalytics from "../analytics/CourseAnalytics";

type Props = {
  open: boolean;
};

const DashboardWidgets = (props: Props) => {
  return (
    <div>
      <div className="grid-cols-2 flex justify-between">
        <div className="w-[70%]">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="justify-center items-center flex ">
          <div className="z-[99]">
            <div className="bg-white relative flex-col flex border border-t-[#4d62d9] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm ">
              <span className="font-bold text-2xl tracking-widest pb-2">3</span>
              <span className="font-semibold text-sm text-gray-500">Users</span>
              <UsersIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
            </div>
            <div className="bg-white relative flex-col flex border border-t-[#4d62d9] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
              <span className="font-bold text-2xl tracking-widest pb-2">6</span>
              <span className="font-semibold text-sm text-gray-500">
                Sales Obtained
              </span>
              <ScaleIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="grid-cols-2 flex justify-between">
        <div className="w-[48%]">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="w-[48%]">
          <CourseAnalytics isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
