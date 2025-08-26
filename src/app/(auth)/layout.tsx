import AuthLayout from "@/components/layouts/auth-layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
