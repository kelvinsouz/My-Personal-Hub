import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, LogOut } from "lucide-react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/resumo", label: "Resumo", icon: LayoutDashboard },
  { to: "/contas-a-pagar", label: "Contas a pagar", icon: ArrowDownCircle },
  { to: "/accounts-receivable", label: "Contas a receber", icon: ArrowUpCircle },
];

export default function AppSidebar() {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col bg-sidebar border-r border-sidebar-border z-50">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-primary-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          My Personal Hub
        </h1>
        {user && (
          <p className="text-xs mt-1 text-sidebar-foreground/60 truncate">{user.email}</p>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <RouterNavLink
            key={link.to}
            to={link.to}
            className={() =>
              `sidebar-link ${location.pathname === link.to ? "active" : ""}`
            }
          >
            <link.icon className="h-5 w-5 shrink-0" />
            <span>{link.label}</span>
          </RouterNavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button onClick={logout} className="sidebar-link w-full hover:text-destructive">
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
