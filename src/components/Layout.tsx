import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV } from "../data";
import { useApp } from "../context";
import Logo from "./Logo";

export default function Layout() {
  const { role, setRole } = useApp();
  const [open, setOpen] = useState(false);
  const seg = useLocation().pathname.split("/")[1];
  const title = NAV.find((n) => n[0] === seg)?.[1] ?? "Dashboard";
  return (
    <div id="app">
      <aside className={open ? "open" : ""}>
        <div className="logo" style={{ display: "flex", alignItems: "center", gap: 8 }}><Logo size={20} /> FORESTGUARD AI</div>
        {NAV.filter((n) => role === "Admin" || n[0] !== "officers").map(([to, label]) => (
          <NavLink key={to} to={`/${to}`} className={({ isActive }) => (isActive ? "on" : "")} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
        <NavLink to="/login">Sign out</NavLink>
      </aside>
      <main>
        <div className="top">
          <button id="menu" className="s" onClick={() => setOpen(!open)}>☰</button>
          <h1>{title}</h1>
          <input placeholder="Search" />
          <span className="demo">DEMO DATA</span>
          <button className="s" onClick={() => setRole(role === "Admin" ? "Officer" : "Admin")}>Role: {role} ⇄</button>
          <span className="pill">🔔 3</span>
        </div>
        <div className="pg"><Outlet /></div>
      </main>
    </div>
  );
}
