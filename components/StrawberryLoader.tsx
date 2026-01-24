// File: src/components/ui/StrawberryLoader.tsx
"use client";

import React from "react";

interface StrawberryLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function StrawberryLoader({ size = "md", text }: StrawberryLoaderProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Strawberry Container */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Strawberry Body */}
        <div className="absolute inset-0">
          {/* Main strawberry shape */}
          <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
          
          {/* Leaf crown */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-1">
              <div className="w-2 h-4 bg-green-500 rounded-full transform rotate-12 animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-2 h-5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-4 bg-green-500 rounded-full transform -rotate-12 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
          
          {/* Seeds */}
          <div className="absolute inset-0">
            {/* Seed positions */}
            {[
              { top: "30%", left: "30%", delay: "0s" },
              { top: "40%", left: "60%", delay: "0.2s" },
              { top: "60%", left: "40%", delay: "0.4s" },
              { top: "50%", left: "20%", delay: "0.6s" },
              { top: "70%", left: "70%", delay: "0.8s" },
            ].map((seed, index) => (
              <div
                key={index}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-ping"
                style={{
                  top: seed.top,
                  left: seed.left,
                  animationDelay: seed.delay,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
      </div>
      
      {/* Loading text */}
      {text && (
        <p className={`text-text dark:text-dark-text ${textSizes[size]} font-medium animate-pulse`}>
          {text}
        </p>
      )}
      
      {/* Optional dots animation */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// Simple version (minimalist)
export function SimpleStrawberryLoader() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-0.5">
          <div className="w-1.5 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-1.5 h-4 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-1.5 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
}

// Full page loader
export function FullPageStrawberryLoader() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center">
      <div className="text-center">
        <StrawberryLoader size="lg" text="Loading your berry good experience..." />
        <p className="mt-4 text-text/70 dark:text-dark-text/70 text-sm">
          Please wait while we prepare everything
        </p>
      </div>
    </div>
  );
}