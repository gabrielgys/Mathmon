import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sword, Shield, Trophy, RotateCcw, Brain, Zap } from 'lucide-react';
import { Monster, GameState, Question } from './types';
import { MONSTERS } from './constants';
import { generateQuestion } from './lib/questionGenerator';
import { HealthBar } from './components/HealthBar';
import { BattleLog } from './components/BattleLog';
import { QuestionModal } from './components/QuestionModal';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerHp: 100,
    maxPlayerHp: 100,
    currentMonster: null,
    battleLog: ['Welcome to Mathmon! Choose a topic to begin your journey.'],
    isGameOver: false,
    hasWon: false,
    turn: 'player',
  });

  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [showTopicSelect, setShowTopicSelect] = useState(true);

  const startBattle = (monster: Monster) => {
    setGameState({
      ...gameState,
      currentMonster: { ...monster },
      battleLog: [`A wild ${monster.name} appeared!`, `Topic: ${monster.topic}`],
      isGameOver: false,
      hasWon: false,
      playerHp: 100,
      turn: 'player',
    });
    setShowTopicSelect(false);
  };

  const handleAttack = () => {
    if (!gameState.currentMonster || gameState.isGameOver) return;
    
    const difficulty = gameState.currentMonster.difficulty === 'Boss' ? 'Hard' : gameState.currentMonster.difficulty as any;
    const question = generateQuestion(gameState.currentMonster.topic, difficulty);
    setActiveQuestion(question);
  };

  const processTurn = (isCorrect: boolean) => {
    setActiveQuestion(null);
    
    if (isCorrect) {
      const damage = Math.floor(Math.random() * 16) + 25; // 25-40
      const newMonsterHp = Math.max(0, gameState.currentMonster!.currentHp - damage);
      
      setGameState(prev => ({
        ...prev,
        currentMonster: { ...prev.currentMonster!, currentHp: newMonsterHp },
        battleLog: [...prev.battleLog, `Correct! You dealt ${damage} damage to ${prev.currentMonster!.name}!`],
        isGameOver: newMonsterHp === 0,
        hasWon: newMonsterHp === 0,
        turn: 'monster'
      }));

      if (newMonsterHp > 0) {
        setTimeout(() => monsterCounterAttack(), 1000);
      }
    } else {
      setGameState(prev => ({
        ...prev,
        battleLog: [...prev.battleLog, `Wrong answer! Your attack failed.`],
        turn: 'monster'
      }));
      setTimeout(() => monsterCounterAttack(), 1000);
    }
  };

  const monsterCounterAttack = () => {
    const damage = Math.floor(Math.random() * 11) + 15; // 15-25
    const newPlayerHp = Math.max(0, gameState.playerHp - damage);
    
    setGameState(prev => ({
      ...prev,
      playerHp: newPlayerHp,
      battleLog: [...prev.battleLog, `${prev.currentMonster!.name} counter-attacked for ${damage} damage!`],
      isGameOver: newPlayerHp === 0,
      hasWon: false,
      turn: 'player'
    }));
  };

  const resetGame = () => {
    setShowTopicSelect(true);
    setGameState({
      playerHp: 100,
      maxPlayerHp: 100,
      currentMonster: null,
      battleLog: ['Welcome back! Choose your next challenge.'],
      isGameOver: false,
      hasWon: false,
      turn: 'player',
    });
  };

  return (
    <div className="min-h-screen battle-bg flex flex-col items-center justify-center p-4 md:p-8">
      <AnimatePresence mode="wait">
        {showTopicSelect ? (
          <motion.div
            key="topic-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-5xl md:text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4"
              >
                MATHMON
              </motion.h1>
              <p className="text-slate-400 text-lg tracking-widest uppercase font-bold">IGCSE Quest v2.0</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {MONSTERS.map((monster) => (
                <motion.button
                  key={monster.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startBattle(monster)}
                  className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500 p-4 rounded-2xl flex flex-col items-center text-center transition-all group"
                >
                  <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">{monster.emoji}</span>
                  <h3 className="font-display font-bold text-slate-100">{monster.name}</h3>
                  <span className="text-[10px] uppercase font-bold text-slate-500 mt-1">{monster.topic}</span>
                  <div className={`mt-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    monster.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    monster.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    monster.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {monster.difficulty}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="battle-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl space-y-8"
          >
            {/* Battle Header */}
            <div className="flex justify-between items-end gap-8">
              <div className="flex-1">
                <HealthBar 
                  current={gameState.playerHp} 
                  max={gameState.maxPlayerHp} 
                  label="Player" 
                  color="bg-blue-500" 
                />
              </div>
              <div className="flex-1 text-right">
                <HealthBar 
                  current={gameState.currentMonster!.currentHp} 
                  max={gameState.currentMonster!.maxHp} 
                  label={gameState.currentMonster!.name} 
                  color={gameState.currentMonster!.color} 
                />
              </div>
            </div>

            {/* Monster Display */}
            <div className="relative h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl" />
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: gameState.turn === 'monster' ? 1.1 : 1
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  scale: { duration: 0.3 }
                }}
                className="text-9xl relative z-10"
              >
                {gameState.currentMonster!.emoji}
              </motion.div>
              
              {/* Damage Indicators */}
              <AnimatePresence>
                {gameState.battleLog[gameState.battleLog.length - 1]?.includes('damage') && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -50 }}
                    exit={{ opacity: 0 }}
                    className="absolute font-display font-black text-4xl text-red-500 z-20"
                  >
                    -{gameState.battleLog[gameState.battleLog.length - 1].match(/\d+/)?.[0]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Battle Log */}
            <BattleLog logs={gameState.battleLog} />

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={gameState.turn !== 'player' || gameState.isGameOver}
                onClick={handleAttack}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-blue-900/20"
              >
                <Sword size={20} /> ATTACK
              </button>
              <button
                disabled={gameState.isGameOver}
                onClick={() => setShowTopicSelect(true)}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
              >
                <RotateCcw size={20} /> RETREAT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Modal */}
      <AnimatePresence>
        {activeQuestion && (
          <QuestionModal 
            question={activeQuestion} 
            onAnswer={processTurn} 
          />
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {gameState.isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border-4 border-slate-700 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${gameState.hasWon ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {gameState.hasWon ? <Trophy size={40} /> : <RotateCcw size={40} />}
              </div>
              <h2 className="text-3xl font-display font-black mb-2">
                {gameState.hasWon ? 'VICTORY!' : 'DEFEAT...'}
              </h2>
              <p className="text-slate-400 mb-8">
                {gameState.hasWon 
                  ? `You defeated the ${gameState.currentMonster!.name} and mastered ${gameState.currentMonster!.topic}!` 
                  : `The ${gameState.currentMonster!.name} was too strong this time. Keep practicing!`}
              </p>
              <button
                onClick={resetGame}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
              >
                CONTINUE QUEST
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Stats */}
      <div className="fixed bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase tracking-widest pointer-events-none">
        <div className="flex items-center gap-2">
          <Brain size={12} /> IGCSE 0580 CURRICULUM
        </div>
        <div className="flex items-center gap-2">
          <Zap size={12} /> SYSTEM ONLINE
        </div>
      </div>
    </div>
  );
}
