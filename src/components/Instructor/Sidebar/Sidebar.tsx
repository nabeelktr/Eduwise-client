"use client";
import React from "react";
import SidebarControl from "./SidebarControl";
import { SidebarItem } from "./SidebarItems";
import { HiOutlineWrench } from "react-icons/hi2";
import { FileVideo2, MonitorPlay } from "lucide-react";


type Props = {
  active: number;
};

const Sidebar: React.FC<Props> = ({ active }) => {
  return (
    <>
      <SidebarControl>
        <SidebarItem
          icon={<FileVideo2 size={25} />}
          text={"Create Course"}
          routerPath="/instructor/create-course"
          active={active === 0 ? true : false}
        />
        <SidebarItem
          icon={<MonitorPlay size={25} />}
          text={"All Courses"}
          routerPath="/instructor/courses"
          active={active === 1 ? true : false}
        />
        <SidebarItem
          icon={<HiOutlineWrench size={25} />}
          text={"Edit Course"}
          routerPath="/instructor/courses"
          active={active === 2 ? true : false}
        />

      </SidebarControl>
    </>
  );
};

export default Sidebar;
