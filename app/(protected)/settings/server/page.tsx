import { currentUser } from "@/utils/auth";

const ServerPage = async () => {
  const user = await currentUser();

  const onClick = () => {
    console.log(user);
  };
  return (
    <div>
      {JSON.stringify(user)}
      <button>ASD</button>
    </div>
  );
};

export default ServerPage;
