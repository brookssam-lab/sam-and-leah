import React from "react";

export default function RandomPhoto(){
  const images = [
    '/assets/random-photos/photo1.png',
    '/assets/random-photos/photo2.png',
    '/assets/random-photos/photo3.png'
  ];
  const idx = Math.floor(Math.random()*images.length);
  const img = images[idx];
  return (
    <a href={img} target="_blank" rel="noreferrer">
      <img src={img} alt="random" style={{maxWidth:320, borderRadius:12, marginTop:12}} />
    </a>
  );
}