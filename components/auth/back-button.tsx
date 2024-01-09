import Link from "next/link";
import React, { FC } from "react";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton: FC<BackButtonProps> = ({ href, label }) => {
  return (
    <button className="hover:underline">
      <Link href={href}>{label}</Link>
    </button>
  );
};

export default BackButton;
