import { useEffect, useState } from 'react';

export default function Component() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 500); 
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center justify-center space-x-4">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-6 h-6 border-2 border-green-500 rounded-full animate-pulse delay-200 flex items-center justify-center"
        >
          {activeIndex === index && (
            <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
}
