"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";

interface TerminalInteractiveCliProps {
  data: PortfolioData;
}

export const TerminalInteractiveCli: React.FC<TerminalInteractiveCliProps> = ({ data }) => {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState(
    "Type 'help' for available commands (or try 'sudo hire', 'matrix', 'skills')."
  );

  const terminalUser = data.themeConfig?.terminalName || "guest@portfolio";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const raw = inputVal.trim();
      if (!raw) return;

      const cmd = raw.toLowerCase();
      setInputVal("");

      switch (cmd) {
        case "help":
          setOutputVal(`[${terminalUser}:~$ ${raw}]
Available commands:
  • whoami     - Display profile identity and headline
  • about      - Jump to Bio section
  • skills     - List all technical competencies
  • projects   - View portfolio project details
  • socials    - View social & contact channels
  • sudo hire  - Dispatch contract / full-time offer
  • matrix     - Render matrix digital rain stream
  • uptime     - Show system uptime and latency
  • clear      - Clear this interactive console output`);
          break;
        case "whoami":
          setOutputVal(`[${terminalUser}:~$ ${raw}]
User: ${data.name || "Alex Rivera"}
Role: ${data.title || "Senior Engineer"}
Location: ${data.location || "San Francisco, CA (Remote)"}
Status: Available for high-impact opportunities`);
          break;
        case "about":
          document.getElementById("preview-sec-about")?.scrollIntoView({ behavior: "smooth" });
          setOutputVal(`[${terminalUser}:~$ ${raw}]\nNavigating to [about.txt]...`);
          break;
        case "skills":
          document.getElementById("preview-sec-skills")?.scrollIntoView({ behavior: "smooth" });
          setOutputVal(`[${terminalUser}:~$ ${raw}]\nLoaded ${data.skills.length} skills:\n${(data.skills || []).map(s => `  • ${s}`).join("\n")}`);
          break;
        case "projects":
          document.getElementById("preview-sec-projects")?.scrollIntoView({ behavior: "smooth" });
          setOutputVal(`[${terminalUser}:~$ ${raw}]\nLoaded ${data.projects.length} verified production repositories.`);
          break;
        case "socials":
        case "contact":
          document.getElementById("preview-sec-socials")?.scrollIntoView({ behavior: "smooth" });
          setOutputVal(`[${terminalUser}:~$ ${raw}]\nFound ${data.socials.length} communication endpoints.`);
          break;
        case "sudo hire":
        case "hire":
          setOutputVal(`[${terminalUser}:~$ ${raw}]
🎉 [ACCESS GRANTED]: Candidate matched!
Initiating contract negotiation protocol...
Email: ${(data.socials.find(s => s.platform === 'email')?.url || 'candidate@portfolio.dev').replace('mailto:', '')}
Status: 100% READY TO INTERVIEW.`);
          break;
        case "matrix":
          setOutputVal(`[${terminalUser}:~$ ${raw}]
01000110 01101111 01110010 01100111 01100101
Wake up, developer...
Follow the white rabbit.`);
          break;
        case "uptime":
          setOutputVal(`[${terminalUser}:~$ ${raw}]\nUptime: 99.99% · 0 kernel panics · latency: 4ms`);
          break;
        case "date":
          setOutputVal(`[${terminalUser}:~$ ${raw}]\n${new Date().toUTCString()}`);
          break;
        case "clear":
          setOutputVal("");
          break;
        default:
          setOutputVal(`[${terminalUser}:~$ ${raw}]\nzsh: command not found: ${raw}. Type 'help' for valid commands.`);
          break;
      }
    }
  };

  return (
    <div className="mt-8 bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 sm:p-3.5 font-mono text-xs shadow-inner w-full min-w-0">
      {outputVal && (
        <div className="text-zinc-300 mb-3 whitespace-pre-wrap leading-relaxed border-b border-zinc-850 pb-2 text-[11px] sm:text-xs break-words font-mono">
          {outputVal}
        </div>
      )}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 w-full min-w-0">
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-emerald-400 font-semibold text-[11px] sm:text-xs truncate max-w-[150px]">{terminalUser}</span>
          <span className="text-zinc-500">$&gt;</span>
        </div>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'whoami', 'sudo hire'..."
          className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 text-xs font-mono min-w-[140px] w-full"
        />
      </div>
    </div>
  );
};
