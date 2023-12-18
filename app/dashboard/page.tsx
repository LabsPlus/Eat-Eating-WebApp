"use client";
import React, { useEffect, useState } from "react";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import { useAuthContext } from "@/app/contexts/AuthContext";

function Dashboard() {
  const { user } = useAuthContext();

  return (
    <PrivateRoute>
      <main>
        <h1>Oi {user} !</h1>
        <h1>Voce ta em Dashboard</h1>
      </main>
    </PrivateRoute>
  );
}

export default Dashboard;
