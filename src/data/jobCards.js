import imgSoftware from "../assets/landing/software.png";
import imgData from "../assets/data 1.png";
import imgUiux from "../assets/uiux 1.png";
import imgCyber from "../assets/cyber 1.png";
import imgMl from "../assets/machine learning 1.png";
import imgContent from "../assets/machine learning 1-1.png";
import imgBusiness from "../assets/business 1.png";
import imgPm from "../assets/pm 1.png";
import imgDigimarketing from "../assets/digimarketing 1.png";
import imgCloud from "../assets/cloud 1.png";

export const jobCards = [
  {
    slug: "software-engineer",
    name: "Software Engineer",
    img: imgSoftware,
    description:
      "Software Engineer merancang, membangun, dan memelihara perangkat lunak. Mereka mengubah ide menjadi produk nyata yang dipakai jutaan orang.",
    skills: ["Programming", "Problem Solving", "System Design", "Testing"],
    traits: ["Teliti", "Pekerja Keras", "Analitis", "Adaptif"],
    companions: ["UI/UX Designer", "Product Manager", "Data Engineer"],
  },
  {
    slug: "ui-ux-designer",
    name: "UI/UX Designer",
    img: imgUiux,
    description:
      "UI/UX Designer menciptakan pengalaman digital yang intuitif dan menyenangkan. Mereka menjembatani kebutuhan pengguna dengan teknologi.",
    skills: ["Figma", "User Research", "Prototyping", "Visual Design"],
    traits: ["Kreatif", "Empatik", "Detail-Oriented", "Kolaboratif"],
    companions: ["Software Engineer", "Product Manager", "Copywriter"],
  },
  {
    slug: "data-analyst",
    name: "Data Analyst",
    img: imgData,
    description:
      "Data Analyst menggali data untuk menemukan insight berharga yang membantu perusahaan mengambil keputusan lebih baik.",
    skills: ["SQL", "Python", "Data Visualization", "Statistics"],
    traits: ["Analitis", "Curious", "Teliti", "Komunikatif"],
    companions: ["Data Engineer", "Business Analyst", "Product Manager"],
  },
  {
    slug: "machine-learning-engineer",
    name: "ML Engineer",
    img: imgMl,
    description:
      "Machine Learning Engineer membangun model AI yang bisa belajar dan membuat prediksi dari data.",
    skills: ["Python", "Deep Learning", "Math & Stats", "MLOps"],
    traits: ["Analitis", "Eksperimental", "Tekun", "Research-minded"],
    companions: ["Data Scientist", "Software Engineer", "Data Analyst"],
  },
  {
    slug: "content-creator",
    name: "Content Creator",
    img: imgContent,
    description:
      "Content Creator menghasilkan konten digital yang menarik, informatif, dan relevan untuk berbagai platform.",
    skills: ["Copywriting", "Video Editing", "SEO", "Storytelling"],
    traits: ["Kreatif", "Konsisten", "Komunikatif", "Trendy"],
    companions: ["Digital Marketer", "UI/UX Designer", "Brand Strategist"],
  },
  {
    slug: "digital-marketer",
    name: "Digital Marketer",
    img: imgDigimarketing,
    description:
      "Digital Marketer mempromosikan produk dan jasa lewat kanal digital agar menjangkau audiens yang tepat.",
    skills: ["SEO/SEM", "Social Media", "Analytics", "Copywriting"],
    traits: ["Kreatif", "Strategis", "Data-driven", "Komunikatif"],
    companions: ["Content Creator", "UI/UX Designer", "Product Manager"],
  },
  {
    slug: "business-analyst",
    name: "Business Analyst",
    img: imgBusiness,
    description:
      "Business Analyst menjadi jembatan antara tim IT dan bisnis. Mereka menganalisis proses bisnis dan merumuskan solusi teknologi yang tepat.",
    skills: ["Data Analysis", "Communication", "Problem Solving", "Agile"],
    traits: ["Strategis", "Kritis", "Komunikatif", "Adaptif"],
    companions: ["Data Analyst", "Project Manager", "Software Engineer"],
  },
  {
    slug: "cloud-engineer",
    name: "Cloud Engineer",
    img: imgCloud,
    description:
      "Cloud Engineer bertanggung jawab merancang, membangun, dan memelihara infrastruktur teknologi di cloud agar sistem berjalan efisien.",
    skills: ["AWS/GCP/Azure", "Linux", "Networking", "DevOps"],
    traits: ["Tekun", "Analitis", "Inovatif", "Problem Solver"],
    companions: ["Software Engineer", "Cybersecurity Analyst", "Data Engineer"],
  },
  {
    slug: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    img: imgCyber,
    description:
      "Cybersecurity Analyst melindungi sistem dan jaringan komputer dari ancaman peretas serta menjaga kerahasiaan data perusahaan.",
    skills: ["Network Security", "Risk Management", "Ethical Hacking", "Cryptography"],
    traits: ["Waspada", "Teliti", "Analitis", "Integritas Tinggi"],
    companions: ["Cloud Engineer", "Software Engineer", "IT Manager"],
  },
  {
    slug: "project-manager",
    name: "Project Manager",
    img: imgPm,
    description:
      "Project Manager memimpin tim untuk merencanakan, mengeksekusi, dan menyelesaikan proyek teknologi tepat waktu dan sesuai anggaran.",
    skills: ["Leadership", "Agile/Scrum", "Risk Management", "Communication"],
    traits: ["Terorganisir", "Pemimpin", "Komunikatif", "Solutif"],
    companions: ["Software Engineer", "Business Analyst", "UI/UX Designer"],
  },
];
