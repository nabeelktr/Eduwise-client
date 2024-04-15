"use client";
import InstructorProtected from "../../../hooks/instructorProtected";
import CreateCourse from "../../../components/Instructor/CreateCourse/CreateCourse";
import React from "react";
import Heading from "../../../utils/Heading";
import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import DashboardHero from "@/components/Admin/DashboardHero";
import { useSelector } from "react-redux";

type Props = {};

const CreateCoursePage = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <InstructorProtected>
      <Heading
        title="Eduwise - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto 800px:w-[80%] 800px:px-[100px] pl-10 ml-10  mr-0 800px:mr-16">
          <div className="z-[99] mb-10">
            {user && <DashboardHero instructorId={user.id} />}
          </div>
          <CreateCourse />
        </div>
        <Sidebar active={0} />
      </div>
    </InstructorProtected>
  );
};

export default CreateCoursePage;
