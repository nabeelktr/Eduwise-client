import { styles } from "@/styles/style";
import VideoPlayer from "@/utils/VideoPlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { toast } from "sonner";
import { useAddNewQuestionMutation } from "../../../redux/features/courses/coursesApi";
import { formatDate } from "@/utils/formatDate";
import { MdMessage } from "react-icons/md";

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
  const [answerId, setAnswerId] = useState("");
  const [addQuestion, { isSuccess, error, isLoading: addQuestionLoading }] =
    useAddNewQuestionMutation();

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      const questionList = {
        user: {
          name: user.name,
          avatar: user.avatar,
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
    console.log("ff");
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);
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
                setAnswerId={setAnswerId}
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

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setAnswerId,
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
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  key,
  data,
  activeVideo,
  item,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
}: any) => {
    const [replyActive, setReplyActive] = useState(false)
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

          {/* <div className="w-[50px] h-[50px]">
            <div className="w-[50px] h-[50px] bg-gray-600 rounded-[50px] flex items-center justify-center cursor-pointer">
              <h1 className="uppercase text-sm">
                {item?.user?.name.slice(0, 2)}
              </h1>
            </div>
          </div> */}

          <div className="pl-3 ">
            <div className="flex gap-1">
              <h5 className="text-xs font-sans ">
                {item?.user.name}
              </h5>
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
            onClick={() => setReplyActive(!replyActive)}
          >
            {!replyActive ? item?.questionReplies.length !== 0 ?  "All Replies" : "Add Reply" : "Hide Replies"}
          </span>
          <MdMessage className="cursor-pointer text-gray-700 " />
          <span className="pl-1 cursor-pointer text-xs  text-gray-700">{item?.questionReplies?.length}</span>
        </div>
      </div>
    </>
  );
};

export default CourseContentMedia;
