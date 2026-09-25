import type { Metadata } from "next";
import B2Practice from "./practice";

export const metadata: Metadata = {
  title: "Exercicis de català B2 | Practica Català",
  description: "1.000 exercicis autocorrectius de català B2 en sessions de 10 preguntes. Practica ortografia, pronoms febles, verbs, connectors, accentuació i lèxic.",
  alternates: { canonical: "/b2/" },
  openGraph: {
    title: "Exercicis de català B2 | Practica Català",
    description: "1.000 exercicis de català B2 amb correcció immediata, explicacions breus i sense registre.",
    url: "/b2/",
    locale: "ca_ES",
    type: "website",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Practica Català — exercicis de català B2" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1.000 exercicis de català B2 | Practica Català",
    description: "Sessions de 10 preguntes B2 amb correcció immediata i sense registre.",
    images: ["/social-card.png"],
  },
};

export default function B2Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "1.000 exercicis de català B2",
    url: "https://practica-catala.online/b2/",
    inLanguage: "ca",
    educationalLevel: "B2",
    learningResourceType: "Exercicis autocorrectius",
    isAccessibleForFree: true,
  };
  return <><B2Practice /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></>;
}
