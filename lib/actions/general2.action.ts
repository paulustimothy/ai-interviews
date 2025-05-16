"use server";

import { feynmanFeedbackSchema, feynmanFeedbackSchemaIND } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getFeynmanInterviewsByUserId(
  userId: string
): Promise<Feynman[] | null> {
  const feynmans = await db
    .collection("feynmans")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return feynmans.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Feynman[];
}

export async function getLatestFeynmanInterviews(
  params: GetLatestFeynmanParams
): Promise<Feynman[] | null> {
  const { userId, limit = 20 } = params;

  const feynmans = await db
    .collection("feynmans")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  console.log("feynmans", feynmans.docs);
  return feynmans.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Feynman[];
}

export async function getFeynmanInterviewById(
  id: string
): Promise<Feynman | null> {
  const feynman = await db.collection("feynmans").doc(id).get();

  return feynman.data() as Feynman | null;
}

export async function createFeynmanFeedback(
  params: CreateFeynmanFeedbackParams
) {
  const { feynmanId, userId, transcript, language } = params;

  const formattedTranscript = transcript
    .map(
      (item: { role: string; content: string }) =>
        `- ${item.role}: ${item.content}\n`
    )
    .join("");

  const prompt =
    language == "en"
      ? `You are an AI tutor evaluating a learner's Feynman Method lesson based solely on their own explanation transcript. Your goal is to assess how effectively they've internalized and applied the Feynman Technique, and to pinpoint strengths and areas for improvement. Be rigorous and specific—do not gloss over mistakes.

Transcript:

${formattedTranscript}

Please assign a score from 0 to 100 in each of the following categories. Don't add any other categories:

* **Comprehension & Understanding**: How accurately the learner grasps and conveys the core concept.
* **Simplification & Clarity**: How well the explanation has been distilled into simple, understandable language.
* **Use of Analogies & Examples**: Quality and relevance of analogies or examples to illustrate the concept.
* **Identification of Gaps**: Ability to recognize and articulate any parts of the concept they feel uncertain about.
* **Teaching Structure**: Logical flow—introduction of the concept, explanation, summary, and conclusion.

For each category:

1. Provide the numeric score (0-100).
2. Cite concrete excerpts from the transcript.
3. Give a brief rationale.
4. Offer one or two actionable suggestions for improvement.

Do not soften feedback—be direct and thorough.
`
      : `Anda adalah AI tutor yang mengevaluasi pelajaran metode Feynman berdasarkan transkrip penjelasan dari peserta. Tugas Anda adalah menilai seberapa efektif peserta telah memahami dan menerapkan Teknik Feynman. Berikan analisis yang ketat dan spesifik — jangan mengabaikan kesalahan atau area yang masih lemah.

Transkrip:
${formattedTranscript}

Silakan berikan skor dari 0 hingga 100 untuk setiap kategori berikut. Jangan menambahkan kategori lain:

* **Pemahaman & Penguasaan Konsep**: Seberapa akurat peserta memahami dan menjelaskan konsep inti.
* **Penyederhanaan & Kejelasan**: Seberapa baik peserta menyederhanakan penjelasan menjadi bahasa yang mudah dimengerti.
* **Penggunaan Analogi & Contoh**: Kualitas dan relevansi analogi atau contoh yang digunakan untuk menjelaskan konsep.
* **Identifikasi Kekosongan Pemahaman**: Kemampuan peserta dalam mengenali dan mengakui bagian dari konsep yang belum dipahami sepenuhnya.
* **Struktur Pengajaran**: Alur penjelasan — pembukaan, penjabaran konsep, ringkasan, dan penutup.

Untuk setiap kategori:

1. Berikan skor numerik (0-100).
2. Kutip bagian relevan dari transkrip.
3. Berikan alasan singkat di balik penilaian.
4. Tawarkan satu atau dua saran konkret untuk perbaikan.

Jangan bersikap lunak dalam memberi umpan balik — bersikaplah langsung dan mendalam.
`;

  const system =
    language == "en"
      ? "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be objective, critical, and detailed in your assessment. Focus on both strengths and areas that need improvement. Avoid generalizations."
      : "Anda adalah seorang pewawancara profesional yang sedang menganalisis sesi wawancara simulasi. Tugas Anda adalah mengevaluasi kandidat berdasarkan kategori yang terstruktur. Bersikaplah objektif, kritis, dan rinci dalam penilaian Anda. Fokus pada kekuatan serta aspek yang perlu diperbaiki. Hindari penilaian yang terlalu umum.";

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
        schema: feynmanFeedbackSchema,
        prompt,
        system,
      });

      const feedback = await db.collection("feynmanFeedback").add({
        feynmanId,
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
        feynmanFeedbackId: feedback.id,
      };
    } catch (error) {
      console.log("Error creating English feedback", error);
      return { success: false };
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
        schema: feynmanFeedbackSchemaIND,
        prompt,
        system,
      });

      const feedback = await db.collection("feynmanFeedback").add({
        feynmanId,
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
        feynmanFeedbackId: feedback.id,
      };
    } catch (error) {
      console.log("Error creating Indonesian feedback", error);
      return { success: false };
    }
  }
}

export async function getFeedbackByFeynmanId(
  params: GetFeedbackByFeynmanIdParams
): Promise<Feedback[] | null> {
  const { feynmanId, userId } = params;

  const feedback = await db
    .collection("feynmanFeedback")
    .where("feynmanId", "==", feynmanId)
    .where("userId", "==", userId)
    .get();

  if (feedback.empty) return null;

  return feedback.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Feedback[];
}
