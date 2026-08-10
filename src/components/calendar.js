import React, { useContext, useState } from "react";
import { TaskContext } from "../context/taskContext";
import "./style.css";
function Calendar() {
  const { tasks } = useContext(TaskContext);
  const upcomingTasks = [...tasks]
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.toLocaleString("default", {
    month: "long",
  });
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();
  const hasTaskOnDate = (day) => {
    return tasks.some((task) => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === year
      );
    });
  };
  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div>
          <h1 id="calendar-heading">Calendar</h1>
          <p id="calendar-description">
            Manage your schedule, deadlines and upcoming Events.
          </p>
        </div>
        <button id="new-event-btn">+ Add Event</button>
      </div>
      <div className="calendar-container">
        <div className="calendar-top">
          <button
            className="month-btn"
            onClick={() =>
              setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1))
            }
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <h2>
            {month} {year}
          </h2>
          <button
            className="month-btn"
            onClick={() =>
              setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1))
            }
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div className="calendar-day-header" key={day}>
              {day}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, index) => (
            <div className="calendar-cell empty" key={`empty-${index}`}></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => (
            <div
              className={`calendar-cell ${
                hasTaskOnDate(index + 1) ? "task-date" : ""
              }`}
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="events-container">
        <div className="events-header">
          <h2>Upcoming Tasks</h2>
          <p>View All</p>
        </div>
        {upcomingTasks.map((task) => (
          <div className="event-card" key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.dueDate}</p>
            </div>
            <span className="event-tag">{task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Calendar;
