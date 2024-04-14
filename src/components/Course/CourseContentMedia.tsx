import { styles } from "../../styles/style";
import VideoPlayer from "../../utils/VideoPlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { toast } from "sonner";
import {
  coursesApi,
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewMutation,
  useGetCourseDetailsQuery,
} from "../../../redux/features/courses/coursesApi";
import { formatDate } from "../../utils/formatDate";
import { MdMessage, MdVerifiedUser } from "react-icons/md";
import Ratings from "../../utils/Ratings";
import socketIO from "socket.io-client";
const EndPoint = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(EndPoint, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [addQuestion, { isSuccess, error, isLoading: addQuestionLoading }] =
    useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: addAnswerLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const [
    addReview,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewMutation();
  const {data:courseData, refetch: courseRefetch} = useGetCourseDetailsQuery(id, {refetchOnMountOrArgChange: true})
  const course = courseData;
  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user.id
  );

  const handleQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      const questionList = {
        user: {
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          instructorId: course.instructorId,
          courseName: course.name
        },
        question,
        questionReplies: [],
      };

      addQuestion({
        questionList,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    const answerList = {
      user: {
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
      answer,
      createdAt: Date.now(),
    };
    addAnswerInQuestion({
      answerList,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      const reviewList = {
        user: {
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        },
        rating,
        comment: review,
        commentReplies: []
      };
      addReview({ reviewList, courseId: id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification", {
        title: "New Question",
        instructorId: course.instructorId,
      })
    }

    if (answerSuccess) {
      refetch();
      toast.success("Answer added successfully");
      setAnswer("");
    }

    if (reviewSuccess) {
      courseRefetch();
      toast.success("Review added successfully");
      setReview("");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        console.log(errorMessage);
        // toast.error(errorMessage.message);
      }
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        console.log(errorMessage);

        // toast.error(errorMessage.data.message);
      }
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        console.log(errorMessage);

        // toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerSuccess,
    reviewSuccess,
    reviewError,
  ]);

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
                className={`${
                  styles.button
                } !w-[100px] !h-[30px] items-center !text-xs text-white font-thin mt-3
                ${addQuestionLoading && "cursor-not-allowed"}
                `}
                onClick={addQuestionLoading ? () => {} : handleQuestion}
              >
                Submit
              </div>
            </div>
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b] "></div>
            <div>
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setQuestionId={setQuestionId}
                addAnswerLoading={addAnswerLoading}
              />
            </div>
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
                      className={`${
                        styles.button
                      } !w-[100px] !h-[30px] items-center !text-xs text-white font-thin mt-1 ${
                        reviewCreationLoading && "cursor-no-drop"
                      }`}
                      onClick={
                        reviewCreationLoading ? () => {} : handleReviewSubmit
                      }
                    >
                      Submit
                    </div>
                  </div>
                </>
              )}
            </>
            <br />
        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
        <div className="w-full">
          {(course?.reviews && [...course.reviews].reverse()).map(
            (item: any, index: number) => (
              <div className="w-full flex  my-5  " key={index}>
              <Image
                src={
                  item?.user?.avatar ? item.user.avatar : "/assets/user.png"
                }
                alt="usericon"
                width={30}
                height={30}
                className="rounded-full ml-5 w-[30px] h-[30px]"
              />
              <div className="pl-3 ">
                <div className="flex gap-1">
                  <h5 className="text-xs font-sans ">{item?.user.name}</h5>{" "}
                  <small className="text-xs text-gray-600">
                    {item.createdAt && formatDate(item?.createdAt)}
                  </small>
                </div>
                <Ratings rating={item.rating} />
                <p className="text-sm">{item?.comment}</p>
              </div>
            </div>
            )
          )}
        </div>
          </div>
          
        )}
       
      </div>
    </div>
  );
};

const VideoPlayerMemo = React.memo(VideoPlayer, (prevProps, nextProps) => {
  return prevProps.videoUrl === nextProps.videoUrl;
});

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  addAnswerLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo]?.questions?.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            addAnswerLoading={addAnswerLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  setQuestionId,
  item,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
  addAnswerLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={item.user?.avatar ? item.user.avatar : "/assets/user.png"}
            alt="usericon"
            width={30}
            height={30}
            className="rounded-full ml-5 w-[30px] h-[30px]"
          />

          <div className="pl-3 ">
            <div className="flex gap-1">
              <h5 className="text-xs font-sans ">{item?.user.name}</h5>
              <small className="text-xs text-gray-600">
                {item.createdAt && formatDate(item?.createdAt)}
              </small>
            </div>
            <p className="text-sm">{item?.question}</p>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="800px:pl-16 cursor-pointer  mr-2 text-xs text-gray-700"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item?.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <MdMessage className="cursor-pointer text-gray-700 " />
          <span className="pl-1 cursor-pointer text-xs  text-gray-700">
            {item?.questionReplies?.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item?.questionReplies.map((item: any, index: number) => (
              <div className="w-full flex 800px:ml-16 my-5  " key={index}>
                <Image
                  src={
                    item?.user?.avatar ? item.user.avatar : "/assets/user.png"
                  }
                  alt="usericon"
                  width={30}
                  height={30}
                  className="rounded-full ml-5 w-[30px] h-[30px]"
                />
                <div className="pl-3 ">
                  <div className="flex gap-1">
                    <h5 className="text-xs font-sans ">{item?.user.name}</h5>{" "}
                    {item.user.role === "instructor" && (
                      <MdVerifiedUser className="text-[#369eff]" />
                    )}
                    <small className="text-xs text-gray-600">
                      {item.createdAt && formatDate(item?.createdAt)}
                    </small>
                  </div>
                  <p className="text-sm">{item?.answer}</p>
                </div>
              </div>
            ))}
            <>
              <div className="w-full px-2 flex relative text-sm mt-2 ">
                <input
                  type="text"
                  placeholder="Enter your answer.."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`placeholder:text-gray-600 block 800px:ml-12 outline-none bg-transparent border-b border-gray-700 p-[5px] w-[95%] ${
                    answer === "" || (addAnswerLoading && "cursor-no-drop")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-4 bottom-1 text-xs !font-thin uppercase"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || addAnswerLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
