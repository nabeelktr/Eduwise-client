import { styles } from "@/styles/style";
import VideoPlayer from "@/utils/VideoPlayer";
import Image from "next/image";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <VideoPlayerMemo
        subtitleUrl={data[activeVideo]?.subtitleUrl}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[35px] !py-[unset] text-white items-center font-thin !text-xs ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev
        </div>

        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[35px] !py-[unset] text-white items-center font-thin !text-xs ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-xl font-[600]">{data[activeVideo]?.title}</h1>
      <br />
      <div className="w-full p-2 px-4  flex items-center justify-between bg-gray-500 bg-opacity-20 backdrop-blur shadow-[bg-gray-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-sm cursor-pointer ${
              activeBar === index ? "text-red-500 font-[600]" : "text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <div className="px-4 bg-gray-100 py-4">
        {activeBar === 0 && (
          <p className="text-sm whitespace-pre-line mb-3">
            {data[activeVideo]?.description}
          </p>
        )}
        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div className="mb-5">
                <h2 className="800px:text-sm 800px:inline-block ">
                  {item.title && item.title + " : "}
                </h2>{" "}
                <a
                  className="inline-block text-[#4395c4] 800px:text-sm 800px:pl2"
                   href={item.url}
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}
        {activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image
                src={user?.avatar ? user.avatar : "/assets/user.png"}
                alt="usericon"
                width={30}
                height={30}
                className="rounded-full ml-5 w-[30px] h-[30px]"
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="write your questions.."
                className="outline-none bg-transparent ml-3 border !border-black 800px:w-full p-2 rounded w-[90%] 800px:text-sm font-Poppins"
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[100px] !h-[30px] items-center !text-xs text-white font-thin mt-3`}
                // onClick={isLoading ? null : handleCommentSubmit}
              >
                Submit
              </div>
            </div>
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b] "></div>
            <div>{/* question reply  */}</div>
          </>
        )}
        {activeBar === 3 && (
          <div className="w-full">
            <>
              {!isReviewExists && (
                <>
                  <div className="flex w-full">
                    <Image
                      src={user?.avatar ? user.avatar : "/assets/user.png"}
                      alt="usericon"
                      width={30}
                      height={30}
                      className="rounded-full ml-5 w-[30px] h-[30px]"
                    />
                    <div className="w-full">
                      <h5 className="pl-3 text-sm font-[500] ">
                        Give a Rating <span className="text-red-500">*</span>
                      </h5>
                      <div className="flex w-full ml-2 pb-3 ">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="write your comment.."
                        className="outline-none bg-transparent border !border-black 800px:w-full p-2 rounded w-[90%] 800px:text-sm font-Poppins"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      className={`${styles.button} !w-[100px] !h-[30px] items-center !text-xs text-white font-thin mt-1`}
                      // onClick={isLoading ? null : handleCommentSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoPlayerMemo = React.memo(VideoPlayer, (prevProps, nextProps) => {
    return prevProps.videoUrl === nextProps.videoUrl;
  });

export default CourseContentMedia;
