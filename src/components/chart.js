import React, { useState, useEffect } from "react";
import "./style.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
function Chart({ tasks }) {
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode"),
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  const data = [
    {
      status: "Completed",
      count: tasks.filter((task) => task.status === "Completed").length,
    },
    {
      status: "Pending",
      count: tasks.filter((task) => task.status === "Pending").length,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
  data={data}
  style={{
    background: darkMode ? "#1e293b" : "#ffffff",
    borderRadius: "12px",
  }}
>
        <CartesianGrid
          stroke={darkMode ? "#475569" : "#e5e7eb"}
          strokeDasharray="3 3"
        />
        <XAxis dataKey="status" stroke={darkMode ? "#f8fafc" : "#374151"} />
        <YAxis
          allowDecimals={false}
          stroke={darkMode ? "#f8fafc" : "#374151"}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
            border: "none",
            borderRadius: "10px",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        />
        <Bar dataKey="count" fill="#6366F1" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default Chart;
