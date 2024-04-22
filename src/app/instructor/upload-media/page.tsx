"use client";
import FileUpload from "../../../components/Instructor/Upload/FileUpload";
import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import Heading from "../../../utils/Heading";
import React, { useEffect, useState } from "react";
import BasicTable from "../../../utils/BasicTable";
import { Trash2 } from "lucide-react";
import { styles } from "../../../styles/style";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import CopyModal from "../../../components/Instructor/Upload/CopyModal";
import CustomDeleteModal from "../../../components/ui/CustomDeleteModal";

type Props = {};

const UploadMedia = (props: Props) => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    id: "",
    videoUrl: "",
    subtitleUrl: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [deleteModal, setDelteModal] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_TRANSCODER_URI}transcode/deleteData/${editData.id}`,
        {
          withCredentials: true,
        },
      );
      setDelteModal(false);
      fetchData();
    } catch (e: any) {
      console.log("error while deleting");
    }
  };

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
          {info.row.original.status !== "completed" &&
          info.row.original.status !== "Error occured" &&
          info.row.original.status !== "Uploaded" ? (
            <div className="relative inline-flex">
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              <div className="absolute h-3 w-3 animate-ping rounded-full bg-green-400"></div>
              <div className="absolute h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
            </div>
          ) : null}
          <span>{info.row.original.status}</span>
        </div>
      ),
    },
    {
      header: "createdAt",
      accessorKey: "createdAt",
      cell: (info: any) => (
        <>
          {info.row.original.createdAt
            ? new Date(info.row.original.createdAt).toLocaleDateString()
            : ""}
        </>
      ),
    },
    {
      header: "Delete",
      cell: (info: any) => (
        <div className="hover:text-black">
          <Trash2
            size={20}
            onClick={() => {
              setDelteModal(true);
              setEditData({ ...editData, id: info.row.original._id });
            }}
            className="cursor-pointer"
          />
        </div>
      ),
    },
    {
      header: "View",
      cell: (info: any) =>
        info.row.original.status === "Uploaded" && (
          <div className="hover:text-black">
            <EllipsisVerticalIcon
              onClick={() => {
                setOpen(true);
                setEditData({
                  ...editData,
                  videoUrl: info.row.original.videoUrl,
                  subtitleUrl: info.row.original.subtitleUrl,
                });
              }}
              className="w-7 cursor-pointer "
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
        },
      );
      setData(response.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* <InstructorProtected> */}
      <Heading
        title="Eduwise - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="z-[9999] mx-auto flex">
        <div className="mx-auto mt-20 w-[85%] pl-14">
          <div
            className={`relative flex flex-col gap-8 overflow-hidden bg-white p-8 shadow-md dark:bg-gray-800 sm:rounded-sm 800px:mx-28`}
          >
            <h5
              className={`${styles.title} flex flex-col gap-2 rounded-md border-gray-600 p-10 !pb-0 !text-[18px] font-semibold uppercase tracking-wider shadow-sm`}
            >
              Upload Media
            </h5>
            <FileUpload fetchData={fetchData} />
            <span className="!rounded-md border border-gray-500 pt-4 text-xs shadow-md">
              <BasicTable columns={columns} datas={data} type="" />
            </span>
          </div>
        </div>
        <Sidebar active={3} />
      </div>

      {open && (
        <CopyModal
          open={open}
          setOpen={setOpen}
          subtitleUrl={editData.subtitleUrl}
          videoUrl={editData.videoUrl}
        />
      )}
      {deleteModal && (
        <CustomDeleteModal
          setOpen={setDelteModal}
          open={deleteModal}
          handleFunction={handleDelete}
          text="Do you want to delete this data?"
        />
      )}
    </div>
  );
};

export default UploadMedia;
