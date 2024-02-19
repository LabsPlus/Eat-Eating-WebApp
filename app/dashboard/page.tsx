"use client";
import React from "react";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";

function Dashboard() {
  return (
    <PrivateRoute>
      <div>
        {/* <h1>Hi on Dashboard home</h1> */}
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
