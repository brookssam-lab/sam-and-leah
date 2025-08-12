import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function FoodPage(){
  const [title,setTitle] = useState("");
  const [instructions,setInstructions] = useState("");
  const [search,setSearch] = useState("");
  const [results,setResults] = useState([]);

  async function addMeal(){
    if(!title) return alert("Add title");
    await addDoc(collection(db, "meals"), {
      title,
      instructions,
      createdAt: new Date().toISOString()
    });
    setTitle(""); setInstructions("");
    alert("Meal added");
  }

  async function searchMeal(){
    const q = collection(db, "meals");
    const snap = await getDocs(q);
    const found = snap.docs.map(d=> ({ id:d.id, ...d.data() })).filter(m=>m.title.toLowerCase().includes(search.toLowerCase()));
    setResults(found);
  }

  async function lucky(){
    const q = collection(db, "meals");
    const snap = await getDocs(q);
    const arr = snap.docs.map(d=>({ id:d.id, ...d.data() }));
    if(arr.length===0) return alert("no meals");
    const r = arr[Math.floor(Math.random()*arr.length)];
    alert(`I'm Feeling Lucky: ${r.title}\n\n${r.instructions}`);
  }

  return (
    <div>
      <NavBar/>
      <div style={{padding:20}}>
        <h2>Food</h2>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div>
            <h3>Add a meal</h3>
            <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="input" rows={6} placeholder="Ingredients / instructions" value={instructions} onChange={e=>setInstructions(e.target.value)} />
            <button className="btn" onClick={addMeal}>Submit</button>
          </div>

          <div>
            <h3>Search a meal</h3>
            <input className="input" placeholder="Search by title" value={search} onChange={e=>setSearch(e.target.value)} />
            <button className="btn" onClick={searchMeal}>Search</button>
            <div style={{marginTop:8}}>
              {results.map(r=>(
                <div key={r.id} style={{padding:8, borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                  <strong>{r.title}</strong>
                  <div style={{fontSize:13}}>{r.instructions}</div>
                </div>
              ))}
            </div>

            <div style={{marginTop:12}}>
              <h3>I'm Feeling Lucky</h3>
              <button className="btn" onClick={lucky}>I'm Feeling Lucky</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}