"use client";
import React from "react";
import SidebarControl from "./SidebarControl";
import { SidebarItem } from "./SidebarItems";
import { HiOutlineWrench } from "react-icons/hi2";
import { FileVideo2, MonitorPlay } from "lucide-react";


type Props = {
  active: string;
  setActive: (active: string) => void;
};

const Sidebar: React.FC<Props> = ({ active, setActive }) => {
  return (
    <>
      <SidebarControl>
        <SidebarItem
          icon={<FileVideo2 size={25} />}
          text={"Create Course"}
          setActive={setActive}
          active={active === "Create Course" ? true : false}
        />
        <SidebarItem
          icon={<MonitorPlay size={25} />}
          text={"All Courses"}
          setActive={setActive}
          active={active === "All Courses" ? true : false}
        />
        <SidebarItem
          icon={<HiOutlineWrench size={25} />}
          text={"Edit Course"}
          setActive={setActive}
          active={active === "Edit Course" ? true : false}
        />

      </SidebarControl>
    </>
  );
};

export default Sidebar;
