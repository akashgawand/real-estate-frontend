"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-md overflow-hidden
        ${hoverable ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
