import React from "react";
import { useGetUsersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../../components/ui/Loader/Loader";
import { styles } from "../../../styles/style";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery("admin", {});
  let analyticsData = data && [...data.data].reverse();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard && "!ml-8 mb-5"}`}>
            <Link
              href={"/instructor/user-analytics"}
              className={`${styles.title} ${
                isDashboard && "text-sm  px-5 !text-start "
              }`}
            >
              User Analytics
            </Link>
            {/* <p className={`${styles.label} px-5`}>
                    Last 12 month analytics data
                </p> */}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh] " : "h-screen"
            }  flex items-center justify-center`}
          >
            <ResponsiveContainer
              height={!isDashboard ? "50%" : "100%"}
              width={isDashboard ? "100%" : "90%"}
              className={"text-sm"}
            >
              <AreaChart
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                data={analyticsData}
              >
                <XAxis dataKey={"month"} />
                <YAxis />
                <Tooltip />
                <Area
                  type={"monotone"}
                  dataKey={"count"}
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
