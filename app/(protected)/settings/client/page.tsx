"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    console.log(user);
  };

  return (
    <div>
      {JSON.stringify(user)}

      <button onClick={onClick} type="submit">
        Logout
      </button>
    </div>
  );
};

export default SettingPage;
