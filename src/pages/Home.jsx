import React from "react";
import NavBar from "../components/NavBar";
import RandomPhoto from "../components/RandomPhoto";
import { format } from "date-fns";

export default function Home(){
  const today = new Date();
  return (
    <div className="app-shell">
      <NavBar/>
      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div className="center">
          <div style={{fontSize:18, marginBottom:8}}>{format(today, "EEEE, d LLLL yyyy")}</div>
          <RandomPhoto />
        </div>
      </div>
    </div>
  );
}