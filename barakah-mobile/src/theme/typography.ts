import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 26, fontWeight: '700', lineHeight: 32 },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
  h3: { fontSize: 17, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  bodyBold: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  captionBold: { fontSize: 12, fontWeight: '600', lineHeight: 16 },
  small: { fontSize: 10, fontWeight: '400', lineHeight: 14 },
  smallBold: { fontSize: 10, fontWeight: '600', lineHeight: 14 },
};
