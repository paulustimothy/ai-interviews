"use server";

import { feedbackSchema, feedbackSchemaIND } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, language } = params;

  const formattedTranscript = transcript
    .map(
      (item: { role: string; content: string }) =>
        `- ${item.role}: ${item.content}\n`
    )
    .join("");

  const prompt =
    language == "en"
      ? `You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.`
      : `Anda adalah pewawancara AI yang menganalisis wawancara tiruan. Tugas Anda adalah mengevaluasi kandidat berdasarkan kategori terstruktur. Lakukan analisis secara menyeluruh dan terperinci. Jangan bersikap lunak terhadap kandidat. Jika ada kesalahan atau area yang perlu diperbaiki, tunjukkan.
        Transkrip:

        ${formattedTranscript}

        Harap beri skor kandidat dari 0 hingga 100 di area berikut. Jangan tambahkan kategori selain yang disediakan:
        - **Keterampilan Komunikasi**: Kejelasan, artikulasi, respons terstruktur.
        - **Pengetahuan Teknis**: Pemahaman konsep utama untuk peran tersebut.
        - **Pemecahan Masalah**: Kemampuan menganalisis masalah dan mengusulkan solusi.
        - **Kesesuaian Budaya & Peran**: Keselarasan dengan nilai-nilai perusahaan dan peran pekerjaan.
        - **Keyakinan & Kejelasan**: Keyakinan dalam respons, keterlibatan, dan kejelasan.`;

  const system =
    language === "en"
      ? "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories"
      : "Anda adalah pewawancara profesional yang menganalisis wawancara tiruan. Tugas Anda adalah mengevaluasi kandidat berdasarkan kategori terstruktur.";

  if (language === "en") {
    try {
      const {
        object: {
          totalScore,
          categoryScores,
          strengths,
          areasForImprovement,
          finalAssessment,
        },
      } = await generateObject({
        model: google("gemini-2.0-flash-001", {
          structuredOutputs: false,
        }),
        schema: feedbackSchema,
        prompt: prompt,
        system: system,
      });
      const feedback = await db.collection("feedback").add({
        interviewId,
        userId,
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
        language,
        createdAt: new Date().toISOString(),
      });
      return {
        success: true,
        feedbackId: feedback.id,
      };
    } catch (error) {
      console.log("Error creating English feedback", error);
      return {
        success: false,
      };
    }
  } else {
    try {
      const {
        object: {
          totalScore,
          categoryScores,
          strengths,
          areasForImprovement,
          finalAssessment,
        },
      } = await generateObject({
        model: google("gemini-2.0-flash-001", {
          structuredOutputs: false,
        }),
        schema: feedbackSchemaIND,
        prompt,
        system,
      });
      const feedback = await db.collection("feedback").add({
        interviewId,
        userId,
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
        language,
        createdAt: new Date().toISOString(),
      });
      return {
        success: true,
        feedbackId: feedback.id,
      };
    } catch (error) {
      console.log("Error creating Indonesian feedback", error);
      return {
        success: false,
      };
    }
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback[] | null> {
  const { interviewId, userId } = params;

  const feedback = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .get();

  if (feedback.empty) return null;

  return feedback.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Feedback[];
}
