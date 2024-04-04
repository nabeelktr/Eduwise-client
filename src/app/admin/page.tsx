"use client"
import Sidebar from "@/components/Admin/Sidebar/Sidebar";
import Heading from "../../utils/Heading";
import React from "react";
import DashboardHero from "../../components/Admin/DashboardHero"

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-200">

      <Heading
        title="Eduwise - Admin"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <DashboardHero />
        </div>
        <Sidebar active={1} />
      </div>

    </div>
  )
};

export default page;
