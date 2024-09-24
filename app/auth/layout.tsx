import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      {children}
    </div>
  );
};

export default AuthLayout;
