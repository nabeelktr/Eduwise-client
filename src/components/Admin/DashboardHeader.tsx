"use client";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  useGetAllNotificationQuery,
  useUpdateNotificationMutation,
} from "../../../redux/features/notification/notificationApi";
import { formatDate } from "../../utils/formatDate";
import { socketId } from "@/utils/socket";
import { toast } from "sonner";

type Props = {
  instructorId?: string;
};

const DashboardHeader = ({ instructorId }: Props) => {
  const { data, refetch } = useGetAllNotificationQuery(instructorId, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const [audio] = useState(
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-image-store-1d566.appspot.com/o/notification%2Fiphone_14_notification.mp3?alt=media&token=1493ecaa-d27b-4881-9220-cfc41588a45b"
    )
  );

  const playerNotificationSound = () => {
    audio.play();
  };

  const handleNotificationStatus = async (id: string) => {
    await updateNotificationStatus(id);
  };

  useEffect(() => {
    if (data) {
      setNotifications(data.filter((item: any) => item.status === "unread"));
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      if (data.instructorId === instructorId) {
        refetch();
        playerNotificationSound();
        toast.message(`${data.title} recieved`, {
          position: "bottom-right",
        });
      }
    });
  }, []);
  return (
    <div className="w-full flex items-center justify-end p-5 fixed top-0 right-0 bg-white shadow-sm">
      <div
        className="relative cursor-pointer mr-8 "
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-xs flex items-center justify-center text-white">
          {notifications?.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[9999] rounded">
          <h5 className="text-center text-lg font-Poppins text-black dark:text-white mb-2">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-[#00000013] dark:bg-[#2d3a4ea1] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] px-2 py-1"
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white text-xs">
                    {item.title}
                  </p>
                  <p
                    className="text-black dark:text-white cursor-pointer text-xs"
                    onClick={() => handleNotificationStatus(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white text-xs">
                  {item.message}
                </p>
                <p className="p-2 text-gray-600 dark:text-white text-xs">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
