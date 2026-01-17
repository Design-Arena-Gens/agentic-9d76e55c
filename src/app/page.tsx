"use client";

import { useMemo, useState } from "react";

type Preset = {
  label: string;
  synopsis: string;
  values: Partial<FormState>;
};

type FormState = {
  workingTitle: string;
  documentaryFocus: string;
  drivingQuestion: string;
  audience: string;
  tone: string;
  visualIdentity: string;
  narrativeStructure: string;
  narratorVoice: string;
  runtime: string;
  callToAction: string;
  distributionPlan: string;
  keyMoments: string;
  referenceWorks: string;
  cinematographyNotes: string;
  musicDirection: string;
};

const toneOptions = [
  "Investigative and cinematic",
  "Poetic and reflective",
  "High-energy and inspirational",
  "Intimate character study",
  "Data-rich and analytical"
];

const visualOptions = [
  "Neo-noir nightscapes with volumetric lighting",
  "Golden-hour naturalism with handheld motion",
  "Clean studio look with macro inserts and infographics",
  "Archival footage blend with 3D motion graphics overlays",
  "Global travelogue with drone reveals and timelapses"
];

const narrativeStructures = [
  "Three-act arc: Hook, discovery, resolution",
  "Chronological timeline with flashback reveals",
  "Braided multi-perspective narrative",
  "Cause & effect chain with escalating stakes",
  "Problem → exploration → future vision"
];

const narratorVoices = [
  "Measured cinematic baritone (think David Attenborough)",
  "Warm first-person storyteller with lived experience",
  "Dual narrator: expert analyst + on-the-ground reporter",
  "Dramatic, thriller-style voice with strategic pauses",
  "Hopeful youth perspective with urgency"
];

const presets: Preset[] = [
  {
    label: "Climate Frontlines",
    synopsis: "Communities adapting to rising seas with science-driven insight.",
    values: {
      workingTitle: "Tidebreakers: Lives on the Climate Frontline",
      documentaryFocus: "A coastal community racing to redesign their city before the ocean permanently swallows it. Combine human stories with hard climate data and policy stakes.",
      drivingQuestion: "How do everyday people outmaneuver an ocean that keeps gaining ground?",
      audience: "Environmentally conscious millennials seeking hopeful action plans.",
      tone: "Poetic and reflective",
      visualIdentity: "Global travelogue with drone reveals and timelapses",
      narrativeStructure: "Braided multi-perspective narrative",
      narratorVoice: "Hopeful youth perspective with urgency",
      runtime: "12 minutes",
      callToAction: "Invite viewers to explore adaptive design toolkits and support community-led projects.",
      distributionPlan: "Feature on YouTube with supporting microdocs for Instagram Reels and TikTok.",
      keyMoments: "Opening: Anxious dawn in the flood-prone neighborhood.\nAct II: Scientists building digital twins of the coastline.\nFinale: Community assembly unveiling a radical redesign blueprint.",
      referenceWorks: "Inspired by National Geographic's 'Years of Living Dangerously' and Vox Climate Lab.",
      cinematographyNotes: "Blend stabilised aerials with ground-level portraits. Macro inserts of saltwater interacting with everyday objects. Use tidal motion graphics to visualise risk.",
      musicDirection: "Evolving atmospheric score that crescendos into hopeful tones by the finale."
    }
  },
  {
    label: "Lost Archives",
    synopsis: "Mystery-laced history doc chasing a missing artifact.",
    values: {
      workingTitle: "Echoes in the Cellar: The Missing Symphony",
      documentaryFocus: "The hunt for a banned orchestral score that vanished in 1938, weaving historical intrigue with modern investigation.",
      drivingQuestion: "Can a forgotten piece of music rewrite our understanding of resistance in pre-war Europe?",
      audience: "History buffs who love cinematic mysteries and narrative podcasts.",
      tone: "Investigative and cinematic",
      visualIdentity: "Neo-noir nightscapes with volumetric lighting",
      narrativeStructure: "Chronological timeline with flashback reveals",
      narratorVoice: "Dramatic, thriller-style voice with strategic pauses",
      runtime: "16 minutes",
      callToAction: "Encourage viewers to support archival preservation initiatives and subscribe for follow-up discoveries.",
      distributionPlan: "YouTube premiere with companion Spotify video podcast episode.",
      keyMoments: "Hook: Discovery of a coded message in a ruined concert hall.\nInvestigation: Digitised letters revealing a secret network of musicians.\nReveal: Modern ensemble reconstructs the lost score in an underground venue.",
      referenceWorks: "Visual language nods to Vox Darkroom and ColdFusion documentaries.",
      cinematographyNotes: "Use chiaroscuro lighting, 24fps tracking shots, macro shots of decaying sheet music, and animated archival documents.",
      musicDirection: "Hybrid soundtrack blending the reconstructed symphony with tense ambient textures."
    }
  },
  {
    label: "Future Cities",
    synopsis: "Optimistic tech-forward urban design exploration.",
    values: {
      workingTitle: "Blueprint 2050: Designing Sentient Cities",
      documentaryFocus: "How AI-driven urban planning is reimagining inclusive public spaces in megacities.",
      drivingQuestion: "What does a city designed collaboratively by citizens and algorithms feel like to live in?",
      audience: "Urban planners, futurists, and tech enthusiasts looking for optimistic innovation.",
      tone: "High-energy and inspirational",
      visualIdentity: "Clean studio look with macro inserts and infographics",
      narrativeStructure: "Problem → exploration → future vision",
      narratorVoice: "Dual narrator: expert analyst + on-the-ground reporter",
      runtime: "10 minutes",
      callToAction: "Prompt viewers to join a mailing list for design sprints and download the open data set.",
      distributionPlan: "YouTube main drop with interactive microsite embedded via Vercel Edge Functions.",
      keyMoments: "Hook: On-screen simulation of a congestion-free city morning.\nExploration: Citizen workshops feeding data into the AI planner.\nFuture vision: Immersive walkthrough of a 2050 prototype district.",
      referenceWorks: "Referencing 'The Future Of' series and Wired's design docs.",
      cinematographyNotes: "Combine steadicam walk-and-talks, luminous motion graphics, and AR-style overlays anchored to real architecture.",
      musicDirection: "Up-tempo minimal electronic score with organic percussive layers."
    }
  }
];

const initialState: FormState = {
  workingTitle: "",
  documentaryFocus: "",
  drivingQuestion: "",
  audience: "",
  tone: toneOptions[0],
  visualIdentity: visualOptions[0],
  narrativeStructure: narrativeStructures[0],
  narratorVoice: narratorVoices[0],
  runtime: "12 minutes",
  callToAction: "",
  distributionPlan: "",
  keyMoments: "",
  referenceWorks: "",
  cinematographyNotes: "",
  musicDirection: ""
};

const cardBase =
  "rounded-3xl border border-slate-800/70 bg-slate-900/40 backdrop-blur-sm shadow-xl shadow-sky-950/30";

function formatPrompt(state: FormState): string {
  const lines: string[] = [
    `You are an AI video generator crafting a YouTube documentary.`,
    `Working title: ${state.workingTitle || "To be announced"}.`,
    `Runtime target: ${state.runtime}.`,
    "",
    "Narrative blueprint:",
    `- Documentary focus: ${state.documentaryFocus || "Develop a compelling core narrative filled with discoveries, conflict, and resolution."}`,
    `- Driving question: ${state.drivingQuestion || "What core dilemma keeps the viewer engaged throughout?"}`,
    `- Narrative structure: ${state.narrativeStructure}.`,
    `- Intended audience: ${state.audience || "Curious general viewers who crave cinematic storytelling."}`,
    "",
    "Voice & tone directives:",
    `- Primary tone: ${state.tone}.`,
    `- Narrator voice: ${state.narratorVoice}.`,
    `- Maintain emotional arc that escalates tension and provides catharsis.`,
    "",
    "Visual & production language:",
    `- Signature cinematography: ${state.visualIdentity}.`,
    `${state.cinematographyNotes ? `- Additional camera direction: ${state.cinematographyNotes}.` : "- Capture dynamic establishing shots, intimate close-ups, and purposeful B-roll to reinforce narrative beats."}`,
    `${state.musicDirection ? `- Music direction: ${state.musicDirection}.` : "- Score progression: sparse textures → rhythmic momentum → soaring finale."}`,
    `${state.referenceWorks ? `- Reference works: ${state.referenceWorks}.` : "- Draw inspiration from premium investigative YouTube documentaries."}`,
    "",
    "Key moments to visualise:",
    state.keyMoments
      ? state.keyMoments
      : "- Cold open hook that drops viewers into conflict.\n- Midpoint reveal that reframes the stakes.\n- Emotional third-act payoff followed by reflective closing beat.",
    "",
    "Engagement & distribution:",
    `${state.callToAction ? `- Call to action: ${state.callToAction}.` : "- Close with a crisp call to action that invites continued exploration or community action."}`,
    `${state.distributionPlan ? `- Platform packaging: ${state.distributionPlan}.` : "- Format as a YouTube premiere-ready documentary with teaser cutdowns for Shorts."}`,
    "",
    "Deliver a detailed scene-by-scene prompt ready for advanced AI video tools. Include key visuals, narrative beats, recommended pacing, transitions, lower-third design cues, and title card treatments aligned with top-performing YouTube documentaries."
  ];

  return lines.join("\n");
}

export default function Page(): JSX.Element {
  const [state, setState] = useState<FormState>(initialState);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => formatPrompt(state), [state]);

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setState((prev) => ({
      ...prev,
      [field]: value
    }));
    setCopied(false);
  };

  const applyPreset = (preset: Preset) => {
    setState((prev) => ({
      ...prev,
      ...preset.values
    }));
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Failed to copy prompt", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-12 px-6 pb-16 pt-12 sm:px-12 lg:px-20">
      <header className="mx-auto flex max-w-6xl flex-col gap-6 text-center">
        <span className="mx-auto w-fit rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1 text-sm font-medium text-sky-200">
          DocuPrompt Studio
        </span>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-sky-100 sm:text-5xl">
          Craft cinematic prompts for YouTube documentary generators
        </h1>
        <p className="mx-auto max-w-3xl text-base text-slate-300 sm:text-lg">
          Shape resonant storytelling, cinematic direction, and release strategy in one pass. Tune the variables, select a preset,
          and export a studio-ready prompt engineered for modern AI video makers.
        </p>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-8">
          <div className={`${cardBase} p-8`}>
            <div className="mb-8 flex flex-col gap-3">
              <h2 className="font-display text-xl text-sky-100">Story DNA</h2>
              <p className="text-sm text-slate-300">
                Define the core premise, emotional hook, and structural backbone your AI video tool should follow.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Working title</span>
                <input
                  value={state.workingTitle}
                  onChange={(event) => handleChange("workingTitle", event.target.value)}
                  placeholder="E.g. Fractured Earth: Rebuilding After the Quake"
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Driving question</span>
                <input
                  value={state.drivingQuestion}
                  onChange={(event) => handleChange("drivingQuestion", event.target.value)}
                  placeholder="What if cities could predict disasters before they strike?"
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>
            </div>

            <label className="mt-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-400">Documentary focus</span>
              <textarea
                value={state.documentaryFocus}
                onChange={(event) => handleChange("documentaryFocus", event.target.value)}
                placeholder="Outline the core narrative, conflict, or revelation you want the documentary to explore."
                className="min-h-[120px] rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
              />
            </label>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Audience profile</span>
                <input
                  value={state.audience}
                  onChange={(event) => handleChange("audience", event.target.value)}
                  placeholder="E.g. Gen Z change-makers craving urgent climate narratives"
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Runtime target</span>
                <input
                  value={state.runtime}
                  onChange={(event) => handleChange("runtime", event.target.value)}
                  placeholder="10-14 minutes"
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>
            </div>
          </div>

          <div className={`${cardBase} p-8`}>
            <div className="mb-8 flex flex-col gap-3">
              <h2 className="font-display text-xl text-sky-100">Tone, Texture &amp; Worldbuilding</h2>
              <p className="text-sm text-slate-300">
                Guide the feel of the visuals, narration, and soundtrack so your AI engine makes confident stylistic decisions.
              </p>
            </div>

            <div className="grid gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Primary tone</span>
                <select
                  value={state.tone}
                  onChange={(event) => handleChange("tone", event.target.value)}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                >
                  {toneOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Visual identity</span>
                <select
                  value={state.visualIdentity}
                  onChange={(event) => handleChange("visualIdentity", event.target.value)}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                >
                  {visualOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Narrative structure</span>
                <select
                  value={state.narrativeStructure}
                  onChange={(event) => handleChange("narrativeStructure", event.target.value)}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                >
                  {narrativeStructures.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Narrator voice</span>
                <select
                  value={state.narratorVoice}
                  onChange={(event) => handleChange("narratorVoice", event.target.value)}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                >
                  {narratorVoices.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Cinematography notes</span>
                  <textarea
                    value={state.cinematographyNotes}
                    onChange={(event) => handleChange("cinematographyNotes", event.target.value)}
                    placeholder="Camera motion, lenses, shot types, graphic overlays..."
                    className="min-h-[110px] rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Music direction</span>
                  <textarea
                    value={state.musicDirection}
                    onChange={(event) => handleChange("musicDirection", event.target.value)}
                    placeholder="Instrumentation, pacing, emotional evolution..."
                    className="min-h-[110px] rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className={`${cardBase} p-8`}>
            <div className="mb-8 flex flex-col gap-3">
              <h2 className="font-display text-xl text-sky-100">Moments, Proof &amp; Release</h2>
              <p className="text-sm text-slate-300">
                Map pivotal beats, references, and publishing plans so the output feels like a greenlit series pilot.
              </p>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-400">Key moments (one per line)</span>
              <textarea
                value={state.keyMoments}
                onChange={(event) => handleChange("keyMoments", event.target.value)}
                placeholder={"Hook: Uncovered footage reveals the cover-up.\nAct II: Protagonist confronts institutional silence.\nAct III: Vision for rebuilding trust and accountability."}
                className="min-h-[140px] rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
              />
            </label>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Reference works</span>
                <textarea
                  value={state.referenceWorks}
                  onChange={(event) => handleChange("referenceWorks", event.target.value)}
                  placeholder="Existing documentaries, channels, directors to emulate."
                  className="min-h-[110px] rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Distribution &amp; CTA</span>
                <textarea
                  value={state.distributionPlan}
                  onChange={(event) => handleChange("distributionPlan", event.target.value)}
                  placeholder="Publishing cadence, supporting channels, merch drops..."
                  className="min-h-[110px] rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>
            </div>

            <label className="mt-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-400">Call to action</span>
              <input
                value={state.callToAction}
                onChange={(event) => handleChange("callToAction", event.target.value)}
                placeholder="Prompt viewers to subscribe, donate, explore resources, or join a movement."
                className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-sky-50 outline-none focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30"
              />
            </label>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className={`${cardBase} flex flex-col gap-6 p-6`}>
            <div>
              <h3 className="font-display text-lg text-sky-100">DocuDNA presets</h3>
              <p className="text-xs text-slate-400">
                Jump-start with a fully curated tone, structure, and release cadence. Modify anything after applying.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="group flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 text-left transition hover:border-sky-400/60 hover:bg-slate-900/70"
                >
                  <span className="flex items-center justify-between text-sm font-medium text-sky-100">
                    {preset.label}
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="size-5 text-sky-300 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      <path
                        fill="currentColor"
                        d="M13.172 12 9.586 8.414l1.414-1.414L16 12l-4 4-1.414-1.414z"
                      />
                    </svg>
                  </span>
                  <span className="text-xs text-slate-300">{preset.synopsis}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`${cardBase} flex flex-col gap-4 p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-sky-100">Generated prompt</h3>
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  copied
                    ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
                    : "border-sky-400/40 bg-sky-500/10 text-sky-100 hover:border-sky-300/70 hover:bg-sky-500/20"
                }`}
              >
                <svg aria-hidden viewBox="0 0 24 24" className="size-4">
                  <path
                    fill="currentColor"
                    d={
                      copied
                        ? "M9.707 16.293 5.414 12l1.414-1.414L9.707 13.465l7.465-7.465 1.414 1.414z"
                        : "M7 7V4c0-1.103.897-2 2-2h9c1.103 0 2 .897 2 2v9c0 1.103-.897 2-2 2h-3v3c0 1.103-.897 2-2 2H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2zm2-3v3h6c1.103 0 2 .897 2 2v6h3V4zM4 9v11h11V9z"
                    }
                  />
                </svg>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Paste directly into Runway, Pika, Sora, or any AI-first video workflow to generate a feature-grade documentary edit.
            </p>
            <textarea
              readOnly
              value={prompt}
              className="h-[480px] w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 text-[13px] leading-relaxed text-slate-100"
            />
          </div>

          <div className={`${cardBase} flex flex-col gap-4 p-6`}>
            <h3 className="font-display text-lg text-sky-100">Pro tips</h3>
            <ul className="list-disc space-y-2 pl-5 text-xs text-slate-300">
              <li>Feed transcripts or research notes into the focus field to anchor the AI in real-world reporting.</li>
              <li>Use the key moments section to force non-linear reveals or orchestrate cliffhangers before ad breaks.</li>
              <li>Pair the generated prompt with chapter markers in YouTube Studio for instant SEO alignment.</li>
              <li>Iterate: paste AI drafts back into the Documentary Focus field to progressively refine narrative impact.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
