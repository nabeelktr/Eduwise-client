"use client";
import Sidebar from "../../components/Instructor/Sidebar/Sidebar";
import CreateCourse from "../../components/Instructor/CreateCourse/CreateCourse";
import React, { useState } from "react";
import InstructorProtected from "../../hooks/instructorProtected";
import { useSelector } from "react-redux";

type Props = {};



const InstructorPage = (props: Props) => {

  const {user} = useSelector((state: any) => state.auth)
  const [active, setActive] = useState("Create Course");
  return (
    <InstructorProtected user={user}>
    <div className="flex mx-auto z-[9999]">
      <Sidebar active={active} setActive={setActive} />
      {active === "Create Course" && (
        <div className="mx-auto 800px:w-[85%] pl-20 800px:pl-5 mr-0 800px:mr-16 ">
          <CreateCourse />
        </div>
      )}
      {active === "All Courses" && (
        <div className="mx-auto 800px:w-[85%] pl-20 800px:pl-5 mr-0 800px:mr-16 ">
          <CreateCourse />
        </div>
      )}
    </div>
    </InstructorProtected>
  );
};

export default InstructorPage;
