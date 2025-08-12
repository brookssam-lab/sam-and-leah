import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { auth, db } from "../firebase";
import { doc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";

export default function AdminPage(){
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const uid = auth.currentUser.uid;
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);
      if(snap.exists()) setRole(snap.data().role);
      setLoading(false);
    })();
  },[]);

  useEffect(()=> {
    if(role === 'sam' || role === 'admin'){
      (async()=>{
        const usersSnap = await getDocs(collection(db, "users"));
        setUsers(usersSnap.docs.map(d=>({id:d.id, ...d.data()})));
      })();
    }
  }, [role]);

  if(loading) return <div className="center">Loading...</div>;
  if(!(role === 'sam' || role === 'admin')) return <div className="center">Access denied</div>;

  async function enableAdminForLeah(){
    const leah = users.find(u=>u.displayName && u.displayName.toLowerCase().includes('leah'));
    if(!leah){ alert('Leah user not found'); return; }
    await updateDoc(doc(db,'users',leah.id), { role: 'admin' });
    alert('Leah given admin access');
  }

  return (
    <div>
      <NavBar />
      <div style={{padding:20}}>
        <h2>Admin</h2>
        <p>Role: {role}</p>
        <button className="btn" onClick={enableAdminForLeah}>Enable Leah Admin</button>

        <h3 style={{marginTop:16}}>Collections</h3>
        <p>From here you can implement UIs to view/edit/delete arrays (compliments, meals, events)</p>
      </div>
    </div>
  );
}