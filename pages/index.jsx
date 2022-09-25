import Head from "next/head";
import fs from "fs/promises";

import Header from "../components/Header";
import { Card, Container, Link, Row, Text } from "@nextui-org/react";
import Image from "next/image";

export default function Home({ latestComics }) {
   return (
      <div>
         <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <Header />

         <main>
            <h2 className="text-3xl font-bold text-center mb-10">
               Latest Comics
            </h2>
            <section className="grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
               {latestComics.map((comic) => {
                  return (
                     <Link
                        className="m-auto"
                        href={`/comic/${comic.id}`}
                        key={comic.id}
                     >
                        <a className="mb-4 pb-4">
                           <h3 className="font-bold text-sm text-center pb-2">
                              {comic.title}
                           </h3>
                           <Image
                              width="300"
                              height="300"
                              layout="intrinsic"
                              objectFit="contain"
                              src={comic.img}
                              alt={comic.alt}
                           />
                        </a>
                     </Link>
                  );
               })}
            </section>
         </main>
      </div>
   );
}

export async function getStaticProps(context) {
   const files = await fs.readdir("./comics");
   const latestComicsFiles = files.slice(-8, files.length);

   const promisesReadFiles = latestComicsFiles.map(async (file) => {
      const content = await fs.readFile(`./comics/${file}`, "utf-8");
      return JSON.parse(content);
   });

   const latestComics = await Promise.all(promisesReadFiles);

   return {
      props: {
         latestComics,
      },
   };
}