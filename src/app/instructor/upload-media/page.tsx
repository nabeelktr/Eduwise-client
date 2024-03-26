"use client";
import FileUpload from "../../../components/Instructor/Upload/FileUpload";
import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import Heading from "../../../utils/Heading";
import React, { useEffect, useState } from "react";
import BasicTable from "@/utils/BasicTable";
import { Trash2 } from "lucide-react";
import { styles } from "@/styles/style";
import axios from "axios";

type Props = {};

const UploadMedia = (props: Props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      header: "Video Title",
      accessorKey: "fileName",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => (
        <div className="relative flex items-center gap-2">
        {info.row.original.status !== "completed" && info.row.original.status !== "Error occured" ? (
            <div className="relative inline-flex">
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        <div className="w-3 h-3 bg-green-400 rounded-full absolute   animate-ping"></div>
        <div className="w-3 h-3 bg-green-400 rounded-full absolute   animate-pulse"></div>
    </div>
        ) : null}
        <span>{info.row.original.status}</span>
      </div>
      )
    },
    {
      header: "createdAt",
      accessorKey: "createdAt",
    },

    {
      header: "Delete",
      cell: (info: any) => (
        <div >
          <Trash2
            size={20}
            onClick={() => {
              //   setOpen(true);
              //   setCourseId(info.row.original._id);
            }}
            className="cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_TRANSCODER_URI}transcode/getData`,
        {
          withCredentials: true,
        }
      );
      setData(response.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData()
  },[])
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* <InstructorProtected> */}
      <Heading
        title="Eduwise - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <div
            className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-sm overflow-hidden 800px:mx-28 p-8 flex flex-col gap-8`}
          >
            <h5
              className={`${styles.title} uppercase tracking-wider !pb-0 flex flex-col gap-2  border-gray-600 shadow-sm p-10 !text-[18px] rounded-md`}
            >
              Upload Media
            </h5>
            <FileUpload fetchData={fetchData} />
            <span className="text-xs border border-gray-500 pt-4 shadow-md !rounded-md">
              <BasicTable columns={columns} datas={data} type="" />
            </span>
          </div>
        </div>
        <Sidebar active={1} />
      </div>
    </div>
  );
};

export default UploadMedia;
