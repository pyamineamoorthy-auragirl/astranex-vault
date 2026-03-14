import React, { useState } from 'react';
import studentsData from './data/registeredStudents.json'; 
import { Search, Download, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

const CertificateVault = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    const cleanInput = input.trim();
    if (!cleanInput) return;
    
    setIsLoading(true);
    setError(false);
    setResult(null);

    // Artificial delay for the "Decrypting" effect
    setTimeout(() => {
      // FIX: Using s.id to match your JSON and ensuring string comparison
      const found = studentsData.find(s => s.id.toString() === cleanInput);
      
      if (found) {
        setResult(found);
        
        // TRIGGER CONFETTI FOR WINNERS
        // Note: Assumes cert_type is "winner" based on our previous JSON setup
        if ((found.cert_type === "winner" || found.category === "Winner") && window.confetti) {
          window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2dd4bf', '#3b82f6', '#ffffff'] 
          });
        }
      } else {
        setError(true);
      }
      setIsLoading(false);
    }, 1500); 
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Heavenly Floating Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-bounce duration-[10000ms]"></div>
      </div>

      <div className="w-full max-w-lg z-10">
        <div className="text-center mb-10">
          <div className="inline-block bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 rounded-full mb-4">
            <p className="text-[10px] font-black tracking-[0.3em] text-teal-400 uppercase">ASTRANEX ASSOCIATION</p>
          </div>
          <h1 className="text-6xl font-black italic tracking-tighter mb-2 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            VAULT
          </h1>
          <p className="text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">Verification Core 1.0</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
          <p className="text-[10px] font-black text-slate-400 mb-6 text-center tracking-[0.2em] uppercase">Enter Register Number</p>
          
          <div className="flex flex-row items-stretch gap-2 mb-8 w-full">
            <input 
              type="text" 
              className="flex-[4] min-w-0 bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-mono text-base md:text-lg tracking-widest text-white"
              placeholder="Reg No..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              disabled={isLoading}
              className="flex-[1] bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-2xl transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center disabled:opacity-50 min-w-[60px]"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={22} strokeWidth={3} />}
            </button>
          </div>

          {/* Result Card */}
          {result && !isLoading && (
            <div className="animate-in fade-in zoom-in-95 duration-500 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 text-center">
              <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/20">
                <ShieldCheck className="text-teal-400" size={40} />
              </div>
              <h2 className="text-3xl font-black uppercase italic text-white mb-2">{result.name}</h2>
              <div className="flex justify-center gap-2 mb-8">
                <span className="bg-white/5 text-slate-300 text-[9px] px-4 py-1.5 rounded-full font-black border border-white/10 tracking-widest uppercase">
                  {result.dept || result.event}
                </span>
                <span className="bg-teal-500/20 text-teal-400 text-[9px] px-4 py-1.5 rounded-full font-black border border-teal-500/20 tracking-widest uppercase">
                  {result.cert_type || result.category}
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-6 py-2 border-y border-white/5">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
                <p className="text-[8px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                  AUTH-ID: {Math.random().toString(36).substr(2, 7).toUpperCase()}
                </p>
              </div>

              {/* DOWNLOAD BUTTONS */}
              <div className="flex flex-col gap-3">
                <a 
                  href={`/certificates/${result.file}`} 
                  download={`${result.name}_Certificate.png`}
                  className="group w-full bg-white text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-teal-400 transition-all shadow-xl shadow-white/5"
                >
                  <Download size={20} strokeWidth={3} className="group-hover:translate-y-0.5 transition-transform" /> 
                  DOWNLOAD CREDENTIAL
                </a>

                {/* Second Certificate button if it exists */}
                {result.has_second_cert && (
                   <a 
                   href={`/certificates/${result.file_2}`} 
                   download={`${result.name}_Participant_Certificate.png`}
                   className="group w-full bg-transparent border border-white/20 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                 >
                   <Download size={18} /> 
                   DOWNLOAD PARTICIPATION
                 </a>
                )}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="animate-in shake duration-300 bg-red-500/5 border border-red-500/20 rounded-3xl p-8 text-center">
              <AlertCircle className="mx-auto text-red-500 mb-3" size={40} />
              <p className="text-xs font-black text-red-500 tracking-widest uppercase">Unauthorized ID Number</p>
            </div>
          )}

          {/* Loading Placeholder */}
          {isLoading && (
            <div className="py-12 text-center animate-pulse">
              <p className="text-xs font-black text-teal-500 tracking-[0.4em] uppercase">Decrypting Vault...</p>
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-16 text-[9px] font-black text-slate-600 tracking-[0.5em] uppercase text-center">
        Engineered for SRGEC Inaugural 2026<br/>
        <span className="text-slate-800 tracking-normal mt-1 block">Vice President Gowthaam L. Production</span>
      </footer>
    </div>
  );
};

export default CertificateVault;
