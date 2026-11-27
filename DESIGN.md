---
name: Pablo Pan · DevOps Portfolio
description: A dark developer workstation where every page is a tool an engineer would have open.
colors:
  deploy-blue: "#197fe6"
  deploy-blue-hover: "#3a92ec"
  prompt-green: "#4ade80"
  amber-bolt: "#fbc02d"
  page-night: "#111921"
  console-black: "#0d1117"
  console-deep: "#0b0f14"
  window-chrome: "#161b22"
  hairline: "#30363d"
  console-text: "#c9d1d9"
  console-muted: "#8b949e"
  gutter-ink: "#6e7681"
  ink-bright: "#ffffff"
  light-close: "#ff5f56"
  light-minimize: "#ffbd2e"
  light-zoom: "#27c93f"
  syntax-rose: "#e06c75"
  syntax-sage: "#98c379"
  syntax-apricot: "#d19a66"
  syntax-orchid: "#c678dd"
  syntax-sky: "#61afef"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "5.25rem"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  command-title:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  section:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  command:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.333
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "14": "56px"
  "24": "96px"
components:
  button-primary:
    backgroundColor: "{colors.deploy-blue}"
    textColor: "{colors.ink-bright}"
    typography: "{typography.command}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0 16px"
  button-ghost:
    backgroundColor: "{colors.window-chrome}"
    textColor: "{colors.console-text}"
    typography: "{typography.command}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0 16px"
  flag:
    textColor: "{colors.console-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "6px 8px"
  filter-flag-active:
    backgroundColor: "rgba(25, 127, 230, 0.15)"
    textColor: "{colors.ink-bright}"
    rounded: "{rounded.md}"
    height: "32px"
  pane:
    backgroundColor: "{colors.console-black}"
    rounded: "{rounded.lg}"
  pane-head:
    backgroundColor: "{colors.window-chrome}"
    textColor: "{colors.console-muted}"
    typography: "{typography.label}"
    height: "40px"
  window:
    backgroundColor: "{colors.console-black}"
    textColor: "{colors.console-text}"
    rounded: "{rounded.xl}"
  window-titlebar:
    backgroundColor: "{colors.window-chrome}"
    textColor: "{colors.console-muted}"
    height: "44px"
  nav-link:
    textColor: "{colors.console-muted}"
    typography: "{typography.command}"
  nav-link-active:
    textColor: "{colors.ink-bright}"
---

# Design System: Pablo Pan · DevOps Portfolio

## Overview

**Creative North Star: "The Engineer's Workstation"**

The site is one developer desktop, seen at night. Every page is a tool an engineer would really have open. Home is a split terminal running a boot script next to `neofetch`. Projects is `ls -la` output you can `grep` and filter with `--flags`. A project is a YAML manifest open in vim. About is a markdown file and a `contact_info.json`. The blog is an empty directory, for now. Navigation reads as shell commands (`cd /projects`), and the footer is a status bar. The metaphor holds because each piece behaves like the real tool, not because it's decorated like one.

Two voices carry the type system. **The machine speaks in JetBrains Mono**: prompts, commands, paths, flags, data, code. **The person speaks in Space Grotesk**: the name, project titles, the mission, the paragraphs about him. That split keeps the workstation real while the content still reads easily for recruiters and clients.

The system is dark only. It rejects the generic SaaS landing page: no gradient hero, no stock illustration, no "trusted by" logo strip, no hero-metric tiles.

**Key Characteristics:**
- Workstation metaphor: terminal, `ls` listing, vim, markdown, JSON, each used where it fits the content.
- Dark only. Layers of near-black blue-grey separated by 1px hairlines.
- One action color (Deploy Blue) and one shell color (Prompt Green), plus a One Dark-style syntax palette for code-like content.
- Two typefaces with strict jobs: JetBrains Mono for the machine, Space Grotesk for the person.
- Command-style microcopy on every control: `./view_projects.sh`, `--aws 3`, `cat project.yml`.
- Every page opens with the same page header: a Prompt Green `$` followed by the page's command as an h1.

## Colors

### Primary
- **Deploy Blue** (`deploy-blue`, hover `deploy-blue-hover`): The only action color. Primary buttons, links (`cd ./repo`), the block cursor, the active nav underline, the active tab underline, the active filter, the vim mode block, focus rings, and the `>>` / `##` markers in front of section headings. The text selection is Deploy Blue at 40%.

### Secondary
- **Prompt Green** (`prompt-green`): The shell's own voice and live status: `pablo@portfolio:~$`, the `$` in front of page titles and inputs, `[ OK ]`, `DEPLOYED`, "Open for hire", and the footer's "Online". Live states get a soft pulsing dot. The text caret is Prompt Green. It never marks a button or link.

### Tertiary
- **Amber Bolt** (`amber-bolt`) and **light-minimize** (`#ffbd2e`): JSON/YAML file icons and non-deployed status. Use sparingly.
- **Syntax palette** (`syntax-rose` keys, `syntax-sage` strings, `syntax-apricot` numbers, `syntax-orchid` booleans, `syntax-sky` secondary values): only for content shown as code (YAML, JSON). The neofetch color strip also uses it.
- **Traffic lights**: the three 12px dots, only on true windows.
- **Brand dots**: each technology in a stack list shows a 6–8px dot in its own brand color. This is data, not decoration.

### Neutral
- **Page Night** (`page-night`): the page background, and the header at 75–90% with backdrop blur.
- **Console Black** (`console-black`): the surface of every pane and window.
- **Console Deep** (`console-deep`): one step darker. Used for the neofetch pane and the search input inset, so a split reads as a split.
- **Window Chrome** (`window-chrome`): title bars, pane heads, tab strips, column headers, the row hover, and the ghost button fill.
- **Hairline** (`hairline`): every 1px border and divider. This is the main structural tool.
- **Console Text** (`console-text`): body and lead copy.
- **Console Muted** (`console-muted`): secondary text, metadata, labels, placeholders. 6.2:1 on Console Black. Never use Tailwind's gray-500/600 for readable text, because they fail 4.5:1.
- **Gutter Ink** (`gutter-ink`): line numbers only. Decorative and `aria-hidden`.

### Named Rules
**The One Blue Rule.** Deploy Blue is the only color that means "you can act here" (or "you are here"). Green belongs to the shell, the syntax colors belong to code, and neither ever becomes a button.

**The Hairline Rule.** Structure comes from 1px Hairline borders on Console Black, not from fills or shadows.

## Typography

**Machine voice:** JetBrains Mono (400/500/700), loaded from Google Fonts. Tailwind `font-mono`.
**Human voice:** Space Grotesk (400–700). Tailwind `font-sans` / `font-display`.

### Hierarchy
- **Display** (Grotesk 700, 2.75rem → 5.25rem, line-height 0.95, -0.04em): the name in the Home terminal. Used once per site.
- **Headline** (Grotesk 700, 2.25rem → 3.75rem, -0.035em): project titles on the detail page.
- **Command title** (Mono 700, 2rem → 3rem, -0.03em): page h1s written as the command that "opened" the page (`ls -la ./projects`, `whoami`, `ls ./blog`), after a Prompt Green `$`.
- **Title** (Grotesk 700, 1.5rem → 2rem): the featured project card.
- **Section** (Grotesk 700, 1.25rem → 1.5rem): section headings, always after a Deploy Blue mono marker (`>>`, or `##` inside markdown).
- **Lead** (Grotesk 400, 1.125rem → 1.25rem, 62ch): the line under every page header, the mission, project summaries.
- **Body** (Grotesk 400, 1.0625rem, line-height 1.75, 65ch): long-form copy (about-me.md).
- **Command** (Mono 500, 0.8125–0.875rem): nav links, buttons, prompts, links.
- **Label** (Mono 400, 0.6875–0.75rem): metadata, flags, pane heads, column headers (uppercase with 0.08em tracking only for column headers).

### Named Rules
**The Two Voices Rule.** If a terminal would print it, set it in mono. If a person wrote it, set it in Grotesk. Never use mono for paragraphs or Grotesk for a command.

**The Command Label Rule.** Interactive labels are commands, scripts, paths, or flags (`./contact_me.sh`, `--kubernetes`, `cd /about`), translated in all four locales.

## Layout

- **Container:** a single `.page` container everywhere (header, every view, footer): max 1152px (`max-w-6xl`), 16px / 32px gutters (mobile / md). Header, content, and footer share the same left edge.
- **Page header:** every view except Home opens with `PageHeader`: the `$` + command h1, a lead paragraph, and optional metadata (`total 8`).
- **Rhythm:** a 4px base grid. 56–96px between major sections, 20–24px between a section heading and its content, 40px window padding on desktop (24px on mobile).
- **Home:** one wide window split 1fr / 21rem (terminal | neofetch). It stacks below `lg`.
- **About:** a document pane (tabs: `about-me.md`, `skills.json`) beside a sticky 22rem sidebar (`contact_info.json` and a link to projects). It stacks below `lg`.
- **Projects:** the command line (search and flags), the featured project, then the `ls -la` list.
- **Responsive:** nav collapses below `md`; listing rows stack (title, description, flags, then date and repo on one line); display type steps down. No horizontal scroll at 390px.

## Elevation & Depth

Panes are flat; windows float. Shadows mean one thing: this element is a window above the desktop.

### Shadow Vocabulary
- **Window float** (`0 25px 50px -12px rgb(0 0 0 / 0.5)`): the Home terminal, the project-detail vim window, the 404 terminal, and modals.
- **Floating action** (Tailwind `shadow-lg`): fixed admin buttons.

### Named Rules
**The Window Rule.** Only true windows get traffic lights and the float shadow. Everything else is a `.pane`: Hairline border, no shadow, no fake chrome. Hover states on panes are color only (border to Deploy Blue, or the row fills to Window Chrome). There are no glows.

## Shapes

4px for flags and tiny controls. 6px for buttons, inputs, and filter flags. 8px for panes. 12px for windows. Full round only for status dots and traffic lights. No pills, no one-sided accent bars on boxes. Active states use a full-width 2px bottom underline (nav, tabs).

## Components

All shared primitives live in `src/assets/styles/main.css` (`@layer components`) and in `src/components/`.

### Buttons (`.btn`)
- **`.btn-primary`:** Deploy Blue fill, white mono label, 40px tall, 6px radius, optional 18px leading icon. Hover lightens to `deploy-blue-hover`. No lift or scale.
- **`.btn-ghost`:** Window Chrome fill, Hairline border, Console Text label. Hover turns the border Deploy Blue and the label white.
- **Quiet header action** (login/logout): borderless muted mono text that fills Window Chrome on hover. Visitors never need it, so it must not compete with their actions.

### Flags (`.flag`)
A technology written as a CLI token: mono 12px, Console Muted, Hairline border, 4px radius. On the featured card they read `--kubernetes`; in stack lists they get a brand dot.

### Filter flags
`--aws 3`: mono 12px, 32px tall, 6px radius, with the match count. Active: Deploy Blue border, 15% blue fill, white label, blue count. `aria-pressed`.

### Command line (search)
A pane holding an inset Console Deep input (48px, Prompt Green `$`, mono text, `grep -i 'kubernetes'` placeholder, Prompt Green caret) with a `↵ run` primary button, and the filter flags underneath. Focus turns the inset border Deploy Blue.

### Panes (`.pane`, `.pane-head`)
Console Black, Hairline border, 8px radius. A `.pane-head` is a 40px Window Chrome strip with a mono file name (`contact_info.json`, `~/blog`).

### Project list (`ProjectList.vue`, signature)
The `ls -la` listing used on Projects and for related projects. A pane with a mono uppercase column header (Name / Stack / Modified), then divided rows: Grotesk title (the whole row is the link), a two-line muted description, up to three flags plus `+n`, a relative `<time>` in long form ("3 years ago", never "3y"), and a `cd ./repo →` link. The row fills Window Chrome on hover and focus.

### Featured project (`ProjectCard.vue`)
A pane split 5/7: the project image in grayscale, washed with Deploy Blue and fading into Console Black, with the live status and provider printed over it in mono; then the `~/projects/<id>` path, the title, the description, flags, and `cat project.yml` (primary) plus `Ver código` (ghost).

### Terminal window (Home, signature)
A Console Black window with a 44px title bar (`pablo@portfolio: ~ — zsh`, `LC_ALL=…UTF-8`). On the left, a transcript: `[ OK ]` boot lines, `echo $NAME`, the display name, the role in mono, `cat ./mission_statement.txt`, the mission in Grotesk, the live status, both CTAs, and a blinking block cursor. On the right, a Console Deep neofetch pane listing only real data (role, location, status, LinkedIn, stack) and ending in the palette strip. The boot sequence is the site's one authored motion: lines resolve in from a 6px blur, staggered 110ms, with an expo ease-out. It is disabled under `prefers-reduced-motion`.

### Vim window (project detail)
The project's manifest as YAML in a vim window: the file tab in the title bar, real line numbers (measured from the content height), and a status bar with a Deploy Blue `NORMAL` block, the file name, and the line count. Above it sits a real page header: status, provider, version, and date in mono, then the title as a Grotesk headline and the summary as a lead.

### Document tabs (About)
A Window Chrome strip of `button[role=tab]` file tabs with colored file icons. The active tab takes the Console Black surface and a 2px Deploy Blue bottom underline.

### Navigation
A sticky translucent header holds the brand (a `>_` key-cap in Prompt Green plus `~/devops_portfolio`), the mono command links, and on the right the `lang es` select and the quiet login. The active link is white with a 2px Deploy Blue underline that sits on the header's bottom border and scales in. Links never wrap; between md and lg they tighten and the login collapses to its icon (keeping its accessible name).

### Status bar footer
Two rows. The first has social links as `~/github ↗` paths on the left and the status bar on the right (pulsing "Online", `UTF-8`, locale, branch). Below a hairline, the copyright and the storage notice in 11px Console Muted.

## Do's and Don'ts

### Do:
- **Do** build each new surface as a tool from the workstation, and open it with `PageHeader`.
- **Do** follow the Two Voices Rule: mono for the machine, Grotesk for the person.
- **Do** use the shared primitives (`.page`, `.pane`, `.btn-*`, `.flag`) instead of re-deriving colors and radii per view.
- **Do** use `console-muted` for secondary text, and theme browser surfaces (selection, caret, scrollbars, focus) from the palette.
- **Do** show only true facts in data panes (neofetch, contact_info.json). Placeholders stay hidden until they are real.

### Don't:
- **Don't** add a light mode.
- **Don't** drift into a generic SaaS landing page: no gradient hero, no stock illustration, no logo strips, no hero-metric tiles.
- **Don't** add a second action color, or make green or a syntax hue clickable.
- **Don't** use glows, blurred gradient halos, or hover lift/scale. State changes are color and border transitions (~150ms).
- **Don't** give panes window chrome or the float shadow.
- **Don't** use same-size icon cards as a layout. Lists of things are listings.
- **Don't** use rounding above 12px, pill buttons, or one-sided accent bars on boxes.
