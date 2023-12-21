import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuthContext } from "@/app/contexts/AuthContext";
import React from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userSession = sessionStorage.getItem("user");

    if (!user && storedUser) {
      setUser(storedUser);
    } else if (!user && userSession) {
      setUser(userSession);
    }

    if (!user && !storedUser && !userSession) {
      router.push("/login");
    }
  }, [user, router]);

  return <>{children}</>;
};

export default PrivateRoute;
