"use client";
import React from "react";
import NewPassword from "../page";

function Token({ params }: { params: { slug: string } }) {
  const tokenEmail = decodeURIComponent(params.slug);
  sessionStorage.setItem("resetPasswordToken", JSON.stringify(tokenEmail));
  console.log(tokenEmail)
  return <NewPassword tokenEmail={tokenEmail} />;
}

export default Token;
