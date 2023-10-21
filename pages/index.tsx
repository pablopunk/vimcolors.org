import React from "react";
import Head from "next/head";
import { Generator } from "components/Generator";
import { RelatedContent } from "components/RelatedContent";

const Index = () => (
  <>
    <Head>
      <title>Vim colors | Generate your custom colorscheme</title>
    </Head>
    <div className="flex flex-col gap-5 md:flex-row">
      <Generator />
      <RelatedContent />
    </div>
  </>
);

export default Index;
