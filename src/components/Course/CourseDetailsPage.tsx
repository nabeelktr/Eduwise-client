import React, { useState } from "react";
import { useGetCourseDetailsQuery } from "../../../redux/features/courses/coursesApi";
import Loader from "../ui/Loader/Loader";
import Heading from "../../utils/Heading";
import Header from "../Header";
import CourseDetails from "../../components/Course/CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            description="Eduwise is a platform for students to learn and get help from teachers"
            keywords="Programming,MERN,Redux,Next,Microservice"
            title={data?.name + " - Eduwise"}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <CourseDetails data={data} />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
