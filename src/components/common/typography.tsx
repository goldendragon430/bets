import React from 'react';

import styled from 'styled-components';

import { useTheme } from '../../contexts/theme_context';
import { FontStyle } from '../../themes/typography';

const StyledText = styled.p<{
  fontStyle: FontStyle;
  color?: string;
  shadow?: boolean;
}>`
  font-family: ${({ fontStyle }) => fontStyle.fontFamily};
  font-weight: ${({ fontStyle }) => fontStyle.fontWeight};
  font-style: ${({ fontStyle }) => fontStyle.fontStyle};
  font-size: ${({ fontStyle }) => fontStyle.fontSize};
  line-height: ${({ fontStyle }) => fontStyle.lineHeight};
  ${({ fontStyle }) => fontStyle.uppercase && `text-transform: uppercase;`}
  padding: 0;
  margin: 0;
  ${({ color }) =>
    color &&
    `
    color: ${color};
  `}
  ${({ theme, color, shadow }) =>
    shadow &&
    `
    text-shadow: 0px 0px 11px ${color || theme.colors.text1};
  `}
`;

export enum TypographyType {
  REGULAR = 'regular',
  REGULAR_TITLE = 'regularTitle',
  REGULAR_BODY = 'regularBody',
  REGULAR_BODY2 = 'regularBody2',
  BOLD_HEADING = 'boldHeading',
  BOLD_TITLE = 'boldTitle',
  BOLD_SUBTITLE = 'boldSubTitle',
}

interface ITypography extends React.HTMLAttributes<HTMLDivElement> {
  type: TypographyType;
  color?: string;
  shadow?: boolean;
}

export const Typography: React.FC<ITypography> = ({ type, children, color, shadow, ...props }) => {
  const { theme } = useTheme();

  const getFontStyle = () => theme.typography[type];

  return (
    <StyledText color={color} fontStyle={getFontStyle()} shadow={shadow} {...props}>
      {children}
    </StyledText>
  );
};
