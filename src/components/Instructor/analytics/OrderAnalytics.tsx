import React from "react";
import { useGetOrdersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../../components/ui/Loader/Loader";
import { styles } from "../../../styles/style";
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
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery("admin", {});

  const analyticsData = data && [...data].reverse()

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
            <Link
            href={"/instructor/order-analytics"}
              className={`${styles.title} ${
                isDashboard && "text-sm  px-5 !text-start "
              }`}
            >
              Order Analytics
            </Link>
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
              className={"text-sm"}
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
                <XAxis dataKey={"month"} />
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
