import { useRouter } from "next/router";

export default function StoreDetailPage() {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div>
      <h2>Store Detail: {id}</h2>
    </div>
  );
}
