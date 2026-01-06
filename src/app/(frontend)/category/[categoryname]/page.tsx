// app/categories/[slug]/page.tsx

import React from "react";

type Props = {
  params: Promise<{ categoryname: string }>;
};

export default function CategoryNamePage({ params }: Props) {
  const { categoryname } = React.use(params);

  return (
    <div>
      <h1>Category: {categoryname.replace(/-/g, " ")}</h1>
      {/* You can fetch category data here using the slug */}
    </div>
  );
}
