import FeynmanAgent from "@/components/FeynmanAgent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Feynman Lesson Generation</h3>
      <FeynmanAgent
        userName={user?.name ?? ""}
        userId={user?.id ?? ""}
        type="generate"
      />
    </>
  );
};

export default page;
