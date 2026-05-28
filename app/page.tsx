'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function EidCelebrationPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [userName, setUserName] = useState('');
  const [inputName, setInputName] = useState('');
  
  // Resume week guessing game states
  const [systemGuess, setSystemGuess] = useState<number | null>(null);
  const [guessResult, setGuessResult] = useState<string | null>(null);
  const [actualResumptionWeek, setActualResumptionWeek] = useState<number | null>(null);
  const [gamePlayed, setGamePlayed] = useState(false);
  
  // Joke states
  const [currentJoke, setCurrentJoke] = useState("");
  const [jokeIndex, setJokeIndex] = useState(0);
  
  // Predefined jokes list
  const jokesList = [
    "Why don't we ever play hide and seek on Eid? 🤷 ... Because good deeds always find you!",
    "Teacher: 'Why are you late?' Student: 'Eid Mubarak!' Teacher: '... Okay, fine. Sit.'",
    "What do you call a confused shehri? 🐪 ... Lost in the 'desert' of thought!",
    "Why did the samosa break up with the jalebi? 💔 ... It found someone 'sweeter'!"
  ];

  // Initialize first joke
  useState(() => {
    setCurrentJoke(jokesList[0]);
  });

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUserName(inputName.trim());
      // Generate random actual resumption week (between week 1 and 12 of the semester)
      const randomWeek = Math.floor(Math.random() * 12) + 1;
      setActualResumptionWeek(randomWeek);
      // Reset game states
      setSystemGuess(null);
      setGuessResult(null);
      setGamePlayed(false);
      // Move to step 2
      setStep(2);
    }
  };

  const handleNextToStep2 = () => {
    setStep(3);
  };

  const handleNextToStep3 = () => {
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setInputName('');
    setUserName('');
    setSystemGuess(null);
    setGuessResult(null);
    setGamePlayed(false);
    setActualResumptionWeek(null);
    setJokeIndex(0);
    setCurrentJoke(jokesList[0]);
  };

  const handleSystemGuess = () => {
    if (!actualResumptionWeek) return;
    
    // System generates a random guess between week 1 and 12
    const randomGuess = Math.floor(Math.random() * 12) + 1;
    setSystemGuess(randomGuess);
    
    // Generate funny result message
    const diff = Math.abs(randomGuess - actualResumptionWeek);
    
    let message = "";
    
    if (diff === 0) {
      message = `🎯 WOAH! The universe guessed WEEK ${randomGuess} and it's EXACTLY right! The system is psychic! (Or just lucky...) 🤯`;
    } else if (diff === 1) {
      message = `🎲 The system guessed WEEK ${randomGuess}. You'll resume on WEEK ${actualResumptionWeek}. Off by just 1 week! The algorithm needs a coffee. ☕`;
    } else if (diff <= 3) {
      message = `📅 Prediction: WEEK ${randomGuess} | Actual: WEEK ${actualResumptionWeek} (off by ${diff} weeks). Not bad! The AI is learning... slowly. 🐢`;
    } else {
      message = `🤖 System guess: WEEK ${randomGuess} 🤖 | Reality: WEEK ${actualResumptionWeek} (off by ${diff} weeks). Looks like the robot needs to go back to school too! 📚😂`;
    }
    
    setGuessResult(message);
    setGamePlayed(true);
  };

  const nextJoke = () => {
    const nextIndex = (jokeIndex + 1) % jokesList.length;
    setJokeIndex(nextIndex);
    setCurrentJoke(jokesList[nextIndex]);
  };

  // Progress indicator
  const ProgressIndicator = () => (
    <div className="flex justify-center gap-2 mb-4">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className={`h-2 rounded-full transition-all duration-300 ${
            step >= s
              ? 'w-8 bg-amber-500'
              : 'w-4 bg-amber-200/50'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-amber-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {/* HEADER SECTION - Visible on ALL steps */}
        <div className="bg-gradient-to-r from-amber-800 via-emerald-800 to-amber-800 rounded-2xl shadow-xl p-4 mb-5 border-2 border-amber-400 flex items-center gap-4 flex-wrap md:flex-nowrap">
          {/* Headshot Image Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-200 border-4 border-amber-400 overflow-hidden shadow-lg flex items-center justify-center">
              <Image
                src="/Asad.jpg"
                alt="Aliyu Umar Musa"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-2xl">👨‍💻</span>';
                  }
                }}
              />
            </div>
          </div>
          
          {/* Name and Department */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-amber-400/20 backdrop-blur-sm px-2 py-0.5 rounded-full mb-1">
              <span className="text-amber-300 text-[10px] font-mono">✦ CELEBRATION BY ✦</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
              ALIYU UMAR MUSA
            </h2>
            <div className="flex items-center gap-2 justify-center md:justify-start mt-0.5">
              <span className="text-amber-300 text-sm">🔐</span>
              <p className="text-amber-100 font-semibold text-sm">
                Cyber Security Department
              </p>
              <span className="text-amber-300 text-sm">🛡️</span>
            </div>
          </div>
          
          {/* Step indicator */}
          <div className="text-right">
            <p className="text-amber-300 text-xs">Step {step} of 4</p>
            <p className="text-white text-xs opacity-75">
              {step === 1 && "Welcome"}
              {step === 2 && "Celebration"}
              {step === 3 && "The Game"}
              {step === 4 && "Laugh & Finish"}
            </p>
          </div>
        </div>

        <ProgressIndicator />

        {/* STEP 1: Ask for name */}
        {step === 1 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-all duration-300 border border-amber-200/50 animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-6xl">🌙✨</span>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent mt-3">
                Eid Mubarak!
              </h1>
              <p className="text-amber-700 mt-2">Let's begin the celebration</p>
            </div>

            <form onSubmit={handleNameSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-emerald-800 font-semibold mb-2 text-lg">
                  What's your name?
                </label>
                <input
                  id="name"
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-5 py-3 text-lg border-2 border-amber-200 rounded-2xl focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition bg-white/80"
                  autoFocus
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-2xl text-lg transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Continue → Step 2
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Celebration Message */}
        {step === 2 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 transition-all duration-300 border border-amber-200/50 animate-fadeIn">
            <div className="text-center mb-3">
              <span className="text-6xl">🕌🎊</span>
              <h2 className="text-2xl font-bold text-emerald-700 mt-2">Step 2: Eid Celebration</h2>
            </div>

            <div className="bg-amber-50 rounded-2xl p-5 mb-5 border-l-8 border-amber-600 shadow-inner">
              <div className="text-center">
                <p className="text-xl font-semibold text-emerald-800 mb-1">Dear</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-emerald-700 bg-clip-text text-transparent mb-3">
                  {userName}!
                </p>
                <div className="space-y-3 text-gray-700">
                  <p className="text-lg">
                    🌙✨ <span className="font-bold text-amber-700">Eid Mubarak!</span> ✨🌙
                  </p>
                  <p className="text-base leading-relaxed">
                    May this blessed occasion bring you endless joy, peace, and prosperity.
                  </p>
                  <p className="text-sm italic text-amber-800">
                    "May Allah accept your good deeds, forgive your transgressions, and ease the suffering of all people around the world."
                  </p>
                  <div className="pt-2 text-emerald-700 font-semibold">
                    Wishing you and your family a very happy and blessed Eid! 🎊
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNextToStep2}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 rounded-2xl transition shadow-lg text-lg"
            >
              Continue → Step 3 (The Game)
            </button>
          </div>
        )}

        {/* STEP 3: Resume Week Guessing Game */}
        {step === 3 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 transition-all duration-300 border-2 border-amber-300 animate-fadeIn">
            <div className="text-center mb-3">
              <span className="text-5xl">🤖🎲</span>
              <h2 className="text-2xl font-bold text-emerald-700 mt-2">Step 3: The Prediction Game</h2>
              <p className="text-amber-600 text-sm">Let me guess your resumption week! Click the "Let me guess..." button!!</p>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-center text-sm">
                I (the system) will use a random number generator to predict which week you'll resume school.
                No pressure, just vibes and chaos. 😎
              </p>
            </div>
            
            {!gamePlayed ? (
              <button
                onClick={handleSystemGuess}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 rounded-xl transition shadow-2xl hover:shadow-amber-500/50 hover:scale-[1.02] text-lg ring-2 ring-amber-400/50"              >
                🔮 Let me guess your week! 🔮
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-amber-100 rounded-xl p-4 text-center">
                  <p className="text-amber-800 font-mono text-sm">🤖 SYSTEM PREDICTION 🤖</p>
                  <p className="text-5xl font-bold text-amber-700 my-2">{systemGuess}</p>
                  <p className="text-xs text-amber-600">(randomly generated week number)</p>
                </div>
                
                {guessResult && (
                  <div className="p-3 bg-emerald-100 rounded-xl text-emerald-800 text-sm font-medium leading-relaxed">
                    {guessResult}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={handleSystemGuess}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-xl transition text-sm"
                  >
                    🎲 Guess Again
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-4 text-[11px] text-amber-500 italic text-center">
              * The actual resumption week is randomly set between week 1-12. No guarantees, just fun! 🎯
            </div>

            <button
              onClick={handleNextToStep3}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 rounded-2xl transition shadow-lg text-lg mt-4"
            >
              Continue → Step 4 (Jokes & Finish)
            </button>
          </div>
        )}

        {/* STEP 4: Joke Corner & Finish */}
        {step === 4 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 transition-all duration-300 border border-amber-200/50 animate-fadeIn">
            <div className="text-center mb-3">
              <span className="text-5xl">😂🎉</span>
              <h2 className="text-2xl font-bold text-emerald-700 mt-2">Step 4: Joke Corner & Finish</h2>
              <p className="text-amber-600 text-sm">One last laugh before you go!</p>
            </div>

            {/* Eid Joke Corner */}
            <div className="bg-amber-50 rounded-2xl p-5 mb-5 border-2 border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">😂</span>
                  <h3 className="font-bold text-emerald-800 text-lg">Eid Joke Corner</h3>
                </div>
                <button
                  onClick={nextJoke}
                  className="text-xs bg-amber-200 hover:bg-amber-300 px-3 py-1 rounded-full transition font-semibold"
                >
                  Next Joke →
                </button>
              </div>
              <div className="p-4 bg-white rounded-xl min-h-[90px] flex items-center">
                <p className="text-gray-700 text-base leading-relaxed">{currentJoke}</p>
              </div>
            </div>

            {/* Final message */}
            <div className="bg-gradient-to-r from-emerald-100 to-amber-100 rounded-xl p-4 text-center mb-5">
              <p className="text-emerald-800 font-semibold">
                🎊 Thank you for celebrating Eid with us, {userName}! 🎊
              </p>
              <p className="text-amber-700 text-sm mt-1">
                May your days be filled with laughter, joy, and Suyas!
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold py-3 rounded-2xl transition border border-amber-300 text-lg"
            >
              🎬 Start Over (New Person)
            </button>
          </div>
        )}

        {/* Footer - Inspiration Credit */}
        <div className="mt-6 text-center">
          <p className="text-amber-300/70 text-xs md:text-sm font-mono border-t border-amber-400/30 pt-4">
            inspired by <span className="text-amber-200 font-semibold tracking-wide">Muhammad Umar (Aboki)</span>
          </p>
          <p className="text-amber-400/40 text-[10px] mt-1">
            ✦ spreading joy one line of code at a time ✦
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.45s ease-out;
        }
      `}</style>
    </div>
  );
}