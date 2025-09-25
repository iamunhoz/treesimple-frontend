"use client"

import { useState } from "react";

export function Phrase() {
  const [phraseTop, setPhraseTop] = useState(50);
  const [phraseLeft, setPhraseLeft] = useState(50);
 const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
      // Calculate offset from top-left corner of the dragged element
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';    
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    setPhraseTop(y);
    setPhraseLeft(x);
    
    console.log('Drop coordinates:', { x, y });
  };

  return (
    <div className="h-[80svh] w-[90svw] relative border rounded-2xl m-8 p-8">
      {/* Draggable element */}
      <div 
        className="border-2 absolute rounded-2xl p-2 z-10 flex w-fit cursor-move bg-blue-100"
        style={{
          top: `${phraseTop}px`,
          left: `${phraseLeft}px`
        }}
        draggable={true}
        onDragStart={handleDragStart}
      >
        Phrase Phrase
      </div>
      
      {/* Drop zone - covers the entire container */}
      <div 
        className="absolute inset-0 border-2 border-dashed border-gray-400 rounded-2xl bg-gray-50 bg-opacity-30"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="p-4 text-gray-600">
          Drop anywhere to position the phrase
        </div>
      </div>
    </div>
  );
}
