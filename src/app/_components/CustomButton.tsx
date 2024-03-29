import React, { DetailedHTMLProps } from "react";
type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const CustomButton = ({
  small = false,
  gray = false,
  className = "",
  ...props
}: ButtonProps) => {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
  const colorClasses = gray
    ? "bg-gray-500 hover:bg-gray-600 focus-visible:bg-gray-300"
    : "bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-300";
  return (
    <button
      className={`rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
};

export default CustomButton;
