# Project: Aldo Giuliani Photography - Luxury Digital Experience
## Brand Identity: "The Eternal Story"
- **Photographer:** Aldo Giuliani
- **Style:** Minimalismo "Apple-style", Luxury, Elegance.
- **USP:** Natural light mastery, organic editing, narrative depth.

## Visual Design System (Inspired by Reference)
- **Palette:**
    - #FFFFFF (Pure White) - Primary Background.
    - #1A1A1A (Rich Black) - Text & Depth.
    - #C5A059 (Champagne Gold) - Thin borders, icons, specific CTA highlights.
    - #F5F5F7 (Apple Grey) - Subtle section backgrounds.
- **Typography:**
    - Headings: Elegant High-Contrast Serif (e.g., 'Cormorant Garamond' or 'Bodoni').
    - Body: Ultra-minimal Sans-serif (e.g., 'Inter' or 'SF Pro' with 0.05em letter spacing).
- **Animations:** "Polite & Educated" (Slow fades, subtle parallax, 1.2s easing).

## Architecture & Components
### 1. Home Page: The Infinite Loop
- **Logic:** Continuous vertical scrolling loop. 
- **Antigravity Feature:** Dynamic content refresh. Every time the loop restarts, the AI orchestrator re-sequences the images to prevent visual fatigue.
- **CTAs:** Frequent "Chiedi un Preventivo" buttons with gold ghost-styling.

### 2. Service Pages (Vertical Focus)
- Categories: Matrimoni, Reportage, Sport, Moda, WildLife.
- **Feature Component: [Marquee-Gallery]**
    - Technical: Flex wrapper with 50% translation loop.
    - Interaction: `animation-play-state: paused` on hover.
    - Flow: Linear, 45s-60s duration.

### 3. Lead Generation (Quote & Contacts)
- Minimalist Form: Fields for Service Type (pre-selected based on page), Date, and Narrative Vision.

## Antigravity Technical Logic
- **Virtualization:** Use Antigravity to handle infinite DOM nodes without memory leaks.
- **AI Vision:** Gemini 1.5 Pro analyzes portfolio images to generate semantic metadata and "poetic alt-text" for SEO.