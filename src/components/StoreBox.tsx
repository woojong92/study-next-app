import { StoreType } from "@/interface";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiMapPin } from "react-icons/hi2";

interface StoreBoxProps {
  store: StoreType | null;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : `/images/markers/default.png`
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>

            <div className="mt-4 flex gap-2 items-center">
              <HiMapPin />
              {store?.address}
            </div>

            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store?.foodCertifyName}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineCheck />
              {store.category}
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.alert("상세보기 작업중")}
            className="w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 font-semibold rounded-b-lg py-3 text-white"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
