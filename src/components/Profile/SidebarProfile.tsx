import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/user.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import { HiAcademicCap } from "react-icons/hi";

type Props = {
  user: any;
  avatar: string | null;
  active: number;
  logoutHandler: any;
  setActive: (active: number) => void;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  logoutHandler,
  setActive,
}) => {
  return (
    <div className="w-full">
      <div
        className={`flex h-16 w-full cursor-pointer items-center border-b px-3 py-4 shadow-md hover:bg-blue-gray-50  ${
          active === 1 ? " bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user?.avatar || avatar ? user.avatar || avatar : avatarDefault}
          alt=""
          width={30}
          height={30}
          className="800px:w-30px h-[30px] w-[30px] cursor-pointer rounded-full"
        />
        <h5 className="hidden pl-6 font-Poppins text-sm  font-thin text-black 800px:block">
          My Account
        </h5>
      </div>

      <div
        className={`flex h-16 w-full cursor-pointer items-center border-b px-4 py-4 hover:bg-blue-gray-50  ${
          active === 2 ? " border-b bg-gray-200 shadow-sm " : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className=" text-black" />
        <h5 className="hidden pl-6 font-Poppins text-sm  font-thin text-black 800px:block">
          Change Password
        </h5>
      </div>
      {user.role === "user" && (
        <div
          className={`flex h-16 w-full cursor-pointer items-center border-b px-4 py-4 hover:bg-blue-gray-50 ${
            active === 3
              ? "border-b bg-gray-200 shadow-sm dark:bg-gray-600 "
              : "bg-transparent"
          }`}
          onClick={() => setActive(3)}
        >
          <SiCoursera size={20} className=" text-black" />
          <h5 className="hidden pl-6 font-Poppins text-sm  font-thin text-black 800px:block">
            Enrolled Courses
          </h5>
        </div>
      )}

      {user.role === "admin" && (
        <Link
          className={`flex h-16 w-full cursor-pointer items-center border-b bg-transparent px-4 py-4 hover:bg-blue-gray-50`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings size={20} className=" text-black" />
          <h5 className="hidden pl-6 font-Poppins text-sm font-thin text-black 800px:block">
            Admin Dashboard
          </h5>
        </Link>
      )}

      {user.role === "instructor" && (
        <Link
          className={`flex h-16 w-full cursor-pointer items-center border-b bg-transparent px-4 py-4 hover:bg-blue-gray-50`}
          href={"/instructor/create-course"}
        >
          <HiAcademicCap size={20} className="text-black " />
          <h5 className="hidden pl-6 font-Poppins text-sm  font-thin text-black 800px:block">
            Instructor Dashboard
          </h5>
        </Link>
      )}

      <div
        className={`hover:bg-blue-gray-5 flex h-16 w-full cursor-pointer items-center border-b bg-transparent px-4 py-4 hover:bg-blue-gray-50 `}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} className=" text-black" />
        <h5 className="hidden pl-6 font-Poppins text-sm  font-thin text-black 800px:block">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
