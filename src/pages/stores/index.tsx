import { Fragment, useCallback, useEffect, useRef } from "react";

import Loading from "@/components/Loading";
import { StoreApiResponse, StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import { useInfiniteQuery, useQuery } from "react-query";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";

export default function StoreListPage() {
  // console.log(stores);
  const router = useRouter();
  const { page = "1" }: any = router.query;
  const ref = useRef<HTMLDivElement | null>(null);

  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  console.log(pageRef);
  // const {
  //   isLoading,
  //   isError,
  //   data: stores,
  // } = useQuery(`stores-${page}`, async () => {
  //   const { data } = await axios(`/api/stores?page=${page}`);
  //   return data as StoreApiResponse;
  // });

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/stores?page=` + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });

    return data as StoreApiResponse;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery("stores", fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return <span>다시 시도해주세요</span>;
  }

  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <Fragment key={index}>
              {page?.data?.map((store: StoreType, i) => (
                <li
                  className="flex justify-between gap-x-6 py-5"
                  key={store.id}
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : "/images/markers/default.png"
                      }
                      width={48}
                      height={48}
                      alt={"아이콘 이미지"}
                    />
                    <div>
                      <div className="text-sm font-semibold leading-6 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs truncate font-semibold  leading-5 text-gray-500">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold  leading-5 text-gray-500">
                      {store?.phone || "번호 없음"} | {store?.foodCertifyName} |{" "}
                      {store?.category}
                    </div>
                  </div>
                </li>
              ))}
            </Fragment>
          ))
        )}
      </ul>

      {/* {stores?.totalPage && (
        <Pagination total={stores?.totalPage} page={page} />
      )} */}

      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}

      <div className="w-full touch-none h-10 mb-10" ref={ref}></div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

//   return {
//     props: { stores: stores.data },
//   };
// }
