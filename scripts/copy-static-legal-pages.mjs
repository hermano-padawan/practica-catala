import { access, copyFile, mkdir } from "node:fs/promises";

for(const slug of ["avis-legal","privacitat","cookies"]){
  const candidates=[`.next/server/app/${slug}/index.html`,`.next/server/app/${slug}.html`];
  let source;
  for(const candidate of candidates){try{await access(candidate);source=candidate;break}catch{}}
  if(!source) throw new Error(`No s'ha trobat l'HTML exportat de ${slug}`);
  const destination=`out/${slug}/index.html`;
  await mkdir(`out/${slug}`,{recursive:true});
  await copyFile(source,destination);
}
console.log("Pàgines legals copiades a l'exportació estàtica.");
