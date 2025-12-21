import './App.css';
import { Rocket, BrainCircuit } from 'lucide-react';

function App() {
  return (
    <div className="h-screen w-full bg-slate-900 text-white flex flex-col justify-center items-center gap-6">
      <div className="flex items-center gap-3">
        <BrainCircuit size={48} className="text-blue-400" />
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Portfolio AI
        </h1>
      </div>

      <p className="text-gray-400 text-lg">
        Probando Lucide Icons + Tailwind CSS
      </p>

      <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-500 transition font-semibold shadow-lg shadow-purple-500/30">
        <Rocket size={20} />
        <span>Lanzar Proyecto</span>
      </button>
    </div>
  );
}

export default App;
