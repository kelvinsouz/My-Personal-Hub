import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Resumo from "./pages/Resumo";
import ContasPagar from "./pages/ContasPagar";
import AccountsReceivable from "./pages/AccountsReceivable";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/resumo" replace />} />
            <Route element={<AppLayout />}>
              <Route path="/resumo" element={<Resumo />} />
              <Route path="/contas-a-pagar" element={<ContasPagar />} />
              <Route path="/accounts-receivable" element={<AccountsReceivable />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
