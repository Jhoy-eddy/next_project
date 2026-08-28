import { redirect } from "next/navigation";

type ReviewPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ReviewPage({
  params,
  searchParams,
}: ReviewPageProps) {
  const { slug } = await params;
  const values = await searchParams;
  const query = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "string") query.set(key, value);
    if (Array.isArray(value) && value[0]) query.set(key, value[0]);
  });

  const queryString = query.toString();
  redirect(
    `/dashboard/listings/${slug}/payment/review${queryString ? `?${queryString}` : ""}`,
  );
}
