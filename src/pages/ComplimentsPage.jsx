import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function ComplimentsPage(){
  const [view, setView] = useState("menu");
  const [text,setText] = useState("");
  const [target,setTarget] = useState("sam");

  async function give(){
    const ref = doc(db, "compliments", target);
    const snap = await getDoc(ref);
    const item = { text, date: new Date().toISOString() };
    if(snap.exists()){
      await updateDoc(ref, { array: arrayUnion(item) });
    } else {
      await setDoc(ref, { array: [item], archive: [] });
    }
    setText("");
    alert("Saved");
  }

  async function receive(){
    const ref = doc(db, "compliments", target);
    const snap = await getDoc(ref);
    if(!snap.exists()){ alert("No compliments"); return; }
    const arr = snap.data().array || [];
    if(arr.length === 0){ alert("No available compliments. Check archive."); return; }
    const randIndex = Math.floor(Math.random()*arr.length);
    const comp = arr[randIndex];
    await updateDoc(ref, {
      array: arrayRemove(comp),
      archive: arrayUnion(comp)
    });
    alert(comp.text);
  }

  return (
    <div>
      <NavBar />
      <div style={{padding:20}}>
        <h2>Compliments</h2>
        <div>
          <button className="btn" onClick={()=>setView('give')}>GIVE</button>
          <button className="btn" onClick={()=>setView('receive')}>RECEIVE</button>
        </div>

        {view==='give' && (
          <div style={{marginTop:12, maxWidth:600}}>
            <select value={target} onChange={e=>setTarget(e.target.value)} className="input">
              <option value="sam">Sam</option>
              <option value="leah">Leah</option>
            </select>
            <textarea className="input" rows={4} value={text} onChange={e=>setText(e.target.value)} />
            <button className="btn" onClick={give}>Save</button>
          </div>
        )}

        {view==='receive' && (
          <div style={{marginTop:12}}>
            <select value={target} onChange={e=>setTarget(e.target.value)} className="input">
              <option value="sam">Sam</option>
              <option value="leah">Leah</option>
            </select>
            <button className="btn" onClick={receive}>Get a compliment</button>
            <div style={{marginTop:12}}>
              <button className="btn" onClick={()=>alert("Open History - implement view to show last 25")}>HISTORY</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}