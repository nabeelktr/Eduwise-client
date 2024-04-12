import React, { useState } from "react";
import { useGetCourseContentQuery } from "../../../redux/features/courses/coursesApi";
import Loader from "../../components/ui/Loader/Loader";
import Heading from "../../utils/Heading";
import CourseContentMedia from './CourseContentMedia'
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const { data: courseContent, isLoading, refetch } = useGetCourseContentQuery(id);
  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login")
    const data = courseContent?.courseContentData
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <Header 
        activeItem={1}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        />
        <div className=" w-full grid 800px:grid-cols-10">
          <Heading
            title={data[activeVideo]?.title}
            description="something"
            keywords={data[activeVideo]?.tags}
          />
          <div className="col-span-7 bg-gray-50">
            <CourseContentMedia
            data={data}
            id={id}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            user={ user}
            refetch={refetch}
            />
          </div>
          <div className="hidden 800px:block 800px:col-span-3 mt-3 bg-gray-50">
            <CourseContentList 
            setActiveVideo={setActiveVideo}
            data={data}
            activeVideo={activeVideo}
            />
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
