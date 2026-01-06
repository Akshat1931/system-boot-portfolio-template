import React from 'react';

export function BootScreen({ time, bootLogs, bootStep, formatTime, onInitAudio }) {
  return (
    <div
      className="min-h-screen bg-black text-cyan-400 font-mono flex items-center justify-center relative overflow-hidden"
      onClick={onInitAudio}
    >
      {/* Faint scanline / vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.05)_0,_transparent_55%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,0)_95%,_rgba(0,0,0,0.7)_100%)]" />

      <div className="w-full max-w-3xl px-6">
        <div className="mb-6 text-xs text-cyan-600 flex items-center justify-between">
          <span>QUANTUM_PORTFOLIO_OS v2.4.1</span>
          <span>{formatTime(time)} UTC</span>
        </div>

        <div className="border border-cyan-800 bg-black bg-opacity-70 p-4 h-64 overflow-hidden text-xs">
          {bootLogs.map((line, index) => (
            <div
              key={index}
              className={`tracking-tight ${
                line.includes('SYSTEM ONLINE') ? 'text-green-400 mt-2 animate-pulse' : 'text-cyan-400'
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-cyan-600">
          <div className="flex items-center gap-3">
            <div className="w-24 h-[2px] bg-cyan-900 overflow-hidden">
              <div
                className="h-full w-1/2 bg-cyan-400 animate-[pulse_1.2s_ease-in-out_infinite]"
                style={{ boxShadow: '0 0 12px rgba(34,211,238,0.7)' }}
              />
            </div>
            <span>Boot sequence {Math.min(100, Math.round((bootStep / 9) * 100))}%</span>
          </div>
          <span className="opacity-70">Press any key to skip</span>
        </div>
      </div>
    </div>
  );
}

