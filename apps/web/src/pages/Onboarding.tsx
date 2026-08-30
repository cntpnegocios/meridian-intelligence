import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState("");
  const [goal, setGoal] = useState("");

  const handleComplete = () => {
    // In a real app, save to context or backend
    localStorage.setItem("meridian_client_profile", profile);
    localStorage.setItem("meridian_client_goal", goal);
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center text-neutral-100 font-sans p-6">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-900/20 blur-[100px] rounded-full mix-blend-screen"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-900/20 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="max-w-2xl w-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-10 z-10 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome to Meridian Intelligence</h1>
          <p className="text-neutral-400">Configure your digital twin environment</p>
        </div>

        {/* Step 1: Profile */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-medium text-emerald-400 mb-4 text-center uppercase tracking-widest text-xs">Step 1: Identify your role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <button onClick={() => { setProfile("shipowner"); setStep(2); }} className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-emerald-500 hover:bg-neutral-900 transition-all group text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🚢</div>
                <h3 className="font-semibold text-neutral-200">Shipowner</h3>
                <p className="text-xs text-neutral-500 mt-2">Manage vessel fleets and emissions compliance.</p>
              </button>
              
              <button onClick={() => { setProfile("charterer"); setStep(2); }} className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-emerald-500 hover:bg-neutral-900 transition-all group text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📦</div>
                <h3 className="font-semibold text-neutral-200">Charterer</h3>
                <p className="text-xs text-neutral-500 mt-2">Optimize cargo voyages and track Scope 3.</p>
              </button>
              
              <button onClick={() => { setProfile("port"); setStep(2); }} className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-emerald-500 hover:bg-neutral-900 transition-all group text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚓</div>
                <h3 className="font-semibold text-neutral-200">Port / Terminal</h3>
                <p className="text-xs text-neutral-500 mt-2">Monitor congestion, shore power, and green corridors.</p>
              </button>

            </div>
          </div>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-lg font-medium text-emerald-400 mb-4 text-center uppercase tracking-widest text-xs">Step 2: Primary Objective</h2>
            <div className="grid grid-cols-1 gap-3 mb-8">
              
              <button onClick={() => setGoal("compliance")} className={`p-4 rounded-lg border text-left transition-all ${goal === 'compliance' ? 'border-emerald-500 bg-emerald-900/20' : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'}`}>
                <h3 className="font-medium text-neutral-200">EU ETS & FuelEU Compliance</h3>
                <p className="text-xs text-neutral-500 mt-1">Calculate financial exposure and manage allowances.</p>
              </button>

              <button onClick={() => setGoal("green_corridors")} className={`p-4 rounded-lg border text-left transition-all ${goal === 'green_corridors' ? 'border-emerald-500 bg-emerald-900/20' : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'}`}>
                <h3 className="font-medium text-neutral-200">Green Corridor Simulation</h3>
                <p className="text-xs text-neutral-500 mt-1">Simulate alternative fuels and acquire carbon credits for offsets.</p>
              </button>

              <button onClick={() => setGoal("voyage_optimization")} className={`p-4 rounded-lg border text-left transition-all ${goal === 'voyage_optimization' ? 'border-emerald-500 bg-emerald-900/20' : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'}`}>
                <h3 className="font-medium text-neutral-200">Voyage Optimization</h3>
                <p className="text-xs text-neutral-500 mt-1">Find the optimal route and speed to minimize Total Cost of Ownership.</p>
              </button>
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-800">
              <button onClick={() => setStep(1)} className="text-sm text-neutral-400 hover:text-white px-4 py-2">Back</button>
              <button 
                onClick={handleComplete} 
                disabled={!goal}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded font-medium disabled:opacity-50 transition-colors"
              >
                Access Platform →
              </button>
            </div>
          </div>
        )}

      </div>
      
      <div className="mt-8 text-xs text-neutral-600 flex gap-4">
         <span>© 2026 Meridian MRV</span>
         <Link to="/app" className="hover:text-neutral-400">Skip to Dashboard</Link>
      </div>
    </div>
  );
}
