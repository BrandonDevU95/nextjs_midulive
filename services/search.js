import algoliasearch from "algoliasearch";

const client = algoliasearch("N62GGP70NV", "ba309dae664bf69011f1ef2043bfafaa");
const index = client.initIndex("prod_comics");

export const search = async ({ query }) => {
   const { hits } = await index.search(query, {
      attributesToRetrieve: ["id", "title", "img", "alt"],
      hitsPerPage: 10,
   });

   return { results: hits };
};
