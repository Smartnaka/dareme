import React, { useState, useEffect, useCallback } from 'react';
import { Category } from '../types';
import { TRUTHS, DARES } from '../constants';

interface PromptScreenProps {
  category: Category;
  onBack: () => void;
  onNext: () => void;
  currentPlayerName: string;
}

const DARE_TIMER_DURATION = 30; // 30 seconds

const PromptScreen: React.FC<PromptScreenProps> = ({ category, onBack, onNext, currentPlayerName }) => {
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const getNewPrompt = useCallback(() => {
    const prompts = category === Category.Truth ? TRUTHS : DARES;
    setCurrentPrompt(prevPrompt => {
        let newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        if (prompts.length > 1) {
            while (newPrompt === prevPrompt) {
                newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
            }
        }
        return newPrompt;
    });

    if (category === Category.Dare) {
      setTimeLeft(DARE_TIMER_DURATION);
    } else {
      setTimeLeft(null);
    }
  }, [category]);

  useEffect(() => {
    getNewPrompt();
  }, [getNewPrompt, category]); // Rerun when category changes

  useEffect(() => {
    if (category !== Category.Dare || timeLeft === null || timeLeft === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => (prevTime ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, category]);

  const handleShare = async () => {
    if (!currentPrompt) return;

    const shareData = {
      title: `DareDeck: ${category}`,
      text: currentPrompt,
    };

    if (!navigator.share) {
      alert('Web Share is not supported on this browser. Use the copy button instead.');
      return;
    }
    
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Web Share API error:', err);
      }
    }
  };

  const handleCopy = async () => {
    if (!currentPrompt) return;
    if (!navigator.clipboard) {
      alert('Clipboard API is not available on this browser.');
      return;
    }

    try {
      await navigator.clipboard.writeText(currentPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Could not copy prompt to clipboard.');
    }
  };


  const isTruth = category === Category.Truth;
  const cardBgColor = isTruth ? 'bg-cyan-900/50 border-cyan-500' : 'bg-pink-900/50 border-pink-500';
  const categoryTextColor = isTruth ? 'text-cyan-400' : 'text-pink-400';
  const buttonBgColor = isTruth ? 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-300 shadow-cyan-500/30' : 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-300 shadow-pink-500/30';
  const iconButtonBgColor = 'bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 shadow-gray-700/30';

  return (
    <div className="w-full max-w-lg h-full flex flex-col items-center justify-between p-4 relative animate-fade-in">
      <button onClick={onBack} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors z-10" aria-label="Go back">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className={`w-full aspect-[3/4] flex flex-col p-8 rounded-3xl border-2 shadow-2xl ${cardBgColor} backdrop-blur-sm mt-16 md:mt-8`}>
        <div className="flex-shrink-0 text-center mb-4">
          <p className="text-gray-300 text-sm">{currentPlayerName}'s Turn</p>
          <h2 className={`text-2xl font-bold uppercase tracking-widest ${categoryTextColor}`}>
            {category}
          </h2>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center overflow-y-auto w-full">
          {category === Category.Dare && timeLeft !== null && (
            <div className={`mb-4 text-center transition-opacity duration-300 ${timeLeft > 0 ? 'opacity-100' : 'opacity-50'}`}>
              <p className="text-5xl md:text-6xl font-mono text-white tracking-widest">
                {String(timeLeft % 60).padStart(2, '0')}
              </p>
            </div>
          )}
          <p className="text-3xl md:text-4xl text-center font-semibold leading-relaxed">
            {currentPrompt}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4 mt-8 mb-4">
        <button
          onClick={onNext}
          className={`w-full py-4 text-xl font-bold rounded-full ${buttonBgColor} transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg`}
        >
          NEXT TURN
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className={`p-4 rounded-full ${iconButtonBgColor} transform hover:scale-105 transition-all duration-300 shadow-lg`}
            aria-label="Share prompt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          <button
            onClick={handleCopy}
            className={`p-4 rounded-full ${iconButtonBgColor} transform hover:scale-105 transition-all duration-300 shadow-lg`}
            aria-label="Copy prompt to clipboard"
          >
            {isCopied ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptScreen;
