import React, { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useLogOutMutation } from "../../../redux/features/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import { ProfileSidebar } from "../../constants/enums";
import EnrolledCourses from "./EnrolledCourses";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(ProfileSidebar.profileInfo);
  const [logoutUser, { isLoading }] = useLogOutMutation();
  const { data: session } = useSession();

  const logoutHandler = async () => {
    session && (await signOut());
    await logoutUser({ succes: true });
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
    <div className=" mx-auto flex bg-gray-50 pt-24 800px:px-[12%]">
      <div
        className={`sticky mb-[80px] mt-[80px] h-[450px] w-[60px] rounded-[5px] border bg-gray-50 bg-opacity-90 shadow-sm 800px:w-[310px] ${
          scroll ? "top-[120px]" : "top-[30px]"
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
        <div className="mt-[80px] h-full w-full bg-transparent  px-8">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === ProfileSidebar.changePassword && (
        <div className="mt-[80px] h-full w-full bg-transparent px-8">
          <ChangePassword />
        </div>
      )}
      {active === ProfileSidebar.enrolledCourses && (
        <div className="mt-[80px] h-full w-full bg-transparent px-8">
          <EnrolledCourses />
        </div>
      )}
    </div>
  );
};

export default Profile;
