import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import PromptScreen from './components/PromptScreen';
import PlayerSetupScreen from './components/PlayerSetupScreen';
import { Category } from './types';

type GameState = 'setup' | 'selection' | 'prompt';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleAddPlayer = (name: string) => {
    if (name.trim()) {
      setPlayers(prev => [...prev, name.trim()]);
    }
  };

  const handleRemovePlayer = (indexToRemove: number) => {
    setPlayers(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      setCurrentPlayerIndex(0);
      setGameState('selection');
    }
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    setPlayers([]);
    setCurrentCategory(null);
  };

  const handleSelectCategory = (category: Category) => {
    setCurrentCategory(category);
    setGameState('prompt');
  };

  const handleBackToSelection = () => {
    setCurrentCategory(null);
    setGameState('selection');
  };
  
  const handleNextTurn = () => {
    setCurrentPlayerIndex(prevIndex => (prevIndex + 1) % players.length);
    setCurrentCategory(null);
    setGameState('selection');
  };

  const renderScreen = () => {
    switch (gameState) {
      case 'setup':
        return (
          <PlayerSetupScreen
            players={players}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onStartGame={handleStartGame}
          />
        );
      case 'selection':
        return (
          <HomeScreen
            onSelectCategory={handleSelectCategory}
            onBackToSetup={handleBackToSetup}
            currentPlayerName={players[currentPlayerIndex]}
          />
        );
      case 'prompt':
        if (currentCategory) {
          return (
            <PromptScreen
              category={currentCategory}
              onBack={handleBackToSelection}
              onNext={handleNextTurn}
              currentPlayerName={players[currentPlayerIndex]}
            />
          );
        }
        return null; // Should not happen
      default:
        return (
          <PlayerSetupScreen
            players={players}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onStartGame={handleStartGame}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      {renderScreen()}
    </div>
  );
};

export default App;
