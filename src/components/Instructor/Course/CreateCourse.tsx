"use client";
import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";

type Props = {};

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState();

  const handleSubmit = async() => {
    
  }
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%] ">
        <h5 className="mt-12 text-xl uppercase font-bold tracking-wide">
          Create Course
        </h5>
        {active === 0 && (
          <CourseInformation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisities={prerequisites}
            setPrerequisities={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 800px:mr-0 -mr-10">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
