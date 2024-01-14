"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

const Social = () => {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <button
        onClick={() => onClick("google")}
        className="bg-white w-full flex items-center justify-center shadow-sm py-2"
      >
        <FcGoogle size={20} />
      </button>
      <button
        onClick={() => onClick("github")}
        className="bg-white w-full flex items-center justify-center shadow-sm py-2"
      >
        <ImGithub size={20} />
      </button>
    </div>
  );
};

export default Social;
