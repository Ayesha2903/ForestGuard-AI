import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import ForestBackdrop from "../components/ForestBackdrop";

export default function Login() {
  const nav = useNavigate();
  return (
    <div id="login">
      <ForestBackdrop />
      <div className="lov" />
      <div className="lw">
        <div className="wm"><Logo />FORESTGUARD AI</div>
        <div>
          <h1>Intelligent Forest Monitoring &amp; Protection</h1>
          <p>AI-powered forest intelligence for detecting potential forest change, monitoring environmental conditions, and supporting field verification.</p>
        </div>
        <div className="fi"><span>MONITOR FORESTS</span><span>AI ANALYSIS</span><span>DETECT POTENTIAL CHANGE</span><span>FIELD VERIFICATION</span></div>
      </div>
      <div className="lc">
        <h2>Welcome Back</h2>
        <div className="sub">Sign in to access ForestGuard AI</div>
        <label>Email</label>
        <input type="email" defaultValue="officer@forestguard.demo" />
        <label>Password</label>
        <input type="password" defaultValue="password" />
        <div className="row" style={{ justifyContent: "space-between", margin: "12px 0" }}>
          <label style={{ margin: 0 }}><input type="checkbox" /> Remember me</label>
          <Link className="sub" to="/login">Forgot password?</Link>
        </div>
        <button style={{ width: "100%" }} onClick={() => nav("/dashboard")}>Sign In</button>
      </div>
    </div>
  );
}
