import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  Volume2, 
  CheckCircle2, 
  AlertCircle,
  Search,
  FileText,
  Fingerprint,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';
import { MYSTERY_DATA, Level, MatchingPair, SentenceChallenge } from './verbData';

interface GameSessionProps {
  level: Level;
  onClose: () => void;
  lives: number;
  setLives: (l: number) => void;
}

export default function GameSession({ level, onClose, lives, setLives }: GameSessionProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [matchingPairs, setMatchingPairs] = useState<MatchingPair[]>([]);
  const [shuffledLeft, setShuffledLeft] = useState<MatchingPair[]>([]);
  const [shuffledRight, setShuffledRight] = useState<MatchingPair[]>([]);
  const [sentenceChallenges, setSentenceChallenges] = useState<SentenceChallenge[]>([]);

  useEffect(() => {
    if (level.type === 'matching') {
      const base = [...MYSTERY_DATA.matching];
      setMatchingPairs(base);
      setShuffledLeft([...base].sort(() => Math.random() - 0.5));
      setShuffledRight([...base].sort(() => Math.random() - 0.5));
    } else if (level.type === 'test') {
      const shuffled = [...MYSTERY_DATA.sentences].sort(() => Math.random() - 0.5);
      setSentenceChallenges(shuffled);
    }
  }, [level.type]);

  const progress = level.type === 'matching' 
    ? (matches.length / matchingPairs.length) * 100 
    : ((currentSentenceIdx) / sentenceChallenges.length) * 100;

  // Matching Logic
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const pair = matchingPairs.find(p => p.original === selectedLeft);
      if (pair && (pair.translation === selectedRight || pair.original === selectedLeft && MYSTERY_DATA.matching.find(m => m.original === selectedLeft && m.translation === selectedRight))) {
        setMatches(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
        if (matches.length + 1 === matchingPairs.length) {
          setTimeout(() => setFeedback('correct'), 500);
        }
      } else {
        setWrongMatch(true);
        setTimeout(() => {
          setWrongMatch(false);
          setSelectedLeft(null);
          setSelectedRight(null);
          if (lives > 0) setLives(lives - 1);
        }, 1000);
      }
    }
  }, [selectedLeft, selectedRight, matchingPairs, matches, lives, setLives]);

  const handleSentenceAnswer = (ans: string) => {
    if (feedback) return;
    const isCorrect = ans === sentenceChallenges[currentSentenceIdx].answer;
    if (isCorrect) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      if (lives > 0) setLives(lives - 1);
    }
  };

  const nextAction = () => {
    if (level.type === 'test') {
      if (currentSentenceIdx + 1 < sentenceChallenges.length) {
        setCurrentSentenceIdx(prev => prev + 1);
        setFeedback(null);
      } else {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0c] z-[100] flex flex-col pt-safe overflow-hidden font-sans">
      {/* Investigation Backdrop */}
      <div className="absolute inset-x-0 top-0 h-[35vh] bg-[#1a1a2e] flex items-center justify-center overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
         <div className="relative flex flex-col items-center">
            <motion.div 
               animate={{ 
                 scale: [1, 1.05, 1],
                 rotate: [0, 2, -2, 0]
               }}
               transition={{ duration: 5, repeat: Infinity }}
               className="w-32 h-32 text-indigo-400 opacity-20"
            >
               <Fingerprint size={128} />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: feedback === 'correct' ? 1 : 0 }}
                 className="text-emerald-400"
               >
                 <Unlock size={80} strokeWidth={3} />
               </motion.div>
            </div>
         </div>
      </div>
      
      {/* Header Sticky */}
      <div className="sticky top-0 z-[60] bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4 p-4">
          <button onClick={onClose} className="p-2 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-colors">
            <X size={24} />
          </button>
          <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
            <Heart className="text-rose-500 fill-rose-500" size={18} />
            <span className="text-white font-black text-lg">{lives}</span>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 flex flex-col p-6 w-full max-w-xl mx-auto overflow-y-auto pb-48 relative z-10 scrollbar-hide">
        {level.type === 'matching' ? (
          <div className="space-y-8 py-4">
            <h2 className="text-white text-center font-black text-xl italic tracking-tight drop-shadow-xl underline decoration-indigo-500/50 decoration-4 underline-offset-8">
               Համապատասխանեցրու ապացույցները
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                {shuffledLeft.map((pair) => (
                  <button
                    key={pair.id}
                    disabled={matches.includes(pair.original)}
                    onClick={() => setSelectedLeft(pair.original)}
                    className={`w-full p-5 rounded-[2rem] border-b-4 font-black transition-all flex items-center gap-3 min-h-[4.5rem] text-sm sm:text-base ${
                      matches.includes(pair.original) 
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 opacity-40 scale-95 shadow-none' 
                        : selectedLeft === pair.original
                          ? (wrongMatch ? 'bg-rose-500 border-rose-700 text-white animate-shake' : 'bg-indigo-500 border-indigo-700 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] -translate-y-1')
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Search size={16} className={matches.includes(pair.original) ? 'opacity-0' : 'text-slate-500'} />
                    {pair.original}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                 {shuffledRight.map((pair) => {
                   const matchedPair = matchingPairs.find(m => m.translation === pair.translation && matches.includes(m.original));
                   const isMatched = !!matchedPair;
                   return (
                    <button
                      key={`trans-${pair.id}`}
                      disabled={isMatched}
                      onClick={() => setSelectedRight(pair.translation)}
                      className={`w-full p-5 rounded-[2rem] border-b-4 font-black transition-all min-h-[4.5rem] text-sm sm:text-base ${
                        isMatched 
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 opacity-40 scale-95 shadow-none' 
                          : selectedRight === pair.translation
                            ? (wrongMatch ? 'bg-rose-500 border-rose-700 text-white animate-shake' : 'bg-indigo-500 border-indigo-700 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] -translate-y-1')
                            : 'bg-white/10 border-white/5 text-white hover:bg-white/15'
                      }`}
                    >
                      {pair.translation}
                    </button>
                   );
                 })}
              </div>
            </div>
          </div>
        ) : (
          /* Sentence Challenge */
          sentenceChallenges[currentSentenceIdx] && (
            <div className="flex-1 flex flex-col gap-8 py-4">
              <h2 className="text-white text-center font-black text-xl tracking-tight italic opacity-60">Գաղտնի Գործի Լրացում</h2>
              
              <div className="space-y-6">
                 <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3.5rem] shadow-2xl border-2 border-white/10 text-center space-y-6">
                    <div className="flex justify-center -mt-16 mb-4">
                       <div className="bg-indigo-500 p-4 rounded-3xl shadow-xl shadow-indigo-500/20">
                          <FileText size={40} className="text-white" />
                       </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-white leading-tight italic decoration-indigo-500">
                      {sentenceChallenges[currentSentenceIdx].sentence.split('___').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i === 0 && <span className="text-indigo-400 border-b-4 border-indigo-400/30 mx-1 px-1">___</span>}
                        </React.Fragment>
                      ))}
                    </p>
                    <div className="pt-4 space-y-1">
                       <p className="text-slate-500 font-bold italic text-sm">{sentenceChallenges[currentSentenceIdx].translation}</p>
                       <p className="text-indigo-700 text-[10px] font-black uppercase tracking-[0.3em]">Confidential</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {sentenceChallenges[currentSentenceIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSentenceAnswer(opt)}
                        disabled={!!feedback}
                        className={`p-6 rounded-[2.5rem] border-b-[6px] font-black text-xl transition-all active:scale-95 active:border-b-0 ${
                          !feedback 
                            ? 'bg-white/5 border-white/10 text-white hover:bg-indigo-500 hover:border-indigo-700 shadow-xl' 
                            : opt === sentenceChallenges[currentSentenceIdx].answer 
                              ? 'bg-emerald-500 border-emerald-700 text-white animate-pulse' 
                              : 'bg-white/5 opacity-40 border-white/5 text-slate-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* CSI Feedback Bar */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className={`fixed bottom-0 inset-x-0 p-10 pt-8 rounded-t-[4rem] shadow-[0_-20px_100px_rgba(0,0,0,0.8)] z-[110] border-t-4 ${
              feedback === 'correct' ? 'bg-indigo-600 border-indigo-400' : 'bg-rose-700 border-rose-500'
            }`}
          >
             <div className="max-w-xl mx-auto space-y-6">
                <div className="flex items-center gap-5 text-white">
                   <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-xl">
                     {feedback === 'correct' ? <Zap size={40} className="fill-indigo-300" /> : <AlertCircle size={40} />}
                   </div>
                   <div className="flex-1">
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase">{feedback === 'correct' ? 'Գործը բացված է!' : 'Սխալ հետք!'}</h3>
                      <p className="font-bold opacity-70 text-sm">{feedback === 'correct' ? 'Դուք ճիշտ ապացույց գտաք:' : 'Փորձեք մեկ այլ վարկած:'}</p>
                   </div>
                </div>

                <button 
                  onClick={nextAction}
                  className={`w-full py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    feedback === 'correct' ? 'bg-white text-indigo-700' : 'bg-white text-rose-700'
                  }`}
                >
                  Շարունակել
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
