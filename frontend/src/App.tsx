import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Login from "@/modules/auth/pages/Login";
import AppLayout from "@/shared/components/AppLayout";
import Resumo from "@/modules/overview/pages/Resumo";
import AccountsPayable from "@/modules/finances/accountsPayable/pages/AccountsPayable";
import AccountsReceivable from "@/modules/finances/accountsReceivable/pages/AccountsReceivable";
import NotFound from "@/shared/pages/NotFound";

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
              <Route path="/accounts-payable" element={<AccountsPayable />} />
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
