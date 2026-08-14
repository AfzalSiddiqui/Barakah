import type { ComponentType } from 'react';

/**
 * Type facade for the Flux package, whose published source currently fails
 * TypeScript's React Native 0.81 style checks. Runtime resolution remains
 * unchanged; this only prevents third-party implementation details from
 * blocking the application's type check.
 */
export const FluxText: ComponentType<any>;
export const FluxProgressBar: ComponentType<any>;
export const FluxProgressRing: ComponentType<any>;
export const FluxDivider: ComponentType<any>;
export const FluxThemeProvider: ComponentType<any>;
