import FeynmanCard from "@/components/FeynmanCard";
import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import {
  getFeynmanInterviewsByUserId,
  getLatestFeynmanInterviews,
} from "@/lib/actions/general2.action";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews, userFeynman, latestFeynman] =
    await Promise.all([
      user?.id ? await getInterviewByUserId(user.id) : [],
      user?.id ? await getLatestInterviews({ userId: user.id }) : [],
      user?.id ? await getFeynmanInterviewsByUserId(user.id) : [],
      user?.id ? await getLatestFeynmanInterviews({ userId: user.id }) : [],
    ]);

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasPastFeynman = (userFeynman?.length ?? 0) > 0;
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;
  const hasUpcomingFeynman = (latestFeynman?.length ?? 0) > 0;
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>
          <div className="flex flex-row gap-4 max-sm:flex-col">
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">Start an Interview</Link>
            </Button>
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/feynman">Start a Feynman lesson</Link>
            </Button>
          </div>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>No upcoming interviews</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Feynman lessons</h2>
        <div className="interviews-section">
          {hasPastFeynman ? (
            userFeynman?.map((feynman) => (
              <FeynmanCard {...feynman} key={feynman.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any Feynman lessons yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take a Feynman lesson</h2>
        <div className="interviews-section">
          {hasUpcomingFeynman ? (
            latestFeynman?.map((feynman) => (
              <FeynmanCard {...feynman} key={feynman.id} />
            ))
          ) : (
            <p>No upcoming Feynman lessons</p>
          )}
        </div>
      </section>
      <Button className="btn-primary ml-auto" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
};

export default page;
