import React from "react";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

function useCountdown(sinceDate){
  const [diff, setDiff] = useState({});
  useEffect(()=>{
    function tick(){
      const now = new Date();
      const then = new Date(sinceDate);
      let delta = Math.max(0, Math.floor((now - then)/1000));
      const days = Math.floor(delta / (24*3600)); delta -= days*24*3600;
      const hours = Math.floor(delta / 3600); delta -= hours*3600;
      const minutes = Math.floor(delta / 60); delta -= minutes*60;
      const seconds = delta;
      setDiff({ days, hours, minutes, seconds });
    }
    tick();
    const id = setInterval(tick, 1000);
    return ()=>clearInterval(id);
  }, [sinceDate]);
  return diff;
}

export default function LengthOfService(){
  const s1 = useCountdown('2025-07-02T00:00:00');
  const s2 = useCountdown('2025-07-17T00:00:00');
  return (
    <div>
      <NavBar/>
      <div className="center">
        <div style={{fontSize:22, marginBottom:6}}>{s1.days}d {s1.hours}h {s1.minutes}m {s1.seconds}s</div>
        <div>since we met</div>

        <div style={{height:24}} />

        <div style={{fontSize:22, marginBottom:6}}>{s2.days}d {s2.hours}h {s2.minutes}m {s2.seconds}s</div>
        <div>of being together</div>
      </div>
    </div>
  );
}