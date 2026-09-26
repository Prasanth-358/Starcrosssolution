# Starcross Main Website Design System

## Core Aesthetics & Tone
The main website of Starcross is designed as an **Independent Digital Studio** representing engineering and design excellence. The tone is Architectural, Premium, and Warm. We avoid generic templates and focus on dynamic, fluid layouts with deliberate micro-animations.

**Key Characteristics:**
- **Mode:** Forced Light Mode (default), previously supported Dark Mode with deep blacks (`#000000`).
- **Layout:** Fluid typography scaling from 12px (mobile) to 16px (desktop).
- **Glassmorphism:** Strategic use of blurred panels and soft shadows.
- **Micro-animations:** Subtle hover states, `reveal` animations, and 3D transforms.

## Color Palette (Light Mode Focus)
- **Primary Accent (Studio Amber):** `#e3a23b`
- **Secondary Accent:** `#f2c879`
- **Background / Surface:** `#ffffff`
- **Secondary Surfaces:** `#f9fafb`, `#f3f4f6`
- **Typography:** `#111827` (Primary text), `#4b5563` (Subtle text)

## Typography
- **Primary Font:** Plus Jakarta Sans (`var(--font-jakarta)`)
- **Secondary / Data Font:** Inter (`var(--font-inter)`)
- Font sizes dynamically scale via fluid CSS clamps, ensuring perfect readability across all device viewports.

## Key Components
### 1. Hero Studio (The Core)
- **Visuals:** Features dynamic rotating 3D orbital rings on the Z/X axes that scale intelligently across viewports (`maxSize: 90vw`).
- **Interactivity:** Floating transparent cards ("billboards") that react to cursor movement and provide layered context without cluttering the screen.
- **Background:** Grid pattern (`background-grid`) combined with a soft amber radial gradient that adds depth.

### 2. Services Explorer
- **Interactive Requirement Selector:** Users click their business goals (e.g., "Build online presence") to dynamically filter and reveal suggested tech solutions.
- **Service Carousel:** Horizontally scrolling, snap-aligned 3D cards that display the services with hovering image scale effects and gradient overlays.

### 3. Project Brief Wizard
- **Booking Flow:** A multi-step animated form wizard that guides users through project requirements, budget selection, and contact details.
- **UI Element:** Replaced traditional checkboxes with clean, native dropdown menus for a minimal and straightforward user experience.

### 4. Navigation
- **Navbar:** Sticky top navigation that becomes a solid white background upon scrolling down, dropping the glass blur to maintain sharp contrast and readability.

## Best Practices
- **Animations:** Animations should feel smooth (using `0.3s ease` to `0.7s` durations) rather than abrupt.
- **Borders:** Use subtle borders (`border-[var(--border)]`) to define sections instead of heavy background differences.
- **Shadows:** Use deep, soft shadows (`shadow-[0_20px_40px_rgba(0,0,0,0.16)]`) for hover states on primary cards.
