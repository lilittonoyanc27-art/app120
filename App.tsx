import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  ChevronRight, 
  Check, 
  Home, 
  Book, 
  Settings, 
  User,
  ArrowLeft,
  Ghost,
  Eye,
  FileSearch,
  Zap,
  Moon,
  Sun
} from 'lucide-react';
import { MYSTERY_DATA, Level } from './verbData';
import GameSession from './GameSession';

type Screen = 'dashboard' | 'game' | 'theory' | 'dictionary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [lives, setLives] = useState(5);
  const [progress, setProgress] = useState(40);

  const handleLevelSelect = (level: Level) => {
    if (level.type === 'theory') {
      setScreen('theory');
    } else {
      setSelectedLevel(level);
      setScreen('game');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] font-sans text-slate-100 overflow-x-hidden pt-safe pb-24 selection:bg-purple-500/30 selection:text-white leading-relaxed relative">
      {/* Noir Mystery Theme Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] via-[#1a1a2e] to-[#0a0a0c]" />
        
        {/* Animated Dust/Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* Searchlight Effect */}
        <motion.div 
          animate={{ 
            x: [0, 100, -100, 0], 
            y: [0, -50, 50, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full" 
        />
      </div>

      <AnimatePresence mode="wait">
        {screen === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto p-6 space-y-8 pt-10 relative z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl shadow-xl shadow-purple-500/20 flex items-center justify-center text-white -rotate-3 border border-white/10">
                   <Search size={32} />
                </div>
                <div>
                   <h1 className="text-2xl font-black tracking-tight text-white italic">Detective Pedro</h1>
                   <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]">Mystery Investigation</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
                 <span className="font-black text-white text-lg">{lives}</span>
                 <div className="w-1.5 h-6 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
            </div>

            {/* Case Progress */}
             <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 relative overflow-hidden group shadow-2xl">
               <div className="absolute -top-10 -right-10 opacity-5">
                  <FileSearch size={200} />
               </div>
               <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-purple-300 font-black text-xs uppercase tracking-widest italic">Գործի առաջընթացը</p>
                    <span className="text-3xl font-black text-white italic">{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-sky-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                     />
                  </div>
               </div>
            </div>

            {/* Menu */}
            <div className="grid gap-4">
               {MYSTERY_DATA.levels.map((level, i) => (
                 <motion.button
                   key={level.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleLevelSelect(level)}
                   className="w-full bg-white/5 border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-5 transition-all group shadow-lg"
                 >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                       level.type === 'theory' ? 'bg-amber-500/20 text-amber-400' : 
                       level.type === 'matching' ? 'bg-sky-500/20 text-sky-400' : 
                       'bg-purple-500/20 text-purple-400'
                    }`}>
                       {level.type === 'theory' ? <Eye size={28} /> : 
                        level.type === 'matching' ? <Search size={28} /> : 
                        <Zap size={28} />}
                    </div>
                    <div className="flex-1 text-left">
                       <h3 className="text-lg font-black text-white leading-tight">{level.title}</h3>
                       <p className="text-slate-500 text-sm font-bold">{level.description}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-white group-hover:bg-purple-500 transition-all">
                       <ChevronRight size={20} strokeWidth={3} />
                    </div>
                 </motion.button>
               ))}
            </div>
          </motion.div>
        )}

        {screen === 'game' && selectedLevel && (
          <GameSession 
            key="game-session"
            level={selectedLevel} 
            onClose={() => setScreen('dashboard')} 
            lives={lives}
            setLives={setLives}
          />
        )}

        {screen === 'theory' && (
          <motion.div 
            key="theory"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-[#0a0a0c] z-50 p-8 pt-safe overflow-y-auto pb-32"
          >
             <div className="max-w-3xl mx-auto space-y-12">
                <div className="flex items-center justify-between">
                   <button onClick={() => setScreen('dashboard')} className="p-3 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-colors">
                      <ArrowLeft size={24} />
                   </button>
                   <h1 className="text-2xl font-black italic tracking-tighter text-purple-400">Քննչական Թեորիա</h1>
                   <div className="w-12" />
                </div>

                <div className="space-y-12">
                   {/* Table Explaining Pairs */}
                   <section className="space-y-6">
                      <h2 className="text-3xl font-black text-white border-l-4 border-purple-500 pl-4 italic">Հաստատական և Ժխտական Զույգեր</h2>
                      <div className="grid gap-4">
                        {[
                          { pos: 'Algo (Ինչ-որ բան)', neg: 'Nada (Ոչինչ)', desc: 'Իրերի համար' },
                          { pos: 'Alguien (Ինչ-որ մեկը)', neg: 'Nadie (Ոչ ոք)', desc: 'Մարդկանց համար' },
                          { pos: 'Siempre (Միշտ)', neg: 'Nunca (Երբեք)', desc: 'Ժամանակի համար' },
                          { pos: 'También (Նույնպես)', neg: 'Tampoco (Նույնպես ոչ)', desc: 'Համաձայնության համար' },
                          { pos: 'Alguno (Որևէ մեկը)', neg: 'Ninguno (Ոչ մեկը)', desc: 'Քանակի/Ընտրության համար' }
                        ].map((pair, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:bg-white/10">
                             <div className="flex-1">
                                <div className="flex items-center gap-3">
                                   <span className="text-sky-400 font-black text-xl">{pair.pos}</span>
                                   <div className="h-px flex-1 bg-white/10" />
                                   <span className="text-purple-400 font-black text-xl">{pair.neg}</span>
                                </div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">{pair.desc}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                   </section>

                   {/* Usage Rules */}
                   <section className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-8 rounded-[3rem] border border-white/10 space-y-6">
                      <h2 className="text-2xl font-black text-white flex items-center gap-3 italic">
                        <Zap className="text-amber-400" /> Կարևոր Կանոններ
                      </h2>
                      <ul className="space-y-4">
                        <li className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-black flex-shrink-0">1</div>
                           <p className="text-slate-300 font-medium">Եթե ժխտական բառը (nada, nadie, nunca) բայից հետո է, բայից առաջ պետք է դնել <span className="text-white font-black">"No"</span>:</p>
                        </li>
                        <li className="bg-white/5 p-4 rounded-3xl border border-white/5 italic">
                           <span className="text-purple-400">Օրինակ:</span> No veo a nadie. (Ես ոչ ոքի չեմ տեսնում)
                        </li>
                        <li className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-black flex-shrink-0">2</div>
                           <p className="text-slate-300 font-medium">Եթե ժխտական բառը բայից առաջ է, <span className="text-white font-black">"No"</span>-ն չի օգտագործվում:</p>
                        </li>
                        <li className="bg-white/5 p-4 rounded-3xl border border-white/5 italic">
                           <span className="text-purple-400">Օրինակ:</span> Nadie sabe nada. (Ոչ ոք ոչինչ չգիտի)
                        </li>
                      </ul>
                   </section>
                </div>
             </div>
          </motion.div>
        )}

        {screen === 'dictionary' && (
           <motion.div 
            key="dictionary"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 bg-[#0a0a0c] z-50 p-6 pt-safe overflow-y-auto pb-32"
          >
             <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setScreen('dashboard')} className="p-3 bg-white/5 rounded-2xl text-white">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-black italic text-white tracking-widest uppercase">Detective Log</h1>
            </div>

            <div className="max-w-md mx-auto space-y-4">
               {MYSTERY_DATA.dictionary.map((item, i) => (
                 <div key={i} className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                    <div>
                       <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                         item.category === 'persona' ? 'bg-sky-500/20 text-sky-400' : 
                         item.category === 'cosa' ? 'bg-purple-500/20 text-purple-400' : 
                         'bg-amber-500/20 text-amber-400'
                       }`}>
                         {item.category}
                       </span>
                       <h3 className="text-xl font-black text-white mt-1 italic group-hover:text-purple-400 transition-colors">{item.phrase}</h3>
                    </div>
                    <p className="text-slate-500 font-bold italic text-sm">{item.translation}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Retro Noir Nav */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 inset-x-0 bg-white/5 backdrop-blur-2xl border-t border-white/5 p-4 pb-8 flex items-center justify-around z-40 rounded-t-[3rem] shadow-[0_-10px_50px_rgba(0,0,0,0.5)]"
      >
        <button onClick={() => setScreen('dashboard')} className={`flex flex-col items-center gap-1 ${screen === 'dashboard' ? 'text-purple-500' : 'text-slate-600'}`}>
          <Home size={24} fill={screen === 'dashboard' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-black uppercase">Գլխավոր</span>
        </button>
        <button onClick={() => setScreen('dictionary')} className={`flex flex-col items-center gap-1 ${screen === 'dictionary' ? 'text-purple-500' : 'text-slate-600'}`}>
          <Book size={24} fill={screen === 'dictionary' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-black uppercase">Բառարան</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-600">
          <Settings size={24} />
          <span className="text-[10px] font-black uppercase">Կարգավորում</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-600">
          <User size={24} />
          <span className="text-[10px] font-black uppercase">Պրոֆիլ</span>
        </button>
      </motion.nav>
    </div>
  );
}
