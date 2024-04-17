import React from "react";
import { useGetCourseAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "@/components/ui/Loader/Loader";
import { styles } from "@/styles/style";
import {Bar, BarChart, Label, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"

type Props = {
  isDashboard?: boolean;
};

const CourseAnalytics = ({isDashboard}: Props) => {
  const { data:analyticsData, isLoading } = useGetCourseAnalyticsQuery("admin",{});
  const minValue = 0;


  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"}`}>
        <div className={`${isDashboard && "!ml-8 mb-5"}`}>
          <h1 className={`${styles.title} ${isDashboard && "text-sm  px-5 !text-start "}`}>
                    Course Analytics
                </h1>
                {/* <p className={`${styles.label} px-5`}>
                    Last 12 month analytics data
                </p> */}
            </div>
          {/* <div className="w-full h-[90%] flex items-center justify-center"> */}
          <div className={`w-full ${isDashboard ? "h-[30vh] " : "h-screen"}  flex items-center justify-center`}>

            <ResponsiveContainer height={!isDashboard ? "50%" : "100%"} width={isDashboard ? "100%": "90%"} >
                <BarChart width={150} height={300} data={analyticsData}>
                    <XAxis dataKey={"month"}>
                        <Label offset={0} position={"insideBottom"} />
                    </XAxis>
                    <YAxis domain={[minValue, "auto"]} />
                    <Bar dataKey="count" fill="#3faf82">
                        <LabelList dataKey={"count"} position={"top"} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
