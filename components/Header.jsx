import Link from "next/link";
import { useRef, useState } from "react";

export default function Header() {
   const [results, setResults] = useState([]);
   const searcRef = useRef();

   const getValue = () => searcRef.current?.value;

   const handleChange = () => {
      const q = getValue();

      if (!q) return;

      fetch(`/api/search?q=${q}`)
         .then((res) => res.json())
         .then((searchResults) => {
            setResults(searchResults);
         });
   };

   return (
      <header className="flex justify-between items-center p-4 max-w-xl m-auto">
         <h1 className="font-bold">
            <Link href="/">
               <a className="transition hover:opacity-80">
                  Next <span className="font-light">xkcd</span>
               </a>
            </Link>
         </h1>
         <nav>
            <ul className="flex flex-row gap-2">
               <li>
                  <Link href="/">
                     <a className="text-sm font-semibold">Home</a>
                  </Link>
               </li>
               <li>
                  <input
                     className="rounded-3xl border-gray-400 px-4 py-1 text-xs border"
                     ref={searcRef}
                     type="search"
                     onChange={handleChange}
                  />
                  <div className="relative z-10">
                     {Boolean(results.length) && (
                        <div className="absolute top-0 left-0">
                           <ul className="w-full border overflow-hidden border-gray-50 rounded-lg shadow-xl bg-white">
                              <li className="m-0" key="all-results">
                                 <Link href={`/search?q=${getValue()}`}>
                                    <a
                                       className="px-2 py-1 text-gray-400
                                     text-sm font-semibold block hover:bg-slate-200 overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                       Ver {results.length} resultados
                                    </a>
                                 </Link>
                              </li>
                              {results.map((result) => {
                                 return (
                                    <li className="m-0" key={result.id}>
                                       <Link href={`/comic/${result.id}`}>
                                          <a
                                             className="px-2 py-1 text-sm font-semibold block
                                           hover:bg-slate-200 overflow-hidden text-ellipsis whitespace-nowrap"
                                          >
                                             {result.title}
                                          </a>
                                       </Link>
                                    </li>
                                 );
                              })}
                           </ul>
                        </div>
                     )}
                  </div>
               </li>
            </ul>
         </nav>
      </header>
   );
}
