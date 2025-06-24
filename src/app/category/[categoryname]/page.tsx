// app/categories/[slug]/page.tsx

type Props = {
  params: { categoryname: string };
};

export default async function CategoryNamePage({ params }: Props) {
  const { categoryname } = await params;

  return (
    <div>
      <h1>Category: {categoryname.replace(/-/g, " ")}</h1>
      {/* You can fetch category data here using the slug */}
    </div>
  );
}
