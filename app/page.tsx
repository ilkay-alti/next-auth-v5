import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <main className="flex flex-col h-full justify-center items-center gap-12">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md">🔥 Auth Page</h1>
        <p className="text-lg">A simple authentication service</p>
      </div>
      <LoginButton>
        <button className="flex bg-red-400 px-4 py-2 rounded-lg">
          <Link href="/login" className="text-xl text-white font-bold">
            Sing In
          </Link>
        </button>
      </LoginButton>
    </main>
  );
};

export default HomePage;
