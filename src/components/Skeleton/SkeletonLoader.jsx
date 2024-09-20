const SkeletonLoader = () => {
  return (
    <div className="flex justify-between items-start mb-2 bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-md animate-pulse">
      <div className="w-[90%] lg:w-[80%]">
        <div className="h-6 bg-gray-300 rounded-lg mb-2 w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded-lg w-full"></div>
      </div>
      <div className="w-[20%] flex justify-end gap-4 items-center">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
export default SkeletonLoader;
