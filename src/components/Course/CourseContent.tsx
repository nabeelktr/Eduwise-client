import React, { useState } from "react";
import { useGetCourseContentQuery } from "../../../redux/features/courses/coursesApi";
import Loader from "../../components/ui/Loader/Loader";
import Heading from "../../utils/Heading";

type Props = {
  id: string;
};

const CourseContent = ({ id }: Props) => {
  const { data: courseContent, isLoading } = useGetCourseContentQuery(id);
  const [activeVideo, setActiveVideo] = useState(0);
    const data = courseContent.courseContentData
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" w-full grid 800px:grid-cols-10">
          <Heading
            title={data[activeVideo]?.title}
            description="something"
            keywords={data[activeVideo]?.tags}
          />
        </div>
      )}
    </>
  );
};

export default CourseContent;
