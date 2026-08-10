import React, { createContext, useState, useEffect } from "react";
export const TaskContext = createContext();
function TaskProvider({ children }) {
  const defaultTasks = [
    {
      id: 1,
      title: "Complete Dashboard",
      status: "Completed",
      priority: "High",
      dueDate: "2026-08-10",
    },
    {
      id: 2,
      title: "React Assignment",
      status: "Pending",
      priority: "Medium",
      dueDate: "2026-08-09",
    },
    {
      id: 3,
      title: "Meeting",
      status: "Pending",
      priority: "High",
      dueDate: "2026-08-07",
    },
    {
      id: 4,
      title: "Update Portfolio",
      status: "Completed",
      priority: "Low",
      dueDate: "2026-08-12",
    },
  ];
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
export default TaskProvider;
