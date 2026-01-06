import React from 'react';

export function ExperienceModule() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">EXPERIENCE.log</h2>
      <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-4">
          <div className="border-l-2 border-cyan-600 pl-4 pb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-cyan-300 font-semibold">Senior Full Stack Developer</h3>
              <span className="text-xs text-cyan-600">2022 - Present</span>
            </div>
            <p className="text-sm text-cyan-500 mb-2">TechCorp Inc.</p>
            <ul className="text-xs space-y-1 text-cyan-400 opacity-80 list-disc list-inside">
              <li>Led development of AI-powered analytics platform</li>
              <li>Architected microservices infrastructure serving 1M+ users</li>
              <li>Mentored team of 5 junior developers</li>
            </ul>
          </div>

          <div className="border-l-2 border-cyan-600 pl-4 pb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-cyan-300 font-semibold">Full Stack Developer</h3>
              <span className="text-xs text-cyan-600">2020 - 2022</span>
            </div>
            <p className="text-sm text-cyan-500 mb-2">StartupXYZ</p>
            <ul className="text-xs space-y-1 text-cyan-400 opacity-80 list-disc list-inside">
              <li>Built real-time collaboration features</li>
              <li>Optimized application performance by 60%</li>
              <li>Implemented CI/CD pipeline</li>
            </ul>
          </div>

          <div className="border-l-2 border-cyan-600 pl-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-cyan-300 font-semibold">Junior Developer</h3>
              <span className="text-xs text-cyan-600">2019 - 2020</span>
            </div>
            <p className="text-sm text-cyan-500 mb-2">Digital Agency</p>
            <ul className="text-xs space-y-1 text-cyan-400 opacity-80 list-disc list-inside">
              <li>Developed responsive web applications</li>
              <li>Collaborated with design team on UI/UX</li>
              <li>Maintained legacy codebases</li>
            </ul>
          </div>
        </div>
        <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-cyan-500">CAREER SUMMARY</span>
            <span className="text-cyan-700">timeline</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Years shipping</span>
              <span className="text-cyan-300">5+</span>
            </div>
            <div className="flex justify-between">
              <span>Teams led</span>
              <span className="text-cyan-300">1–2</span>
            </div>
            <div className="flex justify-between">
              <span>Systems touched</span>
              <span className="text-cyan-300">enterprise · startups</span>
            </div>
          </div>
          <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
            Designed to show impact at a glance while the detailed log scrolls on the left.
          </div>
        </div>
      </div>
    </div>
  );
}

