import type { Metadata } from "next";
import B2Practice from "./practice";

export const metadata: Metadata = {
  title: "Exercicis de català B2 | Practica Català",
  description: "Exercicis autocorrectius de català B2 en sessions de 10 preguntes. Practica accentuació, apostrofació, pronoms febles, verbs, connectors i lèxic.",
  alternates: { canonical: "/b2/" },
  openGraph: {
    title: "Exercicis de català B2 | Practica Català",
    description: "Practica català B2 amb correcció immediata, explicacions breus i sense registre.",
    url: "/b2/",
    locale: "ca_ES",
    type: "website",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Practica Català — exercicis de català B2" }],
  },
};

export default function B2Page() {
  return <B2Practice />;
}
