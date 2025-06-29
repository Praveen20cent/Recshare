'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  // Typing effect state
  const [displayText, setDisplayText] = useState('');
  const fullText = "Welcome to RecShare";
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cursor trail effects state
  const [leftTrail, setLeftTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [rightTrail, setRightTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [isHoveringParagraph, setIsHoveringParagraph] = useState(false);
  const [sparklingWords, setSparklingWords] = useState<number[]>([]);

  // Sparkling effect for paragraph words
  useEffect(() => {
    const paragraph = "RecShare is a platform where you can share your video recordings with others.";
    const wordCount = paragraph.split(' ').length;
    
    const interval = setInterval(() => {
      setSparklingWords(prev => {
        const lastWord = prev.length > 0 ? prev[prev.length - 1] : -1;
        const nextWord = (lastWord + 1) % wordCount;
        return [...prev.slice(-2), nextWord].filter((word, index, self) => 
          self.indexOf(word) === index
        );
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
    if (currentIndex === fullText.length) {
      const resetTimeout = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex]);

  const handleLeftMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    
    // Calculate position relative to the left aside
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setLeftTrail(prev => {
      const newTrail = [...prev, { x, y }];
      return newTrail.slice(-8);
    });
  }, []);

  const handleRightMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    
    // Calculate position relative to the right aside
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setRightTrail(prev => {
      const newTrail = [...prev, { x, y }];
      return newTrail.slice(-8);
    });
  }, []);

  return (
    <main className="sign-in">
      {/* Left aside with red trail */}
      <aside 
        className="testimonial flex flex-col justify-center items-center text-center h-screen w-1/2 relative overflow-hidden"
        onMouseMove={handleLeftMouseMove}
        onMouseEnter={() => setIsHoveringLeft(true)}
        onMouseLeave={() => {
          setIsHoveringLeft(false);
          setLeftTrail([]);
        }}
      >
        {isHoveringLeft && leftTrail.map((pos, index) => (
          <div
            key={`left-${index}`}
            className="absolute w-3 h-3 bg-red-500 rounded-full pointer-events-none"
            style={{
              left: `${pos.x - 6}px`,
              top: `${pos.y - 6}px`,
              opacity: 0.2 + (index / leftTrail.length) * 0.8,
              transform: `scale(${0.5 + (index / leftTrail.length) * 0.5})`,
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            }}
          />
        ))}

        <Link href="/" className="mb-6 flex items-center space-x-2 z-10">
          <Image src="/assets/icons/logo.svg" alt="RecShare Logo" width={32} height={32} />
          <h1 className="text-xl font-bold">RecShare</h1>
        </Link>

        <div className="description z-10">
          <section>
            <h2 className="text-3xl font-semibold mb-4">
              {displayText}
              <span className="animate-pulse">|</span>
            </h2>
            <p 
              className="max-w-md leading-relaxed"
              onMouseEnter={() => setIsHoveringParagraph(true)}
              onMouseLeave={() => setIsHoveringParagraph(false)}
            >
              {"RecShare is a platform where you can share your video recordings with others."
                .split(' ')
                .map((word, wordIndex) => (
                  <span 
                    key={wordIndex} 
                    className="inline-block mr-2 whitespace-nowrap relative"
                  >
                    {word.split('').map((char, charIndex) => (
                      <span
                        key={`${wordIndex}-${charIndex}`}
                        className="inline-block transition-all duration-300 ease-out"
                        style={{
                          transform: isHoveringParagraph ? 'translateY(-4px)' : 'translateY(0)',
                          transitionDelay: `${wordIndex * 30 + charIndex * 10}ms`,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                    {sparklingWords.includes(wordIndex) && (
                      <>
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
                      </>
                    )}
                  </span>
                ))}
            </p>
          </section>
        </div>
        <p className="z-10">© RecShare {new Date().getFullYear()}</p>
      </aside>

      {/* Right aside with pink trail */}
      <aside 
        className="google-sign-in relative"
        onMouseMove={handleRightMouseMove}
        onMouseEnter={() => setIsHoveringRight(true)}
        onMouseLeave={() => {
          setIsHoveringRight(false);
          setRightTrail([]);
        }}
      >
        {isHoveringRight && rightTrail.map((pos, index) => (
          <div
            key={`right-${index}`}
            className="absolute w-3 h-3 bg-pink-500 rounded-full pointer-events-none"
            style={{
              left: `${pos.x - 6}px`,
              top: `${pos.y - 6}px`,
              opacity: 0.2 + (index / rightTrail.length) * 0.8,
              transform: `scale(${0.5 + (index / rightTrail.length) * 0.5})`,
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            }}
          />
        ))}
        <section>
          <Link href="/">
            <Image src="/assets/icons/logo.svg" alt="logo" width={40} height={40} />
            <h1>RecShare</h1>      
          </Link>
          <p>Create your first <span>video</span> in <span>RecShare</span></p>
          <button>
            <Image src="/assets/icons/google.svg" alt="google" width={22} height={22} />
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay"/>
    </main>
  );
};

export default Page;