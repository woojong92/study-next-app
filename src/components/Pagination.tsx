import Link from "next/link";

interface PaginationProps {
  total: number;
  page: string;
}

export default function Pagination({ total, page }: PaginationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-4 bg-white my-10 flex-wrap">
      {total <= 10 ? (
        [...Array(total)].map((x, i) => (
          <Link key={i} href={`stores?page=${i + 1}`}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                i + 1 === parseInt(page, 10) ? "text-blue-500" : "text-gray-400"
              }`}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          <Link
            href={{
              pathname: "/stores",
              query: { page: parseInt(page) - 1 },
            }}
          >
            <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
              이전
            </span>
          </Link>
          <Link href={{ pathname: "/stores", query: { page: parseInt(page) } }}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white text-blue-500`}
            >
              {page}
            </span>
          </Link>

          {total > parseInt(page) && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: parseInt(page) + 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
