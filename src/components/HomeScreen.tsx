import React from 'react';
import { Category } from '../types';

interface HomeScreenProps {
  onSelectCategory: (category: Category) => void;
  onBackToSetup: () => void;
  currentPlayerName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCategory, onBackToSetup, currentPlayerName }) => {
  return (
    <div className="w-full max-w-md h-full flex flex-col items-center justify-between text-center p-4 animate-fade-in">
      <header className="mt-8">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
          DareDeck
        </h1>
         <p className="text-gray-300 mt-4 text-xl">
          It's <span className="font-bold text-white">{currentPlayerName}'s</span> turn to choose!
        </p>
      </header>

      <main className="w-full flex flex-col space-y-6 my-auto">
        <button
          onClick={() => onSelectCategory(Category.Truth)}
          className="w-full py-12 md:py-16 text-3xl md:text-4xl font-bold rounded-2xl bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/30"
        >
          TRUTH
        </button>
        <button
          onClick={() => onSelectCategory(Category.Dare)}
          className="w-full py-12 md:py-16 text-3xl md:text-4xl font-bold rounded-2xl bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/30"
        >
          DARE
        </button>
      </main>
      
      <footer className="w-full mb-4">
        <button 
          onClick={onBackToSetup}
          className="text-gray-400 hover:text-white transition-colors"
        >
          New Game
        </button>
      </footer>
    </div>
  );
};

export default HomeScreen;