import React from "react";
import "./style.css";
function TaskList({ tasks }) {
  console.log(tasks);
  return (
    <>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No Tasks Available</h3>
          <p>Create your first task to get started.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.status === "Completed"}
                readOnly
              />
              <div className="task-details">
                <h4>{task.title}</h4>
                <p
                  className={`priority ${
                    task.priority === "High"
                      ? "high-priority"
                      : task.priority === "Medium"
                        ? "medium-priority"
                        : "low-priority"
                  }`}
                >
                  {task.priority} Priority
                </p>
              </div>
            </div>
            <span
              className={`status ${
                task.status === "Completed"
                  ? "completed"
                  : task.status === "Pending"
                    ? "pending"
                    : "overdue"
              }`}
            >
              {task.status}
            </span>
          </div>
        ))
      )}
    </>
  );
}
export default TaskList;
