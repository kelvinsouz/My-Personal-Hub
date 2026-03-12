import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
