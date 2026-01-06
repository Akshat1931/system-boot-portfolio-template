import React from 'react';
import { Mail, Github, Linkedin, Globe } from 'lucide-react';

export function ContactModule() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">CONTACT.ini</h2>
      <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-3">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition"
          >
            <Mail size={20} className="text-cyan-400" />
            <div>
              <div className="text-sm font-semibold">Email</div>
              <div className="text-xs text-cyan-600">your.email@example.com</div>
            </div>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition"
          >
            <Github size={20} className="text-cyan-400" />
            <div>
              <div className="text-sm font-semibold">GitHub</div>
              <div className="text-xs text-cyan-600">github.com/yourusername</div>
            </div>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition"
          >
            <Linkedin size={20} className="text-cyan-400" />
            <div>
              <div className="text-sm font-semibold">LinkedIn</div>
              <div className="text-xs text-cyan-600">linkedin.com/in/yourprofile</div>
            </div>
          </a>

          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition"
          >
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
}

