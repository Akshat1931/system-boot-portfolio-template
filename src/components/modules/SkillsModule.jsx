import React from 'react';

export function SkillsModule({ skills, skillsGraphMode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">SKILLS.json</h2>
      <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="border border-cyan-800 p-4">
              <h3 className="text-cyan-300 font-semibold mb-3 text-sm">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-cyan-950 bg-opacity-50 border border-cyan-700 px-3 py-1 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`border border-cyan-800 bg-black/40 p-4 text-xs space-y-3 ${
            skillsGraphMode ? 'ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-cyan-500">STACK OVERVIEW</span>
            <span className="text-cyan-700">profile: T‑shaped</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between">
                <span>Frontend depth</span>
                <span className="text-cyan-300">high</span>
              </div>
              <div className="h-1 bg-cyan-950">
                <div className="h-full w-[90%] bg-gradient-to-r from-cyan-400 to-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Backend depth</span>
                <span className="text-cyan-300">high</span>
              </div>
              <div className="h-1 bg-cyan-950">
                <div className="h-full w-[85%] bg-gradient-to-r from-cyan-400 to-purple-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>DevOps / Cloud</span>
                <span className="text-cyan-300">medium</span>
              </div>
              <div className="h-1 bg-cyan-950">
                <div className="h-full w-[70%] bg-gradient-to-r from-cyan-400 to-emerald-400" />
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
            Calibrated from tools I use most often in real projects.
          </div>
        </div>
      </div>
    </div>
  );
}

