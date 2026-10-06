import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
export type Role = "Admin" | "Officer";
interface Ctx { role: Role; setRole: (r: Role) => void; toast: (m: string) => void }
const AppCtx = createContext<Ctx>({ role: "Admin", setRole: () => {}, toast: () => {} });
export const useApp = () => useContext(AppCtx);
export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Admin");
  const [msg, setMsg] = useState("");
  const toast = useCallback((m: string) => { setMsg(m + " (UI demo only)"); setTimeout(() => setMsg(""), 2200); }, []);
  return (
    <AppCtx.Provider value={{ role, setRole, toast }}>
      {children}
      <div id="toast" style={{ display: msg ? "block" : "none" }}>{msg}</div>
    </AppCtx.Provider>
  );
}
