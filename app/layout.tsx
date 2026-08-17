import type { Metadata } from "next";
import "./globals.css";
import "./interactive.css";
export const metadata:Metadata={title:"Exercicis de català C1 | Practica Català",description:"Exercicis autocorrectius de català C1. Practica pronoms febles, verbs, connectors, accentuació i lèxic sense registre.",other:{"codex-preview":"development"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ca"><body>{children}</body></html>}
