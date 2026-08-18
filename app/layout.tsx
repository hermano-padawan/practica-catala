import type { Metadata } from "next";
import "./globals.css";
import "./interactive.css";
export const metadata:Metadata={
  metadataBase:new URL("https://practica-catala.online"),
  title:"Exercicis de català C1 | Practica Català",
  description:"1.000 exercicis autocorrectius de català C1 en sessions de 10 preguntes. Practica ortografia, pronoms febles, verbs, connectors, accentuació i lèxic sense registre.",
  alternates:{canonical:"/"},
  robots:{index:true,follow:true},
  openGraph:{title:"Exercicis de català C1 | Practica Català",description:"1.000 exercicis autocorrectius de català C1, gratuïts i sense registre.",url:"/",siteName:"Practica Català",locale:"ca_ES",type:"website"},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ca"><body>{children}</body></html>}
