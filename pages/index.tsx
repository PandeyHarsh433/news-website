import { useRouter } from "next/router";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/headLines");
  }, []);

  return <div>Hello</div>;
};

export default page;
