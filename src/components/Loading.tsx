export default function Loading() {
  return (
    <>
      <div className="w-full h-20 animate-pulse bg-gray-100 rounded-md"></div>
      {[...Array(10)].map((e, i) => (
        <div
          key={i}
          className="w-full h-20 animate-pulse bg-gray-100 rounded-md mt-2"
        ></div>
      ))}
    </>
  );
}
