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
