import React from "react";
import { useGetOrdersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "@/components/ui/Loader/Loader";
import { styles } from "@/styles/style";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData = [
    {
      name: "Page A",
      count: 4000,
    },
    {
      name: "Page B",
      count: 3000,
    },
    {
      name: "Page C",
      count: 2000,
    },
    {
      name: "Page D",
      count: 2780,
    },
    {
      name: "Page E",
      count: 1890,
    },
    {
      name: "Page F",
      count: 2390,
    },
    {
      name: "Page G",
      count: 3490,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? "h-[30vh]" : "h-screen"}`}>
          <div
            className={`${
              isDashboard ? "mt-[50px] pl-[40px] mb-2" : "mt-[50px]"
            }`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "text-sm  px-5 !text-start "
              }`}
            >
              Order Analytics
            </h1>
            {/* <p className={`${styles.label} px-5`}>
                    Last 12 month analytics data
                </p> */}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%] " : "h-full"
            }  flex items-center justify-center`}
          >
            <ResponsiveContainer
              height={isDashboard ? "100%" : "50%"}
              width={isDashboard ? "100%" : "90%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type={"monotone"} dataKey={"count"} stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
