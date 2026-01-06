import React from 'react';
import { Mail, Github, Linkedin, Globe } from 'lucide-react';

export function FileContent({ activeFile, projects, skills, skillsGraphMode }) {
  if (!activeFile) return null;

  switch (activeFile.type) {
    case 'about':
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

    case 'projects':
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">PROJECTS/</h2>
          <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
            <div className="space-y-3">
              {projects.map((project, i) => (
                <div key={i} className="border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-cyan-300 font-semibold">{project.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        project.status === 'Production' ? 'bg-green-900 text-green-300' :
                        project.status === 'Active' ? 'bg-blue-900 text-blue-300' :
                        project.status === 'Beta' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-purple-900 text-purple-300'
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
            <div className={`border border-cyan-800 bg-black/40 p-4 text-xs space-y-3 ${skillsGraphMode ? 'ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]' : ''}`}>
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

    case 'skills':
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
                      <span key={i} className="bg-cyan-950 bg-opacity-50 border border-cyan-700 px-3 py-1 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-3">
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

    case 'experience':
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

    case 'contact':
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">CONTACT.ini</h2>
          <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
            <div className="space-y-3">
              <a href="mailto:your.email@example.com" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Mail size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-xs text-cyan-600">your.email@example.com</div>
                </div>
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Github size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">GitHub</div>
                  <div className="text-xs text-cyan-600">github.com/yourusername</div>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Linkedin size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">LinkedIn</div>
                  <div className="text-xs text-cyan-600">linkedin.com/in/yourprofile</div>
                </div>
              </a>

              <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Globe size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">Website</div>
                  <div className="text-xs text-cyan-600">yourwebsite.com</div>
                </div>
              </a>
            </div>
            <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-cyan-500">PREFERRED SIGNAL</span>
                <span className="text-cyan-700">low latency</span>
              </div>
              <p className="text-cyan-400">
                Email is usually best for deep conversations, while GitHub and LinkedIn are great for quick context.
              </p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Avg. response</span>
                  <span className="text-cyan-300">&lt; 24h</span>
                </div>
                <div className="flex justify-between">
                  <span>Time zones</span>
                  <span className="text-cyan-300">flexible / remote‑friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

