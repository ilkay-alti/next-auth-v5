import React from "react";
import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default SettingPage;
