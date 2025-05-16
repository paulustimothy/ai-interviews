import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByFeynmanId } from "@/lib/actions/general2.action";
import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const FeynmanCard = async ({
  id,
  topic,
  difficulty,
  createdAt,
  language,
}: FeynmanCardProps) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  const feedback =
    userId && id
      ? await getFeedbackByFeynmanId({ feynmanId: id, userId })
      : null;

  const formattedDate = dayjs(
    feedback?.[0]?.createdAt || createdAt || Date.now()
  ).format("DD MMM YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{difficulty}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{topic} Feynman</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
              />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p>{feedback?.[0]?.totalScore || "---"}/100</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <span>{language === "id" ? "ID" : "EN"}</span>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.[0]?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <Button className="btn-primary">
            <Link
              href={feedback ? `/feynman/${id}/feedback` : `/feynman/${id}`}
            >
              {feedback ? "Check feedback" : "View Feynman"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeynmanCard;
