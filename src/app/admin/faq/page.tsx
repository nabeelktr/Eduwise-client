"use client";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import DashboardHero from "../../../components/Admin/DashboardHero";
import Heading from "../../../utils/Heading";
import React from "react";
import AdminProtected from "../../../hooks/adminProtected";
import EditFAQ from "@/components/Admin/Customization/EditFAQ";

type Props = {};

const page = (props: Props) => {
  
  return (
    // <AdminProtected>
      <div className="min-h-screen bg-gray-200">
        <Heading
          title="Eduwise - Admin | FAQ"
          description="Platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux"
        />
        <div className="flex mx-auto z-[9999]">
          <div className="mx-auto pl-14 mt-20 w-[85%] ">
            <DashboardHero />

            <EditFAQ />

          </div>
          <Sidebar active={3} />
        </div>
        
      </div>
    // </AdminProtected>
  );
};

export default page;
