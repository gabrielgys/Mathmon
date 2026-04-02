import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { X } from 'lucide-react';

interface QuestionModalProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ question, onAnswer }) => {
  const [input, setInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered) return;

    const isCorrect = input.trim().toLowerCase() === question.answer.toLowerCase();
    setIsAnswered(true);
    setShowExplanation(true);
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-slate-900 border-4 border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
        
        <div className="flex justify-between items-center mb-6">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest">
            {question.topic} • {question.difficulty}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-8 leading-tight text-slate-100">
          {question.text}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAnswered}
            placeholder="Type your answer here..."
            className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isAnswered}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            SUBMIT ATTACK
          </button>
        </form>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700"
            >
              <p className={`font-bold mb-2 ${input.trim().toLowerCase() === question.answer.toLowerCase() ? 'text-green-400' : 'text-red-400'}`}>
                {input.trim().toLowerCase() === question.answer.toLowerCase() ? 'CRITICAL HIT!' : 'ATTACK MISSED!'}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="font-bold text-slate-200">Explanation:</span> {question.explanation}
              </p>
              <p className="mt-2 text-xs text-blue-400 font-mono">Next turn in 3 seconds...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
