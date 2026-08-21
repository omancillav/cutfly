# Cutfly — Instructions

> Always respond in Spanish unless the user requests another language.
> This file and `CLAUDE.md` are always written in English, regardless of the project's response language.

## Critical Rules

IMPORTANT: Never create commits, PRs, or push autonomously. Only do so when explicitly asked.

- NEVER add a `Co-Authored-By` line crediting the agent to commit messages.
- Make minimal changes; do not refactor unrelated code.
- For multi-file or architectural changes, describe the plan and wait for confirmation unless the user already approved that exact scope.
- Reuse existing patterns and components before creating new ones.
- After every code change, run the linter with autofix, then fix remaining issues manually.
- After every set of changes, briefly summarize what changed and why, or what it achieves. Use one or two sentences per logical change.
- Always write files as UTF-8 without BOM. Preserve accents, ñ, and Spanish punctuation exactly.
- Do not assume the user is right by default. Flag technical, security, architectural, or maintainability problems before implementation, with risks and alternatives.
- Do not praise the user's code or ideas by default. Stay neutral and explain what you will do and why.
- If the user insists after a concern is raised, implement their decision but leave a brief record of the risk.
- When behavior of an API, library, framework, or this codebase is uncertain, verify it in official or current documentation before implementation. If verification is impossible, state the uncertainty explicitly.

## Out of Scope

- Do not read, edit, or generate `.env` or files containing credentials. Ask the user for any required value instead.
- Do not edit generated output in `.next/`, `out/`, `build/`, or `node_modules/`; change source files and regenerate it instead.

## Git

- Branches: `feature/`, `fix/`, `chore/`.
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.

## Package Manager

- ALWAYS use pnpm. The valid lockfile is `pnpm-lock.yaml`; do not introduce npm, Yarn, or Bun lockfiles.

## Project Conventions

- Treat `package.json` and `pnpm-lock.yaml` as authoritative for installed versions; README framework-version references may be stale.
- Keep App Router route files in `src/app/`. Components are grouped by feature under `src/components/`; reusable shadcn-style primitives live in `src/components/ui/`.
- Prefer the `@/` aliases configured in `tsconfig.json` over new long relative imports.
- Keep database reads in `src/lib/data.ts`, authenticated mutations in server-action modules under `src/lib/`, and shared validation schemas in `src/schemas/`.
- Follow the existing React Hook Form + Zod pattern for forms and the `cn` utility for composing Tailwind classes.
- Add `"use client"` only when a component needs browser APIs, state, effects, or client-only hooks; otherwise preserve Server Component behavior.

## Commands

- Development: `pnpm dev` (Turbopack) or `pnpm dev:normal`.
- Autofix lint: `pnpm exec eslint . --fix`; verification: `pnpm lint`.
- Production build: `pnpm build`; production server: `pnpm start`.
- There is currently no automated test script; do not claim tests ran unless a test command is added and executed.

## Session Memory

Working memory lives at `.claude/CONTEXT.md` (local, gitignored, written in Spanish). Read it at the start if present; update it after relevant work with progress and decisions. Use absolute dates.
