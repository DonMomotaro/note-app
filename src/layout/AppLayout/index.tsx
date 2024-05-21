import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children?: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const router = useRouter();
  const { checkStorageToken } = useAuth();

  useEffect(() => {
    const accessToken = checkStorageToken();
    if (!accessToken) {
      if (router.asPath.includes("login") || router.asPath.includes("signup"))
        return;
      router.push("/auth/login");
    }
  }, [router.asPath]);

  return <div>{children}</div>;
};

export default AppLayout;
