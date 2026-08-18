import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./interactive.css";
export const metadata:Metadata={
  metadataBase:new URL("https://practica-catala.online"),
  applicationName:"Practica Català",
  title:"Exercicis de català C1 | Practica Català",
  description:"1.000 exercicis autocorrectius de català C1 en sessions de 10 preguntes. Practica ortografia, pronoms febles, verbs, connectors, accentuació i lèxic sense registre.",
  alternates:{canonical:"/"},
  robots:{index:true,follow:true},
  icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"},{url:"/favicon-64.png",type:"image/png",sizes:"64x64"}],apple:"/apple-touch-icon.png"},
  openGraph:{title:"1.000 exercicis de català C1 | Practica Català",description:"Practica català C1 en sessions de 10 preguntes, amb correcció immediata i sense registre.",url:"/",siteName:"Practica Català",locale:"ca_ES",type:"website",images:[{url:"/social-card.png",width:1200,height:630,alt:"Practica Català — 1.000 exercicis de català C1"}]},
  twitter:{card:"summary_large_image",title:"1.000 exercicis de català C1 | Practica Català",description:"Sessions de 10 preguntes amb correcció immediata i sense registre.",images:["/social-card.png"]},
};
export const viewport:Viewport={themeColor:"#0f6c58"};
const structuredData={"@context":"https://schema.org","@type":"WebApplication",name:"Practica Català",url:"https://practica-catala.online/",description:"1.000 exercicis autocorrectius de català C1 en sessions de 10 preguntes.",applicationCategory:"EducationalApplication",operatingSystem:"Qualsevol navegador",inLanguage:"ca",isAccessibleForFree:true};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ca"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/></body></html>}
