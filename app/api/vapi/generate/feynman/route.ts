import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  return Response.json({ success: true, data: "THANK YOU2" }, { status: 200 });
}

export async function POST(request: Request) {
  const { amount, userid, language, topic, goal, difficulty } =
    await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt:
        language == "en"
          ? `Use the Feynman Technique to generate learning steps.
The topic to master is: ${topic}.
The learner’s goal is to: ${goal}.
The desired difficulty level is: ${difficulty}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]

Thank you! <3
`
          : `Gunakan Teknik Feynman untuk menghasilkan langkah-langkah pembelajaran.
Topik yang ingin dikuasai: ${topic}.
Tujuan pembelajar: ${goal}.
Tingkat kesulitan yang diinginkan: ${difficulty}.
Jumlah pertanyaan yang dibutuhkan: ${amount}.Harap jawab pertanyaan saja, tanpa teks tambahan.
        Pertanyaan akan dibacakan oleh asisten suara jadi jangan gunakan "/" atau "*" atau karakter khusus lainnya yang dapat merusak asisten suara.
        Jawab pertanyaan dengan format seperti ini:
        ["Pertanyaan 1", "Pertanyaan 2", "Pertanyaan 3"]

Terima kasih! <3
`,
    });

    const feynman = {
      topic,
      goal,
      difficulty,
      amount,
      questions: JSON.parse(questions),
      finalized: true,
      language,
      userid,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("feynmans").add(feynman);
    return Response.json({ success: true, data: feynman }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
