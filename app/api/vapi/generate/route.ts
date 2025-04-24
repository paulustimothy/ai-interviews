import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json({ success: true, data: "THANK YOU" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid, language } =
    await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt:
        language == "en"
          ? `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
    `
          : `Siapkan pertanyaan untuk wawancara kerja.
        Jabatan pekerjaan adalah ${role}.
        Tingkat pengalaman kerja adalah ${level}.
        Teknologi yang digunakan dalam pekerjaan adalah: ${techstack}.
        Fokus antara pertanyaan perilaku dan teknis harus condong ke: ${type}.
        Jumlah pertanyaan yang diperlukan adalah: ${amount}.
        Harap jawab pertanyaan saja, tanpa teks tambahan.
        Pertanyaan akan dibacakan oleh asisten suara jadi jangan gunakan "/" atau "*" atau karakter khusus lainnya yang dapat merusak asisten suara.
        Jawab pertanyaan dengan format seperti ini:
        ["Pertanyaan 1", "Pertanyaan 2", "Pertanyaan 3"]

        Terima kasih! <3`,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      language: language,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);
    return Response.json({ success: true, data: interview }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
