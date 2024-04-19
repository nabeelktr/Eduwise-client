"use client";
import VideoPlayer from "@/utils/VideoPlayer";
import React from "react";
import UserStream from "../Stream/UserStream";

type Props = {
  streamId: string;
};

const RoomUser = ({ streamId }: Props) => {
  return (
    <main className=" h-(calc(100vh - 74px)) relative w-full bg-gray-900 text-white">
      <div className="relative flex gap-12">
        <section className="fixed z-50 h-full w-11/12 max-w-56 overflow-y-auto border-r border-gray-600 bg-gray-900">
          <div className="fixed flex w-56 items-center justify-around bg-gray-800 px-4 text-base">
            <p>Participants</p>
            <strong className="rounded bg-gray-800 px-4 py-2 text-sm font-semibold">
              27
            </strong>
          </div>

          <div className="pb-26 flex flex-col gap-4 pt-20">
            <div className="flex items-center gap-4 pl-4">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-sm">Sulammita</p>
            </div>

            <div className="flex items-center gap-4 pl-4">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-sm ">Dennis Ivy</p>
            </div>
          </div>
        </section>

        <section className=" bottom-0 left-1/2 flex !h-[54rem] !w-full max-w-[55%] -translate-x-1/2 transform items-center justify-center border-l border-gray-700 bg-gray-900 px-4 py-2 text-white sm:relative sm:h-auto sm:w-full sm:border-l-0 sm:border-t sm:border-gray-700 ">
          {/* <div className="flex justify-center gap-4 py-4 sm:py-0 ">
            <button className="cursor-pointer bg-gray-800 text-white rounded-md px-3 py-2 flex items-center justify-center transition duration-300 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring focus:ring-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="#ffff"
              >
                <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
              </svg>
            </button>
            <button className="cursor-pointer bg-purple-600 text-white rounded-md px-3 py-2 flex items-center justify-center transition duration-300 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="#ffff"
              >
                <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" />
              </svg>
            </button>
            <button className="cursor-pointer bg-gray-800 text-white rounded-md px-3 py-2 flex items-center justify-center transition duration-300 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="#ffff"
              >
                <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
              </svg>
            </button>
            <button className="cursor-pointer bg-gray-800 text-white rounded-md px-3 py-2 flex items-center justify-center transition duration-300 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="#ffff"
              >
                <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" />
              </svg>
            </button>
          </div> */}

          <div className="w-full">
            <UserStream callerid={streamId} />
          </div>
        </section>

        <section
          className="h-[calc(100vh - 80px)] absolute right-0 top-0 w-full max-w-xs overflow-y-auto border-l border-gray-700 bg-gray-900 text-sm"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="w-full   overflow-y-auto">
            <div className="m-4 flex gap-4">
              <div className="w-auto max-w-[900px] rounded-lg bg-gray-800 p-2 ">
                <strong className="mr-2 font-[600] text-green-500">
                  Sulamita
                </strong>
                <p className="m-0"> Great stream!</p>
              </div>
            </div>

            <div className="m-4 flex gap-4">
              <div className="w-auto max-w-[900px] rounded-lg bg-gray-800 p-2 ">
                <strong className="mr-2 font-[600] text-green-500">
                  Dennis Ivy
                </strong>
                <p className="m-0 text-xs"> abcd efg hijk</p>
              </div>
            </div>
          </div>

          <form className="fixed bottom-0 w-full bg-gray-900 p-4">
            <input
              type="text"
              name="message"
              placeholder="Send a message...."
              className="rounded-md border-none bg-gray-800 px-16 py-3 text-sm text-white "
            />
          </form>
        </section>
      </div>
    </main>
  );
};

export default RoomUser;
