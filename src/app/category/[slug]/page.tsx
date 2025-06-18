// app/categories/[slug]/page.tsx

type Props = {
  params: { slug: string };
};

export default function CategoryPage({ params }: Props) {
  const { slug } = params;

  return (
    <div>
      <h1>Category: {slug.replace(/-/g, " ")}</h1>
      {/* You can fetch category data here using the slug */}
    </div>
  );
}
