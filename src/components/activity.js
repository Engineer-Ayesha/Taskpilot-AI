import React from "react";
import "./style.css";
function Activity() {
  return (
    <div className="activity-component">
      <div className="activity-item">
        <div className="activity-left">
          <i className="fa-solid fa-circle-check"></i>
          <div className="activity-details">
            <h4>Dashboard UI Completed</h4>
            <p>Today • 10:30 AM</p>
          </div>
        </div>
      </div>
      <div className="activity-item">
        <div className="activity-left">
          <i className="fa-solid fa-plus"></i>
          <div className="activity-details">
            <h4>New Task Added</h4>
            <p>Today • 9:15 AM</p>
          </div>
        </div>
      </div>
      <div className="activity-item">
        <div className="activity-left">
          <i className="fa-solid fa-pen"></i>
          <div className="activity-details">
            <h4>Task Updated</h4>
            <p>Yesterday • 6:40 PM</p>
          </div>
        </div>
      </div>
      <div className="activity-item">
        <div className="activity-left">
          <i className="fa-solid fa-trash"></i>
          <div className="activity-details">
            <h4>Task Deleted</h4>
            <p>Yesterday • 3:10 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Activity;
