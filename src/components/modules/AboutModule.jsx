import React from 'react';

export function AboutModule() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">ABOUT.md</h2>
      <div className="grid lg:grid-cols-[2fr,1fr] gap-6 text-sm">
        <div className="space-y-3">
          <p className="leading-relaxed">
            Full Stack Developer with a passion for creating innovative solutions at the intersection
            of technology and design. Specialized in building scalable web applications, AI integrations,
            and immersive user experiences.
          </p>
          <p className="leading-relaxed">
            With 5+ years of experience in software development, I've worked on projects ranging from
            enterprise applications to cutting-edge AI systems. I believe in writing clean, maintainable
            code and staying at the forefront of technology.
          </p>
          <div className="pt-4 border-t border-cyan-800">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div><span className="text-cyan-600">Location:</span> San Francisco, CA</div>
              <div><span className="text-cyan-600">Experience:</span> 5+ Years</div>
              <div><span className="text-cyan-600">Education:</span> BS Computer Science</div>
              <div><span className="text-cyan-600">Status:</span> Available for Work</div>
            </div>
          </div>
        </div>
        <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-cyan-500">PROFILE STATS</span>
            <span className="text-cyan-700">v2.4.1</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span>Frontend / UI</span>
              <span className="text-cyan-300">92%</span>
            </div>
            <div className="h-1 bg-cyan-950">
              <div className="h-full w-[92%] bg-gradient-to-r from-cyan-400 to-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Backend / Systems</span>
              <span className="text-cyan-300">88%</span>
            </div>
            <div className="h-1 bg-cyan-950">
              <div className="h-full w-[88%] bg-gradient-to-r from-cyan-400 to-purple-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>AI / ML</span>
              <span className="text-cyan-300">80%</span>
            </div>
            <div className="h-1 bg-cyan-950">
              <div className="h-full w-[80%] bg-gradient-to-r from-cyan-400 to-emerald-400" />
            </div>
          </div>
          <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
            Last updated: live · based on recent projects and learning.
          </div>
        </div>
      </div>
    </div>
  );
}

