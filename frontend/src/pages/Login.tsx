import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {

	debugger

	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	if (isAuthenticated) {
		return <Navigate to="/resumo" replace />;
	}

	const handleSubmit = (e: React.FormEvent) => {

		e.preventDefault();

		if (login(email, password)) {
			navigate("/resumo");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted">
			<div className="w-full max-w-sm finance-card">
				<div className="text-center mb-8">
					<h1 className="text-xl font-bold"> 💰 Kelvinho's Finances WebApp</h1>
					<p className="text-sm text-muted-foreground mt-1">Controle suas finanças!</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="seu@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)} required />
					</div>
					<div>
						<Label htmlFor="password">Senha</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)} required />
					</div>
					<Button type="submit" className="w-full">Entrar</Button>
				</form>
			</div>
		</div>
	);
}
