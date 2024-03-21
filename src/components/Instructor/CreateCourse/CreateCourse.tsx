"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type Props = {};

interface CourseData {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  thumbnail: File;
  level: string;
  demoUrl: string;
  totalVideos: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  courseContentData: {
      videoUrl: string;
      title: string;
      description: string;
      videoSection: string;
      links: any[];
      suggestion: string;
  }[];
}


const CreateCourse = (props: Props) => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      setActive(1)
      setCourseInfo({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
        thumbnailFile: "",
      });
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error, isLoading]);

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
    thumbnailFile: "",
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
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefits) => ({
      title: benefits.title,
    }));
    const formattedprerequisites = prerequisites.map((prerequisites) => ({
      title: prerequisites.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnailFile,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedprerequisites,
      courseContentData: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data:any = courseData;
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("estimatedPrice", data.estimatedPrice);
    formData.append("tags", data.tags);
    formData.append("level", data.level);
    formData.append("demoUrl", data.demoUrl);
    formData.append("totalVideos", data.totalVideos);
    formData.append("benefits", JSON.stringify(data.benefits));
    formData.append("prerequisites", JSON.stringify(data.prerequisites));
    formData.append(
      "courseContentData",
      JSON.stringify(data.courseContentData)
    );
    formData.append("thumbnail", data.thumbnail);
    if (!isLoading) {
      await createCourse(formData);
    }
  };

  // if(isLoading){
  //   return (
  //     <div className="min-h-screen justify-center items-center">loading</div>
  //   )
  // }
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
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
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
