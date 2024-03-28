import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {};

const Carousell = (props: Props) => {
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
  const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const { carouselState: { currentSlide } } = rest;

    return (
      <div className="carousel-button-group -ml-28 800px:-ml-40 -mt-14 gap-3">
        <button className="carousel-button" onClick={previous}>
            <ArrowLeftCircleIcon className="800px:h-12 h-8 800px:w-12"/>
        </button>
        <button className="carousel-button" onClick={next}>
            <ArrowRightCircleIcon className="800px:h-12 h-8 w-12 "/>
        </button>
      </div>
    );
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
        customButtonGroup={ <CustomButtonGroup />}

      >
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col mt-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-64 max-h-72 800px:min-h-72 cursor-pointer"
          >
            <div className="relative h-40 mx-2 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                alt="card-image"
                className="transition-transform transform hover:scale-105"

              />
            </div>
            <div className="p-4">
              <h5 className="block mb-1 font-sans text-xs 800px:text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                UI/UX Review Check {index}
              </h5>
              <p className="block font-sans text-xs antialiased font-light leading-relaxed text-inherit">
                The place is close to Barceloneta Beach and bus stop just 2 min
                by walk
              </p>
            </div>
           
          </div>
        ))}
      </Carousel>
    </div>
  );
};

  
  
export default Carousell;
