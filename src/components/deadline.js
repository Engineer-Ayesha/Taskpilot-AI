import React from "react";
import "./style.css";
function Deadline() {
  return (
    <div className="deadline-component">
      <div className="deadline-item">
        <div className="deadline-left">
          <i className="fa-solid fa-calendar-days"></i>
          <div className="deadline-details">
            <h4>Dashboard UI</h4>
            <p>Due Today</p>
          </div>
        </div>
        <span className="deadline-tag urgent">Urgent</span>
      </div>
      <div className="deadline-item">
        <div className="deadline-left">
          <i className="fa-solid fa-calendar-days"></i>
          <div className="deadline-details">
            <h4>Landing Page</h4>
            <p>Tomorrow</p>
          </div>
        </div>
        <span className="deadline-tag medium">Medium</span>
      </div>
      <div className="deadline-item">
        <div className="deadline-left">
          <i className="fa-solid fa-calendar-days"></i>
          <div className="deadline-details">
            <h4>Portfolio Website</h4>
            <p>12 Aug 2026</p>
          </div>
        </div>
        <span className="deadline-tag low">Low</span>
      </div>
    </div>
  );
}
export default Deadline;
