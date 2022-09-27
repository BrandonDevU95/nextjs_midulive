import { search } from "services/search";
import { Layout } from "components/Layout";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function index({ query, results }) {
   return (
      <>
         <Head>
            <title>xkcd - Resuts for {query}</title>
            <meta name="description" content={`Search result for ${query}`} />
         </Head>
         <Layout>
            <h1>
               {results.length} - Resultados para {query} 🔍
            </h1>
            {results.map((result) => {
               return (
                  <Link href={`/comic/${result.id}`} key={result.id}>
                     <a className="flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50">
                        <Image
                           width="50"
                           height="50"
                           src={result.img}
                           alt={result.alt}
                           className="rounded-full"
                        />
                        <div>
                           <h2>{result.title}</h2>
                        </div>
                     </a>
                  </Link>
               );
            })}
         </Layout>
      </>
   );
}

export async function getServerSideProps(context) {
   const { query } = context;
   const { q = "" } = query;

   const { results } = await search({ query: q });

   return {
      props: {
         query: q,
         results,
      },
   };
}
