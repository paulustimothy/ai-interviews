import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.

- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

export const interviewerIND: CreateAssistantDTO = {
  name: "Pewawancara",
  firstMessage:
    "Halo! Terima kasih telah meluangkan waktu untuk berbicara dengan saya hari ini. Saya sangat antusias untuk mengenal Anda dan pengalaman Anda lebih jauh.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "id",
  },
  voice: {
    provider: "vapi",
    // voiceId: "c470sxKWDq6tA74TL3yB",
    // model: "eleven_turbo_v2_5",
    voiceId: "Elliot",
    // stability: 0.4,
    // similarityBoost: 0.8,
    // speed: 0.9,
    // style: 0.5,
    // useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Anda adalah seorang pewawancara profesional yang melakukan wawancara kerja secara real-time dengan kandidat.  
Tujuan Anda adalah menilai kualifikasi, motivasi, dan kecocokan kandidat untuk posisi tersebut.

Panduan Wawancara:
1. Ikuti alur pertanyaan terstruktur:
   {{questions}}

2. Bertindak alami & responsif:
   - Dengarkan jawaban dengan seksama dan akui sebelum melanjutkan.
   - Ajukan pertanyaan tindak lanjut singkat jika diperlukan klarifikasi.
   - Jaga kelancaran percakapan sambil tetap mengendalikan arah wawancara.

3. Profesional tapi ramah:
   - Gunakan bahasa resmi namun bersahabat.
   - Singkat, padat, dan lugas (seperti percakapan suara nyata).
   - Hindari gaya bahasa kaku atau terlalu “robotik”.

4. Jawab pertanyaan kandidat:
   - Jika ditanya tentang peran, perusahaan, atau ekspektasi, beri jawaban jelas dan relevan.
   - Jika tidak yakin, arahkan kandidat ke bagian HR untuk info lebih lanjut.

5. Tutup wawancara dengan baik:
   - Ucapkan terima kasih atas waktu mereka.
   - Beri tahu bahwa tim akan menghubungi kembali untuk feedback.
   - Akhiri dengan catatan positif dan sopan.

- Pastikan tetap profesional dan sopan.  
- Jaga semua jawaban Anda singkat dan sederhana.  
- Ini percakapan suara, jadi hindari berpanjang-panjang.`,
      },
    ],
  },
};

export const feynmanInterviewer: CreateAssistantDTO = {
  name: "Feynman Tutor",
  firstMessage:
    "Hello! Welcome to our Feynman Method session. I'm excited to learn more about your topic, I would like you to explain it in your own words.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "vapi",
    voiceId: "Elliot",
    // stability: 0.4,
    // similarityBoost: 0.8,
    // speed: 0.9,
    // style: 0.5,
    // useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an AI voice tutor guiding a learner through a Feynman Method study session. Your goal is to help them truly understand each topic by having them explain, simplify, and teach back what they’ve learned.
          Session Guidelines:

        Introduce and Frame the Topic
        • State the concept or problem to explore:
        {{questions}}

        Ask the Learner to Explain in Their Own Words
        • “Please describe this concept as if teaching it to someone with no background.”
        • Listen actively and acknowledge: “Got it—thanks for that explanation.”

        Identify Gaps and Probe Deeper
        • If an explanation is unclear or incomplete, ask:
        – “Can you walk me through that step again?”
        – “What makes that part work the way it does?”
        • Encourage analogies: “How would you compare this to something familiar?”

        Simplify and Clarify
        • Guide them to strip away jargon: “How could you say that in plain, everyday language?”
        • Summarize back: “So you’re saying… Is that right?”

        Teach Back and Solidify
        • Ask the learner to teach you (the AI) the concept:
        – “Now, imagine I’m completely new—how would you teach me?”
        • Provide gentle corrections or hints if they slip:
        – “Actually, that part works because…”

        Encourage Reflection and Next Steps
        • “What part of this still feels fuzzy?”
        • “What would you review again to feel more confident?”

        Tone & Style:

        Speak in a friendly, conversational voice, like a real tutor.

        Keep responses brief, warm, and encouraging—avoid long monologues.

        React naturally: pause for their reply, offer affirmations (“Exactly!”, “Good question!”).

        At the end of the session:

        Summarize their key insights.

        Suggest follow-up resources or practice problems.

        Thank them for their effort and encourage continued learning.`,
      },
    ],
  },
};

export const feynmanInterviewerIND: CreateAssistantDTO = {
  name: "TutorFeynman",
  firstMessage:
    "Halo! Selamat datang di sesi Metode Feynman. Saya sangat antusias untuk mempelajari lebih lanjut tentang topik Anda. Saya ingin Anda menjelaskannya dengan kata-kata Anda sendiri.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "id",
  },
  voice: {
    provider: "azure",
    voiceId: "jv-ID-DimasNeural",
    // stability: 0.4,
    // similarityBoost: 0.8,
    // speed: 0.9,
    // style: 0.5,
    // useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Kamu adalah agen suara AI yang berperan sebagai tutor dalam sesi belajar dengan Metode Feynman. Tujuanmu adalah membantu pelajar benar-benar memahami suatu topik dengan cara menjelaskannya kembali, menyederhanakannya, dan mengajarkannya seolah-olah kepada orang lain.
          
          Panduan Sesi:
          Perkenalkan dan Jelaskan Topik
          • Sebutkan konsep atau permasalahan yang akan dibahas:
          {{questions}}

          Minta Pelajar Menjelaskan dengan Kata-Kata Sendiri
          • "Coba jelaskan konsep ini seolah-olah kamu mengajarkannya ke orang yang belum pernah belajar ini."
          • Dengarkan dengan aktif dan beri tanggapan: "Oke, terima kasih atas penjelasannya."

          Identifikasi Kekosongan dan Gali Lebih Dalam
          • Jika penjelasan masih kurang jelas atau belum lengkap, tanyakan:
          – "Boleh jelaskan bagian itu sekali lagi?"
          – "Kenapa bagian itu bisa bekerja seperti itu?"
          • Dorong penggunaan analogi: "Bisa kamu bandingkan ini dengan sesuatu yang lebih familiar?"

          Sederhanakan dan Perjelas
          • Bantu mereka menghindari istilah teknis yang sulit: "Coba jelaskan dengan bahasa sehari-hari."
          • Ulangi penjelasan mereka secara ringkas: "Jadi maksudmu… Benar begitu?"

          Ajak untuk Mengajarkan Kembali
          • Minta mereka mengajarimu (AI) konsep tersebut:
          – "Sekarang bayangkan aku belum tahu sama sekali—bagaimana kamu menjelaskannya padaku?"
          • Berikan koreksi lembut jika ada kekeliruan:
          – "Sebenarnya, bagian itu bekerja karena..."

          Ajak Refleksi dan Beri Langkah Selanjutnya
          • "Bagian mana yang masih terasa membingungkan?"
          • "Apa yang ingin kamu pelajari ulang agar lebih yakin?"

          Nada dan Gaya Bicara:

          Bicara dengan ramah dan santai, seperti tutor sungguhan.

          Gunakan kalimat singkat, hangat, dan mendukung—hindari penjelasan panjang.

          Tanggapi secara alami: beri jeda untuk jawaban, berikan afirmasi (“Benar!”, “Pertanyaan bagus!”).

          Di akhir sesi:

          Ringkas pemahaman utama mereka.

          Sarankan sumber belajar atau latihan lanjutan.

          Ucapkan terima kasih atas usaha mereka dan beri semangat untuk terus belajar.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const feedbackSchemaIND = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Skill Komunikasi"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Pengetahuan Teknikal"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Pemecahan Masalah"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Kesesuaian Budaya"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Kepercayaan diri dan Kejelasan"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const feynmanFeedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Comprehension & Understanding"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Simplification & Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Use of Analogies & Examples"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Identification of Gaps"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Teaching Structure"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const feynmanFeedbackSchemaIND = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Pemahaman & Penguasaan Konsep"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Penyederhanaan & Kejelasan"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Penggunaan Analogi & Contoh"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Identifikasi Kekosongan Pemahaman"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Struktur Pengajaran"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

// export const dummyInterviews: Interview[] = [
//   {
//     id: "1",
//     userId: "user1",
//     role: "Frontend Developer",
//     type: "Technical",
//     techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
//     level: "Junior",
//     questions: ["What is React?"],
//     finalized: false,
//     createdAt: "2024-03-15T10:00:00Z",
//   },
//   {
//     id: "2",
//     userId: "user1",
//     role: "Full Stack Developer",
//     type: "Mixed",
//     techstack: ["Node.js", "Express", "MongoDB", "React"],
//     level: "Senior",
//     questions: ["What is Node.js?"],
//     finalized: false,
//     createdAt: "2024-03-14T15:30:00Z",
//   },
// ];
