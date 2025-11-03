0. Big idea (what the audience should feel)
“Chaos → Cohesion → Autonomy.” Scattered knowledge, models, and tools converge inside plugged.in (the Station). PAP provisions identity, security, and control; agents leave the Station as independent craft with their own lifecycles—autonomy without anarchy (kill authority, heartbeats, ownership transfer).
Pap — Plugged
1. Structure (90–120 seconds)
Scene 1 — Cold open: “Scattered” (0:00–0:12)
Visual: Fast montage of CSVs, PDFs, vector DB icons, terminal logs, API tiles, model logos (OpenAI, xAI, local/Llama), tools (Python, bash, HTTP, GitHub), clouds. Lines flicker, nothing connects.
VO: “Data, models, and tools are everywhere—useful, but fragmented.”
Scene 2 — The Station appears (0:12–0:25)
Visual: Your first pond diagram (the PNG you shared) floats in 3D; the camera dives toward the Agent Control Center. UI neon glow.
VO: “Plugged.in brings them to one place—the Station.”
Scene 3 — ComfyUI‑style wiring (0:25–0:45)
Visual: Boxes labeled Data, RAG, Tools, Models, Templates snap into a node graph; animated flows travel along edges. A PAP proxy padlock lights up (mTLS).
Callouts (lower‑third): mTLS, Ed25519 signatures, DNS identity.
VO: “We wire agents with the knowledge and tools they need, and secure every hop—mutual TLS, signed messages, DNS‑based identity.”
Pap — Plugged
Scene 4 — PAP handshake (0:45–1:00)
Visual: Minimal terminal overlay: Provision → Issue cert + agent_uuid → Handshake → Heartbeat. A dotted heartbeat pulses along a line; a kill control lever (safety) flashes “armed”.
VO: “PAP provisions each agent: invite token, certificate, version‑negotiated channel, then steady heartbeats with independent metrics reporting—and emergency kill authority if needed.”
Pap — Plugged
Scene 5 — Autonomy moment (1:00–1:18)
Visual: The node cluster folds into a stylized spaceship (your agent). It undocks from the Station and streaks out. HUD shows: OK 200, TIMEOUT retry, VERSION_NEGOTIATED=1.0.
VO: “Configured, tested, and auditable—agents ship as autonomous identities, not workflows.”
On‑screen micro‑text: Lifecycle: provision → operate → transfer → terminate.
Pap — Plugged
Scene 6 — Marketplace + open router vibe (1:18–1:32)
Visual: A Marketplace panel: pick an Agent Template; choose Models (OpenAI / xAI / local), like an open‑router lane selector. One‑click deploy.
VO: “Templates speed creation; choose centralized or distributed LLMs—the Station routes, you retain control.”
Scene 7 — Tagline + CTA (1:32–1:45)
Visual: Fleet of agent‑ships warps out; Station halo glows.
Super: plugged.in + PAP — Autonomy without anarchy
CTA: “Launch your first agent at plugged.in”
Button: Marketplace • Docs • GitHub
Why the agent/ship metaphor? Agents with perception, reasoning, memory, and action modules are well‑established in the literature; your video shows them leaving the dock once they’ve been equipped.
2510.09244v1
2. Script (voiceover draft)
“Data, models, and tools are everywhere—useful, but fragmented.”
“Plugged.in is the Station: one place to connect knowledge, models, and tools.”
“With PAP, every message is verified and every identity is real—mutual TLS, signed payloads, DNS‑based routing.”
Pap — Plugged
“Provision with an invite token. Get a certificate. Negotiate versions. Start heartbeats. Monitor. Audit.”
Pap — Plugged
“Agents aren’t workflows—they’re autonomous identities with lifecycles, safeguards, and kill authority when safety matters.”
Pap — Plugged
“Pick a template. Wire tools and memory. Choose your model provider—centralized or distributed.”
“Launch. Your agent undocks, acts, learns, and reports. Autonomy without anarchy.”
3. Visual system & assets A. Design language
Boxes as nodes (ComfyUI feel): rounded 2D cards with ports on left/right, categories by color: Data (teal), Tools (purple), Models (blue), Memory/RAG (amber), PAP/Proxy (white with cyan edge).
Flows: 3D curves with emission shader; animate “trim” to show packets; heartbeats as dotted pulses.
Security: padlock glyph + subtle certificate card with agent_uuid, DNS, TLS1.3+.
Station: white/graphite ring station with inner docks; marketplace as a radial bay.
B. 3D “spaceship” motif
Start from the node cluster: extrude the card stack, bevel edges, inset a cockpit window.
Add thrusters (emissive cones), a subtle hull panel normal map.
Keep it low‑poly, clean silhouettes for readability.
4. Blender build (Eevee for speed)
Collections
01_nodes (cards, ports)
02_connections (Bezier curves)
03_station (ring + docks)
04_agents (ships)
05_overlays (HUD, callouts with Grease Pencil or Image planes)
Geometry Nodes snippets
Flow along a path: Bezier → Curve to Mesh (profile circle) → Trim Curve animated 0→1 → Emission shader (bloom on).
Heartbeat pulses: Instance small spheres along the curve with a sine‑offset on position; animate scale bursts on a driver keyed to BPM (e.g., 0.8 Hz).
Box ports: Use empty objects as anchors; a GN modifier spawns curves between pairs, then animates the trim factor to “wire” in real time.
PAP Handshake screen (simple and factual):
Plane with an animated shader/text overlay:
PROVISION: invite_token ✓ CERT: issued (agent_uuid=550e…) TLS: mTLS established (TLS1.3) VERSION_NEGOTIATED: 1.0 HEARTBEAT: IDLE @30s
(Use your actual field names from PAP v1—accurate to spec.)
Pap — Plugged
Camera & lighting
One master dolly with track‑to damped target; shallow DoF only in hero moments.
Three‑point lights + HDRI; enable bloom and a touch of screen‑space reflections.
5. Resolve (edit + Fusion)
Timeline
1080p or 1440p @ 24fps for a cinematic feel; deliver main (16:9) + social cut (9:16, 1:1).
Music: driving, minimal, ~100–110 BPM.
SFX: data blips, soft whooshes, servo locks, heart monitor click for heartbeat moments.
Fusion nodes
Callouts: Text+ → Background → DVE for slide‑in; connect to Planar Tracker (attach to nodes or ship).
Marketplace panel: two columns, animated selector; quick particle burst on “Deploy”.
Glitch to ship transform: Dissolve + Displace + RGB split for 8–12 frames, then cut to the 3D ship.
Grade
Cool base (cyan/indigo) with warm accent (amber in RAG/Memory) for visual separation.
6. Content accuracy (what to show / what not to)
Show mTLS, signed payloads, nonces/replay protection, version negotiation, heartbeats separate from metrics, kill authority, ownership transfer—these are core PAP ideas. Don’t show CPU/MEM inside heartbeats (that’s a Metrics RPC in PAP).
Pap — Plugged
When illustrating an agent, depict internal blocks as perception / reasoning / memory / action to reflect current agent literature; this is widely used and accurate.
2510.09244v1
Use fake tokens/UUIDs/certs—never real secrets.
7. Practical shot list (condensed) T (sec) Shot Notes 0–5 Rapid “scatter” montage Hard cuts, glitch; no branding yet 5–12 Station reveal Logo lockup; parallax on diagram 12–25 Node wiring begins Ports light up, curves grow 25–32 Security pass Padlock+cert, “mTLS established” 32–45 PAP handshake Provision → cert → negotiate → heartbeat (IDLE 30s)
Pap — Plugged
45–60 Agent capability blocks Perception / Reasoning / Memory / Action labels
2510.09244v1
60–72 Ship transform Glitch‑morph boxes → ship; thrusters light 72–90 Marketplace Template pick, model route; “Deploy” 90–105 Fleet warp Multi‑agent flyout; dotted heartbeats 105–115 Tagline + CTA “Autonomy without anarchy” 115–120 Logo endcard URL + GitHub 8) Asset checklist
Icons: CSV/PDF, Vector DB, REST, Python, Bash, GitHub, S3/cloud.
Model chips: “OpenAI”, “xAI”, “Local” (use neutral glyphs/labels to avoid trademark issues).
Typography: Inter or IBM Plex Sans; monospace for protocol callouts (JetBrains Mono).
SFX: 3–4 data beeps, 2 whooshes, 1 warp, 1 heartbeat click.
9. File/folder hygiene /project /blender station.blend nodes_and_flows.blend agent_ship.blend /resolve pluggedin_pap_launch.drpf /plates 01_scatter.mov 02_station_graph.mov ... /sfx /music /fonts
10. Optional: re‑use your static diagram
Import the PNG into Blender as an image plane; animate depth and slight tilt for a living “blueprint.”
Then transition to the live node graph version.
11. Sanity checks against PAP (to keep the explainer honest)
Heartbeat: liveness only; metrics go via Metrics.Report. (Do show both, but label correctly.)
Pap — Plugged
Handshake: include invite token → cert issued → version negotiation; display VERSION_NEGOTIATED=1.0.
Pap — Plugged
Controls: show “Terminate / Force Kill” as reserved for the Station, not peer agents.
Pap — Plugged
Ownership transfer (optional insert): “TRANSFER_INIT → STATE_RECEIVED → TRANSFER_COMMIT” along a secure channel.
Pap — Plugged
12. Why this narrative lands now (zeitgeist)
Agentic systems are moving from “prompt + tool call demos” to operational autonomy with clear lifecycles, memory, and safety rails. Viewers have seen node‑graph UIs (ComfyUI, Audio/Video pipelines); your video meets them where they are, then shows the infrastructure leap: PAP’s operational backbone (versioning, signatures, liveness, kill authority, transfer)—the missing piece that turns demos into systems.
13. Next steps (fastest path to done)
Lock the script (above) → 1‑page client sign‑off.
Block the node graph in Blender; animate 3 hero flows + handshake overlay.
Build the ship (low‑poly) and the undock shot.
Cut in Resolve, temp music/SFX → timing pass.
Polish: color, callouts, marketplace UI, legal scrub (no real keys).
Export: Main 16:9 (ProRes/DNxHR master + H.264), Social 9:16.
If you want, I can also draft the on‑screen labels (exact strings) for the handshake and heartbeat frames so they match your current PAP‑RFC‑001‑rev2 field names verbatim.
Pap — Plugged