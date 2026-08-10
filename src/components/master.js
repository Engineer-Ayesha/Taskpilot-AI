import React from "react";
import { Outlet } from "react-router-dom";
function Master() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default Master;
