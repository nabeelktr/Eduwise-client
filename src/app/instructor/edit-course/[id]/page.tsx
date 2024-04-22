"use client";
import EditCourse from "../../../../components/Instructor/EditCourse/EditCourse";
import React from "react";
import Heading from "../../../../utils/Heading";
import Sidebar from "../../../../components/Instructor/Sidebar/Sidebar";

type Props = {};

const EditCoursePage = ({ params }: any) => {
  const id = params?.id;
  return (
    <div>
      {/* <InstructorProtected > */}
      <Heading
        title="Eduwise - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="z-[9999] mx-auto flex">
        <Sidebar active={2} />

        <div className="mx-auto mr-0 pl-20 800px:mr-16 800px:w-[85%] 800px:pl-5">
          <EditCourse id={id} />
        </div>
      </div>
      {/* </InstructorProtected> */}
    </div>
  );
};

export default EditCoursePage;
