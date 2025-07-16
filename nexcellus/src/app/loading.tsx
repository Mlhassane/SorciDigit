import { SplinePointerIcon } from "lucide-react";


const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SplinePointerIcon className="animate-spin size-8 text-black dark:text-white" />
    </div>
  );
};

export default loading;
