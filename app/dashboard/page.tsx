"use client";
import React from "react";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";

function Dashboard({ children }: { children: React.ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}

export default Dashboard;
