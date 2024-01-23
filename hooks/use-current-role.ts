import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const sesion = useSession();
  return sesion.data?.user.role;
};
