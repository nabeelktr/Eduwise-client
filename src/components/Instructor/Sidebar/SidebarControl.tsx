import React, { createContext, useState, ReactNode } from "react";
import { MoreVertical } from "lucide-react";
import { HiAcademicCap } from "react-icons/hi2";

interface SidebarContextProps {
  expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextProps>({
  expanded: true,
});

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={`h-screen bg-[#2d2f31] ${expanded ? "w-72" : "w-16"}`}>
      <nav className="h-full flex flex-col  border-r shadow-sm ">
        <div className="p-4 pb-2 flex justify-between items-center mb-4 mt-2 ">
          <div className="flex">
            <HiAcademicCap
              size={35}
              className={`text-[#fff] cursor-pointer rounded`}
              onClick={() => setExpanded(!expanded)}
            />
            <p
              className={`overflow-hidden transition-all font-Poppins text-xl text-white text-center justify-center flex align-middle ${
                !expanded && "hidden"
              }`}
            >
              <span className="font-semibold tracking-wide mt-1 text-2xl ml-3">
                Edu-Wise
              </span>
            </p>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-1">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};
