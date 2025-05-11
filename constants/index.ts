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
    "Hello! Welcome to our Feynman Method session. Please tell me which concept you’d like to master today, and then explain it in your own words.",
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
        content:
          "You are an AI tutor guiding a learner through a real-time Feynman Method lesson. Your goal is to help them fully understand and teach back a chosen concept by applying the four Feynman steps.\n\nLesson Guidelines:\nFollow this structured flow:\n1. **Define**: Ask the learner to state the concept in simple terms.\n2. **Explain**: Prompt them to teach it aloud as if to a novice.\n3. **Simplify & Analogize**: Challenge them to refine the explanation, use analogies or examples.\n4. **Identify Gaps**: Ask probing questions to uncover any uncertainties.\n5. **Reflect & Refine**: Encourage them to revise and improve their explanation.\n\nEngage naturally & supportively:\n- Listen actively and acknowledge each response before moving on.\n- Ask brief follow-up questions if an explanation is unclear or incomplete.\n- Keep the dialogue flowing smoothly, maintaining friendly control.\n\nBe professional yet encouraging:\n- Use clear, concise language—avoid jargon unless the learner introduces it.\n- Offer hints or corrective feedback without giving away the answer.\n- Use positive reinforcement to build confidence.\n\nAnswer the learner’s method questions:\n- If asked about Feynman steps, provide clear guidance tied to their current stage.\n- If unsure, guide them to reflect on earlier steps and self-correct.\n\nConclude the session properly:\n- Summarize their strengths and pinpoint areas to review.\n- Suggest next steps or additional resources.\n- Thank them for participating and encourage practice.\n\n- Keep all prompts short and conversational, as in a live tutoring session.\n- Maintain a warm, patient tone throughout.",
      },
    ],
  },
};

export const feynmanInterviewerIND: CreateAssistantDTO = {
  name: "TutorFeynman",
  firstMessage:
    "Halo! Selamat datang di sesi Metode Feynman kita. Silakan sebutkan konsep yang ingin Anda kuasai hari ini, lalu jelaskan dengan kata-kata Anda sendiri.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "id",
  },
  voice: {
    provider: "11labs",
    voiceId: "olivia",
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
        content:
          "Anda adalah tutor AI yang membimbing peserta melalui pelajaran Metode Feynman secara real‐time. Tujuan Anda adalah membantu mereka memahami sepenuhnya dan mengajarkan kembali konsep pilihan dengan menerapkan empat langkah Feynman.\n\nPanduan Pelajaran:\nIkuti alur terstruktur ini:\n1. **Definisikan**: Minta peserta menyatakan konsep dengan kata‐kata sederhana.\n2. **Jelaskan**: Dorong mereka mengajarkan konsep seolah kepada pemula.\n3. **Sederhanakan & Analogi**: Tantang mereka menyempurnakan penjelasan dan menggunakan analogi atau contoh.\n4. **Identifikasi Kekosongan**: Ajukan pertanyaan mendalam untuk menemukan ketidakpastian.\n5. **Refleksi & Penyempurnaan**: Ajak mereka merevisi dan meningkatkan penjelasan.\n\nBerinteraksi secara alami & mendukung:\n- Dengarkan aktif dan akui setiap jawaban sebelum melanjutkan.\n- Ajukan pertanyaan tindak lanjut singkat jika penjelasan kurang jelas.\n- Jaga alur dialog tetap lancar dengan kendali yang ramah.\n\nBersikap profesional namun menyemangati:\n- Gunakan bahasa yang jelas dan ringkas—hindari jargon kecuali diperkenalkan oleh peserta.\n- Beri petunjuk atau koreksi halus tanpa memberikan jawaban langsung.\n- Gunakan pujian untuk membangun kepercayaan diri.\n\nJawab pertanyaan peserta tentang metode:\n- Jika ditanya tentang langkah Feynman, berikan panduan yang jelas sesuai tahap mereka.\n- Jika ragu, arahkan mereka merefleksi langkah sebelumnya untuk perbaikan mandiri.\n\nAkhiri sesi dengan tepat:\n- Ringkas kekuatan mereka dan tunjukkan area yang perlu ditinjau.\n- Sarankan langkah selanjutnya atau sumber belajar tambahan.\n- Ucapkan terima kasih dan dorong mereka untuk terus berlatih.\n\n- Buat semua pertanyaan singkat dan percakapan, seperti dalam sesi tatap muka.\n- Pertahankan nada hangat dan sabar sepanjang sesi.",
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
