import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  viewBox?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export const IconBase = ({
  viewBox = "0 0 48 48",
  width = 48,
  height = 48,
  className = "",
  children,
  ...props
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};
