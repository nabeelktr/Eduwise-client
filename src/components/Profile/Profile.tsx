import React, { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useLogOutMutation } from "../../../redux/features/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import { ProfileSidebar } from "@/constants/enums";
import EnrolledCourses from "./EnrolledCourses"

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(ProfileSidebar.profileInfo);
  const [logoutUser, {isLoading}] = useLogOutMutation();
  const { data: session} = useSession();

  const logoutHandler = async () => {
    session && await signOut();
    await logoutUser({succes: true})
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className=" flex mx-auto 800px:px-[12%]  ">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-gray-800  bg-gray-50 bg-opacity-90 border dark:border-gray-500 rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === ProfileSidebar.profileInfo && (
        <div className="w-full h-full bg-transparent px-8  mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === ProfileSidebar.changePassword && (
        <div className="w-full h-full bg-transparent mt-[80px] px-8">
          <ChangePassword />
        </div>
      )}
      {active === ProfileSidebar.enrolledCourses && (
        <div className="w-full h-full bg-transparent mt-[80px] px-8">
          <EnrolledCourses />
        </div>
      )}
    </div>
  );
};

export default Profile;
