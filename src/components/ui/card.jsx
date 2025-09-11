import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`rounded-2xl shadow-md p-4 bg-white ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
