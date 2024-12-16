import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/profile"); // Перенаправление на страницу логина
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
