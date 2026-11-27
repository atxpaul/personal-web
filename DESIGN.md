---
name: Pablo Pan · DevOps Portfolio
description: A dark developer workstation where every page is a tool an engineer would have open.
colors:
  deploy-blue: "#197fe6"
  prompt-green: "#4ade80"
  signal-green: "#0bda5b"
  amber-bolt: "#fbc02d"
  page-night: "#111921"
  console-black: "#0d1117"
  window-chrome: "#161b22"
  control-graphite: "#21262d"
  hairline: "#30363d"
  console-text: "#c9d1d9"
  ink-bright: "#ffffff"
  ink-soft: "#d1d5db"
  ink-muted: "#9ca3af"
  ink-faint: "#6b7280"
  explorer-ink: "#111418"
  explorer-hover: "#1c242e"
  explorer-line: "#293038"
  explorer-muted: "#9dabb8"
  light-close: "#ff5f56"
  light-minimize: "#ffbd2e"
  light-zoom: "#27c93f"
  syntax-rose: "#e06c75"
  syntax-sage: "#98c379"
  syntax-apricot: "#d19a66"
  syntax-orchid: "#c678dd"
  syntax-sky: "#61afef"
  syntax-comment: "#5c6370"
typography:
  display:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "3.75rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
  role:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.333
  title:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.333
  section:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  command:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  label:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.333
    letterSpacing: "0.05em"
  ascii:
    fontFamily: "Courier New, Monaco, Menlo, Consolas, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.2
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
  "12": "48px"
components:
  button-primary:
    backgroundColor: "{colors.deploy-blue}"
    textColor: "{colors.ink-bright}"
    typography: "{typography.command}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.control-graphite}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.command}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-header:
    backgroundColor: "{colors.deploy-blue}"
    textColor: "{colors.ink-bright}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  chip-flag:
    backgroundColor: "{colors.console-black}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  chip-flag-active:
    backgroundColor: "rgba(25, 127, 230, 0.2)"
    textColor: "{colors.deploy-blue}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  tag-tech:
    backgroundColor: "{colors.window-chrome}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  input-prompt:
    backgroundColor: "{colors.console-black}"
    textColor: "{colors.ink-bright}"
    rounded: "{rounded.lg}"
    height: "48px"
  window:
    backgroundColor: "{colors.console-black}"
    textColor: "{colors.console-text}"
    rounded: "{rounded.xl}"
    padding: "32px"
  window-titlebar:
    backgroundColor: "{colors.window-chrome}"
    textColor: "{colors.ink-faint}"
    padding: "12px 16px"
  card-project:
    backgroundColor: "{colors.console-black}"
    rounded: "{rounded.xl}"
    padding: "20px"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.command}"
  nav-link-active:
    textColor: "{colors.deploy-blue}"
  explorer-item:
    backgroundColor: "{colors.explorer-ink}"
    textColor: "{colors.explorer-muted}"
    padding: "6px 16px"
  explorer-item-active:
    backgroundColor: "{colors.explorer-hover}"
    textColor: "{colors.ink-bright}"
---

# Design System: Pablo Pan · DevOps Portfolio

## Overview

**Creative North Star: "The Engineer's Workstation"**

The site is one developer desktop, seen at night. Every page is a tool an engineer would really have open: Home is a terminal window running a boot script, About is an IDE with a file explorer and tabs (`about-me.md`, `skills.json`), and Projects is a shell prompt where you `grep` and pass `--flags`. Navigation reads as shell commands (`cd /projects`, `cat cv.pdf`, `./login.sh`), and the footer is an editor status bar (`Online | UTF-8 | es_ES | main`). The metaphor holds because each piece behaves like the real tool, not because it's decorated like one.

Density is moderate and calm. Wide, dark fields of page-night surround bordered panes of console-black, and the content sits in those panes the way output sits in a terminal. One blue does nearly all the signalling; prompt green marks the shell's own voice. Personality lives in the copy and labels, which are command-style and witty. The shapes and states are strict and utilitarian, like well-made dev tools.

The system is dark only. It rejects the generic SaaS landing page: no gradient hero, no stock illustration, no "trusted by" logo strip.

**Key Characteristics:**
- Workstation metaphor: terminal, IDE, and shell, each used where it fits the content.
- Dark only. Layers of near-black blue-grey separated by 1px hairlines.
- One action color (Deploy Blue), one shell color (Prompt Green), plus a One Dark-style syntax palette for code-like content.
- Space Grotesk everywhere, set like a terminal font.
- Command-style microcopy on every control: `./view_projects.sh`, `--all`, `EXECUTE`.
- Window chrome (traffic lights, title bar) marks things that are "windows"; flat panes are everything else.

## Colors

A night-mode developer palette: blue-cast near-blacks, one saturated blue for action, terminal green for the shell, and editor syntax hues for code-like data.

### Primary
- **Deploy Blue** (`deploy-blue`): The only action color. Primary buttons, the blinking block cursor, active nav and active filter, the role line under the name, hover borders on cards and secondary buttons, the `>>` and `$` markers in front of headings, focus states. It also tints: 10% under tag pills, 20% under the active filter chip, 30% on the mission statement's left rule, 10% as the hover glow on project cards.

### Secondary
- **Prompt Green** (`prompt-green`): The shell's own voice. The `pablo@portfolio:~$` prompt, the `$` in front of inputs, "Done"/"Connected" output, `lang --set`, and the admin badge. It never marks a button or link.
- **Signal Green** (`signal-green`): Healthy/up status in metric tiles and the footer's "Online" dot.

### Tertiary
- **Amber Bolt** (`amber-bolt`): Warning or efficiency accent in metric tiles and the `skills.json` file icon. Use sparingly.
- **Syntax palette** (`syntax-rose` keys, `syntax-sage` strings, `syntax-apricot` numbers, `syntax-orchid` booleans and accents, `syntax-sky` secondary, `syntax-comment` comments/null): a One Dark-style set used only for content shown as code, such as the JSON viewers, `contact_info.json`, and project-detail syntax.
- **Traffic lights** (`light-close`, `light-minimize`, `light-zoom`): the three 12px dots in a window title bar. Decorative and never interactive.

### Neutral
- **Page Night** (`page-night`): The page background behind everything, and the header at 95% (60% when backdrop blur is supported).
- **Console Black** (`console-black`): The surface of every pane: terminal window, cards, inputs, inactive chips, footer, modals.
- **Window Chrome** (`window-chrome`): One step up from Console Black. Title bars, tech tags, the footer status pill, editor tab strip.
- **Control Graphite** (`control-graphite`): Secondary buttons and the hover state of neutral controls.
- **Hairline** (`hairline`): Every 1px border and divider. This is the main structural tool.
- **Console Text** (`console-text`): The default body color set on the app root.
- **Ink scale** (`ink-bright` headings, commands, and active text; `ink-soft` nav and long-form copy; `ink-muted` descriptions and inactive chips; `ink-faint` window titles, metadata, and footer).
- **Explorer set** (`explorer-ink` sidebar surface, `explorer-line` its border, `explorer-hover` hover/active row, `explorer-muted` file names): the IDE sidebar on About. It has a slightly cooler grey than the console set, the way a real IDE's side panel differs from its editor.

### Named Rules
**The One Blue Rule.** Deploy Blue is the only color that means "you can act here". Green belongs to the shell, the syntax colors belong to code, and neither ever becomes a button.

**The Hairline Rule.** Structure comes from 1px Hairline borders on Console Black, not from fills or shadows. If two panes need separating, give them a border.

## Typography

**Display Font:** Space Grotesk (fallback `monospace`)
**Body Font:** Space Grotesk (fallback `monospace`)
**ASCII Font:** Courier New / Monaco / Menlo / Consolas, only for ASCII architecture diagrams.

**Character:** One geometric grotesk with mono-like quirks (the squared `y`, open apertures) does the work of a terminal font. Tailwind's `font-mono` and `font-display` both point at it, so "mono" in markup means Space Grotesk, not a fixed-width face. The terminal feeling comes from the content (prompts, paths, flags), not from a fixed-width font.

### Hierarchy
- **Display** (900, 2.25rem mobile → 3.75rem desktop, tight tracking): The name inside the Home terminal. Used once per site.
- **Headline** (700, ~3rem): Page titles written as commands (`ls -la ./projects`, `whoami`), often with the verb or `$` in Deploy Blue.
- **Role** (700, 1.25rem → 1.5rem, Deploy Blue): The `<Cloud Architect />` line under the name.
- **Title** (700, 1.5rem): Project card and detail titles; they turn Deploy Blue on hover when clickable.
- **Section** (700, 1.25rem, white): Section headings inside a page ("Latest Deployment", "System Metrics", "Tech Stack"). Always preceded by a Deploy Blue marker: `>>` or an icon.
- **Body** (400, 1rem / 0.875rem, line-height 1.625): Mission statement, about paragraphs, card descriptions. Keep to about 42rem (`max-w-2xl`).
- **Command** (500–700, 0.875rem): Nav links, button labels, prompts, chips. The commands visitors actually "type".
- **Label** (700, 0.75rem, uppercase, 0.05em tracking): Explorer header, tech-stack group names (`CORE DEPENDENCIES`), `LANG:`. Footer metadata drops to 10px.

### Named Rules
**The Command Label Rule.** Interactive labels are written as commands, scripts, or flags (`./contact_me.sh`, `--kubernetes`, `cd /about`). Shapes stay strict, so the copy carries the wit.

## Layout

- **Containers:** Header and footer run at a 1280px max width with 16 / 24 / 32px gutters (mobile / md / lg). Page content centers in a narrower column: 1024px (`max-w-5xl`) on Home, wider on Projects.
- **App shell:** a column of sticky header (64px tall), the route view, and a footer pinned to the bottom with `mt-auto`. On About, the view itself splits into a 256px IDE explorer and an editor area with a tab strip.
- **Rhythm:** a 4px base grid. Common steps: 8px inside controls, 16px between related items, 24px inside cards and between card groups, 32px window padding on desktop (24px mobile), 48px between major sections.
- **Responsive:** one main breakpoint at 768px (`md`). Below it the nav collapses into a toggle menu, the explorer sidebar is hidden, prompt/content pairs stack (the prompt sits above its output instead of beside it), and display type steps down.
- **Grids:** metric tiles in three equal columns; the featured project as a two-column image/text split; project cards in a responsive grid.

## Elevation & Depth

Panes are flat and windows float. Almost everything sits flat on Page Night, outlined by a Hairline border and separated by tone (Page Night → Console Black → Window Chrome → Control Graphite). Shadows mean exactly one of two things: this element is a *window* floating above the desktop, or this element is *reacting* to the pointer.

### Shadow Vocabulary
- **Window float** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`): The Home terminal and every modal (login, edit, delete). Only elements that carry window chrome.
- **Floating action** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): Fixed admin buttons that float over content.
- **Deploy glow** (`box-shadow: 0 0 20px rgba(25, 127, 230, 0.1)`): Hover on project cards, along with a 50% Deploy Blue border. A faint blue halo around the search prompt is the same idea, shown at rest.

### Named Rules
**The Window Rule.** Only elements with window chrome (traffic lights or a title bar) get the window float shadow. A card is a pane, not a window.

## Shapes

Corners are lightly rounded and get rounder as the container gets bigger. Small controls inside content (buttons, chips, tags) use 4px. Free-standing controls and inputs (header buttons, language selector, search prompt, modal buttons) use 8px; the button nested inside the search prompt uses 6px. Windows, cards, and metric tiles use 12px. Fully round shapes are kept for traffic-light dots, status dots, and the footer status pill. Every container has a 1px Hairline border; there are no borderless filled cards. Accent rules are 2px on the left, either on the mission statement or on an active explorer row.

## Components

### Buttons
Tool-tight in shape, playful in label.
- **Shape:** gently rounded (4px) inside content; 8px in the header and modals.
- **Primary:** Deploy Blue fill, white bold 0.875rem label, 10px × 20px padding, optional 14–18px leading icon (`terminal`, `code`, `login`). The label is a script name.
- **Hover:** fill drops to 90% Deploy Blue with a color transition (~150ms). There is no lift or scale.
- **Secondary:** Control Graphite fill, Hairline border, soft-ink label. On hover the border turns Deploy Blue and the label turns white.
- **Execute:** sits inside the search prompt. Primary fill, uppercase `EXECUTE` with a play icon, 6px radius.
- **Google sign-in (modal only):** white fill, near-black label, with the official multicolor G mark. This is the one button allowed to break the palette, because it carries a third-party brand.

### Chips (flag filters)
- **Style:** written as CLI flags (`--all`, `--aws`, `--kubernetes`) with a 16px leading icon, 0.875rem label, 6px × 12px padding, 4px radius.
- **Inactive:** Console Black fill, Hairline border, muted ink. Hover lightens the border to grey and the label to white.
- **Active:** Deploy Blue border and label on a 20% Deploy Blue fill. Hover fills it solid blue with white text.

### Tags
- **Tech tags:** Window Chrome fill, Hairline border, muted 0.75rem label, 4px radius. Plain lists of technologies.
- **Tech-stack pills (About):** the same pane treatment with a 6px colored dot in the technology's own brand color, followed by a bold white name.
- **Context tag:** Deploy Blue label on a 10% Deploy Blue fill with a small icon. Marks a project's provider or ID.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** Console Black on Page Night.
- **Shadow Strategy:** flat at rest; Deploy glow plus a 50% blue border on hover (see Elevation & Depth).
- **Border:** 1px Hairline, always.
- **Internal Padding:** 20–24px. The featured project card instead uses a 4px inner gutter that frames a nested image pane.

### Inputs / Fields
- **Search prompt:** a 48px Console Black bar, 8px radius, Hairline border, a Prompt Green `$` in front, white text, and a dark-grey placeholder written as a command (`grep --filter='kubernetes'...`). The Execute button sits at the right end.
- **Focus:** the browser focus ring is removed (`focus:ring-0`). The surrounding bar carries the state.
- **Error:** red text on a 10% red fill with a 20% red border and an `Error:` prefix, like a CLI error.

### Navigation
- **Header:** sticky, translucent Page Night with backdrop blur and a Hairline bottom border. A brand mark (terminal icon plus `~/devops_portfolio`) on the left, command links in the center, and the language selector and login on the right.
- **Links:** soft-ink 0.875rem medium labels. Hover and active state are Deploy Blue, and there is no underline.
- **Language selector:** a Console Black capsule reading `LANG: lang --set es`, with a gray label, a Prompt Green command, and a white value.
- **Mobile:** the links fold behind a menu toggle into a stacked list with 6px rows; active rows get a darker fill.

### Terminal Window (signature)
The Home hero. A Console Black window with 12px radius, Hairline border, and the Window float shadow. Its Window Chrome title bar holds the three traffic lights, a centered `pablo@portfolio:~` title, and `LC_ALL=…UTF-8` on the right. The body is a script transcript: a Prompt Green prompt, a white command, then output (grey log lines with green "Done", or the display name, role, and mission). It ends on a Deploy Blue block cursor blinking at 1s `step-end`. Modals reuse the same chrome and put the script's name (`login.sh`) in the title bar.

### IDE Explorer and Tabs (signature)
The About shell. A 256px Explorer Ink sidebar with an uppercase `EXPLORER` label and a file tree. Each file icon has its own hue (orange `.html`, blue `.md`, amber `.json`). Rows highlight to Explorer Hover; the active file gets a 2px Deploy Blue left rule and white text. Editor tabs sit above the content as file names with close marks.

### Status Bar Footer
A Console Black footer with a rounded Window Chrome pill: a green "Online" dot, `UTF-8`, the locale in Deploy Blue, and the git branch, separated by thin vertical rules. Social links are icon-over-label in faint grey and turn Deploy Blue on hover.

## Do's and Don'ts

### Do:
- **Do** build each new surface as a tool from the workstation: a terminal transcript, an editor file, or a shell command. Pick whichever fits the content.
- **Do** write every interactive label as a command, script, path, or flag, and translate it in all four locales.
- **Do** separate panes with 1px Hairline (`#30363d`) borders on Console Black (`#0d1117`) over Page Night (`#111921`).
- **Do** reserve Deploy Blue (`#197fe6`) for action, focus, active state, and heading markers.
- **Do** use Prompt Green (`#4ade80`) only for prompts, `$` markers, and success output.
- **Do** put window chrome (traffic lights + title bar) and the Window float shadow only on true windows: the hero terminal and modals.
- **Do** color code-like data with the syntax palette, never UI controls.

### Don't:
- **Don't** add a light mode. The workstation is dark only.
- **Don't** drift into a generic SaaS landing page: no gradient hero, no stock illustration, no "trusted by" logo strips.
- **Don't** add a second action color, or make green or a syntax hue clickable.
- **Don't** give flat cards the Window float shadow or fake window chrome.
- **Don't** use rounding above 12px on containers, or pill-shaped buttons.
- **Don't** add lift/scale hover motion. State changes are color and border transitions (~150ms), plus the 200ms route fade.
- **Don't** assume `font-mono` means fixed-width. It is Space Grotesk; only ASCII diagrams use a real monospace face.
