# Implementation Plan: Studio Transformation

Transform the current portfolio into a high-end studio site inspired by `charlieosborne.co`.

## 1. Brand Palette Unification
- **Goal**: Eliminate 'nature-tech' lime green and unify around a 'minimalist studio' palette.
- **Actions**:
    - Modify `app/globals.css` to redefine CSS variables.
    - Remove all references to lime green/yellow-green.
    - **New Palette**:
        - `--bg`: #050505 (Deep Black)
        - `--surface`: #0f0f0f (Dark Charcoal)
        - `--surface-2`: #1a1a1a (Lighter Charcoal)
        - `--ink`: #f7f7f5 (Off-White)
        - `--muted`: #a6a6a6 (Studio Gray)
        - `--accent`: #f15a24 (Burnt Orange)
        - `--accent-ink`: #ffffff (White)

## 2. Immersive Project Layout
- **Goal**: Transition from split-screen `project-row` to a sequential, high-impact list.
- **Actions**:
    - **CSS Changes (`app/reference.css`)**:
        - Update `.project-row` from `grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr)` to a stacked layout or a centered focus layout.
        - Increase `.project-image` size to take center stage (potentially full-width or large centered).
        - Refine `.project-info` to be centered or asymmetric but cleaner.
    - **Artwork Upgrade (`app/page.tsx`)**:
        - Update `ProjectArtwork` components to use more sophisticated shadows, borders, and layouts instead of flat CSS mocks.
        - Introduce subtle transitions or scale effects on hover for the artwork.

## 3. Refined Hero Section
- **Goal**: Balance visual noise and prioritize brand typography.
- **Actions**:
    - **Typography**: Tighten `.hero-name` letter-spacing (e.g., `-0.08em`) and ensure it is the dominant element.
    - **Visuals**: 
        - Adjust `OrangeCanvas` and `FallingLineLights` opacity.
        - Modify `.hero-grid` to be more subtle (lower opacity white lines).
        - Ensure the `hero-bottom-glass` effect doesn't clash with the new palette.

## 4. Strategic Content Shift (Creative Technologist)
- **Goal**: Pivot from "Student/Developer" to "Creative Technologist/Studio".
- **Actions**:
    - **Capabilities Section**: Rename "Skills" to "Capabilities". 
    - **Problem-Solving Pivot**: Rewrite the "Approach" section.
        - *Old*: Focus on ranks/scores.
        - *New*: Focus on "algorithmic efficiency applied to user experience" and "problem-solving methodology".
    - **Copy Update**:
        - Change "Frontend developer" $\rightarrow$ "Creative Technologist".
        - Change "Competitive programmer" $\rightarrow$ "Algorithmic Strategist".
        - Update "About" section to sound like a professional partner (e.g., "specializing in high-performance interfaces" instead of "student at...").

## 5. Typography & Details
- **Goal**: Enforce strict high-end studio aesthetics.
- **Actions**:
    - **Global**: Apply extreme negative letter-spacing to all `h1`, `h2`, `h3`.
    - **Labels**: Force `text-transform: uppercase` and `letter-spacing: 0.1em` for all small labels/meta tags.
    - **Whitespace**: Increase vertical padding in `.works-section` and `.about-section` to create "breathable" luxury.

## Critical Files for Implementation
- `app/globals.css`: Color system and global variables.
- `app/reference.css`: Layout, project row, and typography details.
- `app/page.tsx`: Content rewrite, Artwork components, and Hero structure.

## Execution Steps
1. **Phase 1: Visual Foundation**: Update `globals.css` and `reference.css` with the new palette and typography rules.
2. **Phase 2: Content Pivot**: Rewrite `app/page.tsx` copy and rename sections (Skills $\rightarrow$ Capabilities).
3. **Phase 3: Layout Overhaul**: Transform `.project-row` in `reference.css` and update `ProjectArtwork` in `page.tsx`.
4. **Phase 4: Hero Polish**: Tune `OrangeCanvas` and `FallingLineLights` integration.
5. **Phase 5: Final Audit**: Review negative space and letter-spacing across all screen sizes.
