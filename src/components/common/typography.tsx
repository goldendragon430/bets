import React from 'react';

import styled from 'styled-components';

import { useTheme } from '../../contexts/theme_context';
import { FontStyle } from '../../themes/typography';

const StyledText = styled.p<{
  fontStyle: FontStyle;
}>`
  font-weight: ${({ fontStyle }) => fontStyle.fontWeight};
  font-size: ${({ fontStyle }) => fontStyle.fontSize};
  line-height: ${({ fontStyle }) => fontStyle.lineHeight};
  ${({ fontStyle }) => fontStyle.uppercase && `text-transform: uppercase;`}
  padding: 0;
  margin: 0;
`;

export enum TypographyType {
  REGULAR = 'regular',
  REGULAR_SMALL = 'regularSmall',
  BOLD_TITLE = 'boldTitle',
  BOLD_SUBTITLE = 'boldSubTitle',
}

interface ITypography extends React.HTMLAttributes<HTMLDivElement> {
  type: TypographyType;
}

export const Typography: React.FC<ITypography> = ({ type, children, ...props }) => {
  const { theme } = useTheme();

  const getFontStyle = () => {
    if (type === TypographyType.REGULAR_SMALL) {
      return theme.typography.regularSmall;
    }
    if (type === TypographyType.BOLD_TITLE) {
      return theme.typography.boldTitle;
    }
    if (type === TypographyType.BOLD_SUBTITLE) {
      return theme.typography.boldSubTitle;
    }
    return theme.typography.regular;
  };

  return (
    <StyledText fontStyle={getFontStyle()} {...props}>
      {children}
    </StyledText>
  );
};
