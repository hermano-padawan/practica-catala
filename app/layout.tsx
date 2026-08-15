import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Practica Català",description:"Exercicis autocorrectius de català per nivells B2, C1 i C2. Sense teoria: practica i rep la correcció immediatament.",other:{"codex-preview":"development"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ca"><body>{children}</body></html>}
