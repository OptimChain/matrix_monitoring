import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet, Location } from "react-router-dom";
const BottomDash = () => {
  const [cpage, setCpage] = useState("main");
  useEffect(() => {
    if (window.location.pathname == "/" && cpage !== "main") {
      setCpage("main");
    } else if (window.location.pathname == "/pull-requests" && cpage !== "pr") {
      setCpage("pr");
    } else if (window.location.pathname == "/workflows" && cpage !== "wf") {
      setCpage("wf");
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg w-100" style={{ backgroundColor: "white", position: "fixed", bottom: "0" }}>
      <div className="container-fluid">
        <div className="d-flex justify-items-end">
          <Link to="/main" onClick={() => setCpage("main")} className="btn btn-dark me-2 border-1 border-light bg-none" style={{ background: cpage == "main" ? "#0dcaf0" : "" }}>
            Bugs
          </Link>
          <Link to="/pull-requests" onClick={() => setCpage("pr")} className="btn btn-dark border-1 border-light bg-none me-2" style={{ background: cpage == "pr" ? "#0dcaf0" : "" }}>
            Pull Requests
          </Link>
          <Link to="/workflows" onClick={() => setCpage("wf")} className="btn btn-dark border-1 border-light bg-none me-2" style={{ background: cpage == "wf" ? "#0dcaf0" : "" }}>
            Workflows
          </Link>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default BottomDash;
