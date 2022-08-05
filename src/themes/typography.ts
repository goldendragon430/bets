export interface FontStyle {
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  uppercase?: boolean;
}

export interface Typography {
  regular: FontStyle;
  regularSmall: FontStyle;
  boldTitle: FontStyle;
  boldSubTitle: FontStyle;
}

export const MainTypography: Typography = {
  regular: {
    fontWeight: 400,
    fontSize: '1.2rem',
    lineHeight: '2rem',
  },
  regularSmall: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.125rem',
  },
  boldTitle: {
    fontWeight: 500,
    fontSize: '2.5rem',
    lineHeight: '4rem',
    uppercase: true,
  },
  boldSubTitle: {
    fontWeight: 500,
    fontSize: '1.5rem',
    lineHeight: '4rem',
    uppercase: true,
  },
};
