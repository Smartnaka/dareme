import React, { useState } from 'react';

interface PlayerSetupScreenProps {
  players: string[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (index: number) => void;
  onStartGame: () => void;
}

const PlayerSetupScreen: React.FC<PlayerSetupScreenProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
}) => {
  const [name, setName] = useState('');

  const handleAddClick = () => {
    onAddPlayer(name);
    setName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <div className="w-full max-w-md h-full flex flex-col items-center justify-center text-center p-4 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
          Add Players
        </h1>
        <p className="text-gray-400 mt-2">Who's playing today?</p>
      </header>

      <main className="w-full flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter player name"
            className="flex-grow bg-gray-800 border-2 border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleAddClick}
            disabled={!name.trim()}
            className="px-6 py-3 font-bold rounded-lg bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>

        <div className="w-full bg-gray-900/50 rounded-lg p-4 min-h-[12rem] max-h-64 overflow-y-auto">
          {players.length === 0 ? (
            <p className="text-gray-500">No players added yet.</p>
          ) : (
            <ul className="space-y-2">
              {players.map((player, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-800 rounded-md p-2 animate-fade-in">
                  <span className="font-semibold">{player}</span>
                  <button onClick={() => onRemovePlayer(index)} className="text-red-500 hover:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={onStartGame}
          disabled={players.length < 2}
          className="w-full py-4 text-xl font-bold rounded-lg bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/30 disabled:bg-gray-700 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
        >
          {players.length < 2 ? 'Need at least 2 players' : 'Start Game'}
        </button>
      </main>
    </div>
  );
};

export default PlayerSetupScreen;
