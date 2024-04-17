"use client"
import Sidebar from "@/components/Admin/Sidebar/Sidebar";
import Heading from "../../utils/Heading";
import React from "react";
import DashboardHero from "../../components/Admin/DashboardHero"
import AdminProtected from "../../hooks/adminProtected";
import DashboardWidgets from "@/components/Instructor/Widgets/DashboardWidgets";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <AdminProtected>
      <Heading
        title="Eduwise - Admin"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <DashboardHero />
          {/* dashboard */}
          <DashboardWidgets open={true} />
        </div>
        <Sidebar active={0} />
      </div>
      </AdminProtected>
    </div>
  )
};

export default page;
