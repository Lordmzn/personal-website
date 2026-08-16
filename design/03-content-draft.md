# lordmzn.it — content draft (v2, for review)

Proposed structure: 3 tabs, same as today — **Portfolio** (default/landing), **Biography**, **Library**. No separate "Home" tab; Portfolio doubles as the landing page via a short hero at its top.

Open questions/assumptions are marked `[NOTE: ...]` — flag anything I guessed wrong.

---

## Portfolio (landing + project grid)

### Hero (top of this tab only — short, not the full bio)

**Eyebrow:** SYSTEMS THINKER · RESEARCHER · SLOW LEARNER

**Headline:** Study What Endures

**Subhead:**
> I build software for energy monitoring at Enersem, with a research background in AI and water systems before that. Outside of work I practice Tai Chi and Shaolin, fence with sabers and other swords sometimes, and mostly just try to get a little better at things, slowly.

**CTAs:** "See the Work" (scrolls to grid below) / "Read the CV" (links to CV PDF)

### Project grid

Grouped into two rows — current work first, since the review flagged that nothing on the site currently represents post-2018 work.

**Current**

- **EMS Platform — Enersem.** Cloud platform for industrial energy monitoring. I've helped build it since 2018, from early prototype to what runs in production today. → `enersem.eu`
- **LM Deck Tools.** A local-first Magic: The Gathering collection manager — no accounts, no servers, your data stays on your device. → app: `lordmzn.it/decktools` · code: `github.com/Lordmzn/LMdecktools`

**Research**

- **DMMT.** Program to code equations of dynamic models and simulate them fast. Python and C++. → `github.com/Lordmzn/pydmmt`
- **SEC negotiation protocol.** A negotiation protocol for identifying tradeoffs among conflicting objectives. → DOI `10.1002/2017WR021431` + `github.com/Lordmzn/evolving-tradeoffs`
- **MORE.** Multi-objective riverscape evolution — a study of optimality in river erosion processes, going back to my master's thesis. → DOI `10.1029/2018WR022977`
- **Classic Thesis @ DEIB.** A LaTeX thesis template for PoliMi's DEIB department, still getting the occasional fork. → `github.com/Lordmzn/ClassicThesis-at-DEIB`
- **Benefits of river restoration.** A review of river restoration projects across Western Europe, on flood risk and ecological benefits. → wetlands.org report

**Cut** (per the earlier review — dead or too thin to justify a card): IMRR (domain looks dead), the Raspberry Pi/IoT dashboard card (dated, low relevance, dashboard link uncertain). Say the word if you want either kept anyway.

---

## Biography

### Career arc ("How I Got Here")

Four waypoints, each with a short paragraph — not just the title/date pair from the mockup, actual sentences:

**1. Environmental Engineering** — BSc / MSc, Politecnico di Milano
> Started in environmental engineering, then narrowed into water resource management — systems where you're balancing flood risk, ecology, and human use all at once, and nobody's model is ever quite right.

**2. Water Resource Management** — Research fellow, PoliMi; visiting scholar, Penn State
> Spent time as a research fellow and teaching assistant at PoliMi, plus a stretch as a visiting scholar at Penn State — still listed as an [alumnus of the EI@DEIB group](https://www.ei.deib.polimi.it/people/alumni-past-members/). This is also where the "systems that need patience to understand" thread really started.


**3. Multi-Agent RL** — PhD, cum laude
> A PhD on inverse reinforcement learning and multi-agent negotiation, applied to water systems. Cum laude, eventually.

**4. Energy Platform** — Enersem, 2018–present
> Joined Enersem as an external consultant in 2018, became a *socio lavoratore* in 2020, and I'm Digital Solutions Manager now. I split my time between building the EMS platform itself — architecture, cloud infrastructure, prototyping — and supervising funded research projects like TEPORE and LombHe@t.

### The Practice (philosophy panel)

> I try to apply Kung Fu everywhere — to any study, practice, or pursuit that takes patience, energy, and time to complete.

I. **Depth over breadth.** Patient, sustained practice beats quick wins.
II. **Build the thing.** Don't just model it — prototype end-to-end.
III. **Show the code.** Open source, published research, no black boxes.
IV. **Fun still counts.** Watching F1, hiking when I can, and going to rock concerts.

### Outside of work

A short prose paragraph rather than a bullet list of hobbies, since that's what read best on the current one-page CV:

> I hold a black belt in Tai Chi and Shaolin ([FESK-registered](https://albonazionale.acsi.it/albo/scheda/0000273932)), and I fence with sabers and other swords at a historical fencing club. Otherwise: Formula 1 on the TV, hiking when the weather cooperates, rock concerts whenever there's one worth driving to, and whatever's on [Spotify](https://open.spotify.com/user/1168245883) at the moment.

### CV

A plain "Download CV" link (EN / IT), instead of the current full-page `<embed>` of the PDF — the embed works but gives you no actual web-native bio, which was the biggest content gap flagged in the original review. This page is meant to replace that gap; the PDF stays available as a download for anyone who wants the formal document.

---

## Library

The current bibbase/Zotero embed stays as the "full list" link, but I'd put a short hand-picked list front and center instead of leading with the iframe (which returned a 403 when I checked it from here — might be fine for you, but it's a fragile thing to lead with). Per the CV brief's own one-page prioritization:

- The three highest-impact journal articles (A5, A4, A1 — CV brief has the full citations)
- The IDEAS 2016 Best Paper award — awarded for "Water Resources Systems Operations via Multiagent Negotiation" (AAMAS 2016, Singapore); the CV PDF's own bracket reference for this award appears to be a typo pointing at the wrong paper, corrected here

Then: "Full publication list on [bibbase / Google Scholar]" as a fallback link for completeness.

---

## What I did *not* invent

No new claims beyond what's in `cv_upgrade_brief.md` or the current site — no fabricated project descriptions, no invented metrics. Where I wrote connective narrative sentences (the "How I Got Here" paragraphs), I flagged the one line that's editorializing rather than factual, above.
