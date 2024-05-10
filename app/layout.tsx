"use client";

import React from "react";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "@/app/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* google fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthContext>
          {" "}
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                style: {
                  background: "#ffffff",
                  border: "2px solid #0444BD",
                  color: "#000000",
                },
              },
              error: {
                style: {
                  background: "#ffcccc",
                  border: "2px solid #ff0000",
                  color: "#000000",
                },
              },
              style: {
                background: "#ffffff",
                border: "2px solid #0444BD",
                color: "#333",
              },
            }}
          />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </AuthContext>
      </body>
    </html>
  );
}
