import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function NavBar(){
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  async function logout(){
    await signOut(auth);
    nav("/");
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <button className="burger" onClick={()=>setOpen(!open)}>☰</button>
        </div>
        <div className="brand">Sam & Leah</div>
        <div style={{width:40}}></div>
      </div>

      {open && (
        <div className="menu-panel">
          <Link to="/calendar"><button>Calendar</button></Link>
          <Link to="/compliments"><button>Compliments</button></Link>
          <Link to="/length-of-service"><button>Length of Service</button></Link>
          <Link to="/food"><button>Food</button></Link>
          <Link to="/admin"><button>Admin</button></Link>
          <hr />
          <button onClick={logout}>Log out</button>
        </div>
      )}
    </div>
  );
}