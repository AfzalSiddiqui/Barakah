# Barakah — Islamic AI Fintech

> **Ask. Act. Done.**

A production-grade React Native proof-of-concept demonstrating deep Islamic fintech expertise and modern mobile architecture.

## Architecture Overview

### Tech Stack
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Expo SDK | 54 |
| Runtime | React Native | 0.81 |
| Language | TypeScript | 5.9 (strict) |
| Navigation | Expo Router | v6 (file-based) |
| Styling | NativeWind | v4 (Tailwind CSS) |
| State | Zustand | v5 |
| Animation | Reanimated | 4 |
| i18n | react-i18next | Arabic/English + RTL |

### Design Principles

1. **Engine/Store Separation** — Domain logic lives in pure TypeScript engines (`src/engines/`), completely decoupled from React. Stores (`src/store/`) handle side effects and UI state.

2. **AAOIFI Compliance State Machine** — `shariaRules.ts` implements a rule-based compliance engine that validates transactions against 6 core Islamic banking principles.

3. **Immutable Audit Trail** — `auditLog.ts` creates a hash-chained event log for every compliance-relevant action, ensuring auditability.

4. **Halal Investment Screening** — `halalScreener.ts` screens investments against AAOIFI thresholds (debt ratio, haram revenue, interest income, liquid assets).

5. **Zakat Calculator** — `zakatCalculator.ts` supports Hanafi and Shafi'i madhab differences in Nisab thresholds and liability deductions.

### Folder Structure

```
barakah-mobile/
├── app/                          # Expo Router (file-based navigation)
│   ├── _layout.tsx               # Root layout (providers, i18n, splash)
│   ├── index.tsx                 # Splash screen (animated)
│   ├── onboarding.tsx            # 3-slide onboarding
│   └── (tabs)/
│       ├── _layout.tsx           # Tab navigator
│       ├── dashboard.tsx         # Balance, transactions, profit share
│       ├── ai.tsx                # Conversational AI banking
│       ├── murabaha.tsx          # Cost-plus financing calculator
│       └── zakat.tsx             # Zakat calculator + Halal screening
├── src/
│   ├── components/
│   │   ├── ui/                   # Design system atoms
│   │   ├── islamic/              # Islamic finance components
│   │   ├── chat/                 # AI chat components
│   │   ├── onboarding/           # Onboarding components
│   │   └── dashboard/            # Dashboard components
│   ├── engines/                  # Pure TS domain logic (no React deps)
│   │   ├── types.ts              # All TypeScript interfaces
│   │   ├── shariaRules.ts        # AAOIFI compliance state machine
│   │   ├── zakatCalculator.ts    # Zakat computation engine
│   │   ├── halalScreener.ts      # Investment screening
│   │   └── auditLog.ts           # Immutable audit chain
│   ├── store/                    # Zustand state management
│   ├── i18n/                     # Arabic/English translations
│   ├── lib/                      # Utilities (storage, chat, formatters)
│   ├── hooks/                    # Custom hooks (useRTL, useAnimatedEntry)
│   ├── theme/                    # Design tokens
│   └── data/                     # Mock data
```

### Key Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| AsyncStorage over MMKV | Expo Go compatibility — abstraction layer (`src/lib/storage.ts`) allows easy swap |
| Pure TS Engines | No React dependencies — fully testable, auditable, portable to backend |
| NativeWind v4 | Rapid styling with Tailwind utilities, matches design system approach |
| Zustand v5 | Minimal boilerplate, TypeScript-first, no providers needed |
| File-based routing | Expo Router v6 — intuitive, matches Next.js mental model |

### Domain Engines

#### Sharia Rules (`src/engines/shariaRules.ts`)
- 6 AAOIFI compliance checks: No Riba, No Gharar, Asset-Backed, Halal Activity, Profit-Loss Sharing, Full Disclosure
- State machine derives overall compliance status from individual check results
- Generates certification IDs for compliant transactions

#### Zakat Calculator (`src/engines/zakatCalculator.ts`)
- Supports Hanafi (silver Nisab) and Shafi'i (gold Nisab) madhab
- Categorizes 6 asset types + 2 liability types
- Applies 2.5% rate on net zakatable wealth above Nisab threshold

#### Halal Screener (`src/engines/halalScreener.ts`)
- 4 screening criteria: Debt-to-Equity ≤33%, Haram Revenue ≤5%, Interest Income ≤5%, Liquid Assets ≤70%
- Classifies as Halal (0 failures), Doubtful (1 failure), or Haram (2+ failures)

#### Audit Log (`src/engines/auditLog.ts`)
- Hash-chained immutable log
- Chain verification function for integrity checks
- Supports event filtering by type

## Running the App

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# Scan QR code with Expo Go (iOS/Android)
```

## Screens

1. **Splash** — Animated Barakah branding with logo reveal
2. **Onboarding** — 3 slides: AI Banking, Islamic Finance, Privacy
3. **Dashboard** — Balance card, quick actions, profit share, transactions
4. **AI Chat** — Conversational banking with contextual responses
5. **Murabaha** — Product selection, calculator with sliders, compliance panel
6. **Zakat** — Asset inputs, Madhab selector, progress ring, Halal screening

## Production Roadmap

- [ ] MMKV migration (replace AsyncStorage abstraction)
- [ ] Biometric authentication (expo-local-authentication)
- [ ] Real API integration (REST/GraphQL)
- [ ] Push notifications
- [ ] Offline-first sync engine
- [ ] E2E tests (Detox/Maestro)
- [ ] CI/CD pipeline (EAS Build + Submit)
- [ ] Arabic RTL full layout verification
- [ ] Accessibility audit (VoiceOver/TalkBack)
- [ ] Performance profiling (Flipper)

---

Built with Islamic fintech expertise for Barakah.
