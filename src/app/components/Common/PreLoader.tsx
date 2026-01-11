import React from "react";

const PreLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-secondary/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary/30 border-t-transparent"></div>
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-solid border-transparent border-t-primary" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <p className="text-sm font-medium text-deep/70">Loading...</p>
      </div>
    </div>
  );
};

export default PreLoader;