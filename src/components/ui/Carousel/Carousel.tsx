"use client";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetTrendingCoursesMutation } from "../../../../redux/features/courses/coursesApi";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const Carousell = (props: Props) => {
  const router = useRouter()
  const [courses, { isLoading, error } ]= useGetTrendingCoursesMutation();
  const [trendingCourses, setTrendingCourses] = useState<any>([])

  const fetchData = async () => {
    const data:any = await courses(null)
    setTrendingCourses(data.data)
  } 
  useEffect(() => {
    fetchData()
  },[])
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButtonGroup />}
      >
        {trendingCourses && trendingCourses.map((course: any , index: number) => (
          <div
            key={index}
            className="relative flex flex-col mt-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-64 max-h-72 800px:min-h-72 cursor-pointer"
            onClick={() => router.push(`course/${course._id}`)}
          >
            <div className="relative min-h-40 mx-2 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img
                src={course.thumbnail}
                alt="card-image"
                className="transition-transform transform hover:scale-105 min-h-40"
              />
            </div>
            <div className="p-4">
              <h5 className="block mb-1 text-xs 800px:text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {course.name}
              </h5>
              <p className="block text-xs antialiased font-light leading-relaxed text-inherit overflow-hidden line-clamp-3 ">
                {course.description.length > 100 ? course.description.substring(0,100) + '...' : course.description}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group -ml-28 800px:-ml-40 -mt-14 gap-3">
      <button className="carousel-button" onClick={previous}>
        <ArrowLeftCircleIcon className="800px:h-12 h-8 800px:w-12" />
      </button>
      <button className="carousel-button" onClick={next}>
        <ArrowRightCircleIcon className="800px:h-12 h-8 w-12 " />
      </button>
    </div>
  );
};

export default Carousell;
