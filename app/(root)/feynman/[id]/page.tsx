import FeynmanAgent from "@/components/FeynmanAgent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeynmanInterviewById } from "@/lib/actions/general2.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const feynman = await getFeynmanInterviewById(id);

  if (!feynman) redirect("/");

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{feynman.topic} Feynman</h3>
          </div>
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
          {feynman.difficulty}
        </p>
      </div>

      <FeynmanAgent
        userName={user?.name || ""}
        userId={user?.id}
        feynmanId={id}
        type="interview"
        questions={feynman.questions}
      />
    </>
  );
};

export default page;
