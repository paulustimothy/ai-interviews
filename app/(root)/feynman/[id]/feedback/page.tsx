import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByFeynmanId } from "@/lib/actions/general2.action";
import { redirect } from "next/navigation";
import { getFeynmanInterviewById } from "@/lib/actions/general2.action";
import FeedbackNavigation from "@/components/FeedbackNavigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const feynman = await getFeynmanInterviewById(id);
  if (!feynman) redirect("/");
  if (!user?.id) redirect("/");

  const feedbacks = await getFeedbackByFeynmanId({
    feynmanId: id,
    userId: user.id,
  });

  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{feynman.topic}</span> Feynman
        </h1>
      </div>

      <FeedbackNavigation feedbacks={feedbacks} />

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link href={`/feynman/${id}`} className="flex w-full justify-center">
            <p className="text-sm font-semibold text-black text-center">
              Retake Feynman Session
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
