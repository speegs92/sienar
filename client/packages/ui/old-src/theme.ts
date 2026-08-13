import type { OverridableStringUnion } from '@mui/types';

export type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';

export type ExtensibleColor<T> = OverridableStringUnion<Color, T>;