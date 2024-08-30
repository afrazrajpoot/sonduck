import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the Store component with ssr option set to false
const DynamicStore = dynamic(() => import("@/app/components/Store"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DynamicStore />
    </Suspense>
  );
};

export default Page;
