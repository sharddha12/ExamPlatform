"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("admin", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
