import { css } from '@emotion/react';

const fontGenerator = (
  fontFamily: string,
  weight: number,
  size: number,
  lineHeight: number,
  letterSpacing: number
) => css`
  font-family: ${fontFamily}, serif;
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}px;
`;

const fontFamily = 'Pretendard Variable';

const font = {
  D1: fontGenerator(fontFamily, 600, 2.5, 150, 0),

  H1: fontGenerator(fontFamily, 600, 1.725, 150, 0),
  H2: fontGenerator(fontFamily, 600, 1.5, 150, 0),

  p1: fontGenerator(fontFamily, 400, 1.25, 150, 0),
  p2: fontGenerator(fontFamily, 400, 1.125, 150, 0),
};

export default font;
