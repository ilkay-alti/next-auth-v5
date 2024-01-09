import React from "react";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <button className="bg-white w-full flex items-center justify-center shadow-sm py-2">
        <FcGoogle size={20} />
      </button>
      <button className="bg-white w-full flex items-center justify-center shadow-sm py-2">
        <ImGithub size={20} />
      </button>
    </div>
  );
};

export default Social;
