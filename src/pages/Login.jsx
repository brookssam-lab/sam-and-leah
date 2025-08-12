import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/home");
    } catch(err){
      setError(err.message);
    }
  };

  return (
    <div className="center">
      <h1 style={{marginBottom:8}}>Sam & Leah</h1>
      <form style={{width:320}} onSubmit={handleSubmit}>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div style={{color:"salmon",marginTop:8}}>{error}</div>}
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}