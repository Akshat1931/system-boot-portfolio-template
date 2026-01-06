import React from 'react';

export function ProjectsModule({ projects }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">PROJECTS/</h2>
      <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-3">
          {projects.map((project, i) => (
            <div
              key={i}
              className="border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-cyan-300 font-semibold">{project.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.status === 'Production'
                      ? 'bg-green-900 text-green-300'
                      : project.status === 'Active'
                        ? 'bg-blue-900 text-blue-300'
                        : project.status === 'Beta'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-purple-900 text-purple-300'
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-cyan-600 mb-2">{project.tech}</p>
              <p className="text-sm text-cyan-400 opacity-80">{project.desc}</p>
            </div>
          ))}
        </div>
        <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-cyan-500">MODULE METRICS</span>
            <span className="text-cyan-700">real‑time</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Production</span>
              <span className="text-green-300">1</span>
            </div>
            <div className="flex justify-between">
              <span>Active</span>
              <span className="text-blue-300">1</span>
            </div>
            <div className="flex justify-between">
              <span>Beta</span>
              <span className="text-yellow-300">1</span>
            </div>
            <div className="flex justify-between">
              <span>In dev</span>
              <span className="text-purple-300">1</span>
            </div>
          </div>
          <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
            Hover any project card to highlight its status in the system.
          </div>
        </div>
      </div>
    </div>
  );
}

