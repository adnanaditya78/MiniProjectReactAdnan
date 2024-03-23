import { useEffect, useState } from "react";
import Container from "./Container";

export default function Layout({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLogin(true);
  }, []);

  return (
    <div className="min-h-[100vh] bg-gray-100">
      <div className="bg-white border-b border-gray-300 py-3 fixed top-0 w-full">
        <Container className="flex items-center justify-between">
          <p className="font-bold text-lg">ReqRes</p>
          {isLogin && (
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}
        </Container>
      </div>
      <div className="min-h-[95vh] pt-[110px] pb-[20px]">{children}</div>
      <div className="text-center p-4 bg-gray-100">
        <Container>
          <p className="text-gray-400">
            Copyright Mohammad Adnan Aditya Rachmadi {year}
          </p>
        </Container>
      </div>
    </div>
  );
}
