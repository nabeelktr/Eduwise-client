"use client";
import React from "react";
import SidebarControl from "./SidebarControl";
import { SidebarItem } from "./SidebarItems";
import { HiOutlineWrench } from "react-icons/hi2";
import { FileVideo2, MonitorPlay } from "lucide-react";
import { CloudArrowDownIcon, ComputerDesktopIcon, DocumentPlusIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";


type Props = {
  active: number;
};

const Sidebar: React.FC<Props> = ({ active }) => {
  return (
    <>
      <SidebarControl>
        <SidebarItem
          icon={<DocumentPlusIcon className="w-6" />}
          text={"Create Course"}
          routerPath="/instructor/create-course"
          active={active === 0 ? true : false}
        />
        <SidebarItem
          icon={<ComputerDesktopIcon className="w-6" />}
          text={"All Courses"}
          routerPath="/instructor/courses"
          active={active === 1 ? true : false}
        />
        <SidebarItem
          icon={<WrenchScrewdriverIcon className="w-6" />}
          text={"Edit Course"}
          routerPath="/instructor/courses"
          active={active === 2 ? true : false}
        />
        <SidebarItem
          icon={<CloudArrowDownIcon className="w-7" />}
          text={"Upload Media"}
          routerPath="/instructor/upload-media"
          active={active === 3 ? true : false}
        />
      </SidebarControl>
    </>
  );
};

export default Sidebar;
