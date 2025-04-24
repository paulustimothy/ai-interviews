"use client";

import { interviewer, interviewerIND } from "@/constants";
import { createFeedback, getInterviewById } from "@/lib/actions/general.action";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [language, setLanguage] = useState<"en" | "id">("en");

  const showLanguageSelector = type === "generate";

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("ERROR", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    const fetchInterviewData = async () => {
      if (interviewId) {
        const interview = await getInterviewById(interviewId);
        if (interview) {
          setLanguage(interview.language || "en");
        }
      }
    };

    fetchInterviewData();
  }, [interviewId]);

  useEffect(() => {
    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        language: language,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error generating feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, interviewId, router, type, userId, language]);

  const handleCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);

      if (type === "generate") {
        const interviewerId =
          language === "en"
            ? process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID
            : process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID_IND;
        await vapi.start(interviewerId, {
          variableValues: {
            username: userName,
            userid: userId,
            type: type,
            language: language,
          },
        });
      } else {
        let formattedQuestions = "";
        const workflowId = language === "en" ? interviewer : interviewerIND;

        if (questions) {
          formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
        }

        await vapi.start(workflowId, {
          variableValues: {
            questions: formattedQuestions,
            language: language,
          },
        });
      }
    } catch (error) {
      console.log("Error starting call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);

    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      {showLanguageSelector && callStatus === CallStatus.INACTIVE && (
        <LanguageSelector
          onLanguageChange={(lang: "en" | "id") => setLanguage(lang)}
        />
      )}
      {!showLanguageSelector && (
        <div className="text-center mb-4">
          {language === "id" ? "🇮🇩 Bahasa Indonesia" : "🇺🇸 English"} Interview
        </div>
      )}
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={handleCall}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span>{isCallInactiveOrFinished ? "Call" : ". . ."}</span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
