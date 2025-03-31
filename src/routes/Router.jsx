import Chat from "@/Pages/Chat";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Chat />,
    },
  ]);

  return (
    <Suspense
      fallback={
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          loading
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}
