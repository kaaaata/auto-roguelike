import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { Image } from './particles';

const backgroundImageCss = css`
  position: absolute;
`;

export const BackgroundImage = ({ scene }) => {
  let backgroundImage = 'bg_cave_opening.jpg';
  if (scene === 'combat') {
    backgroundImage = 'bg_blue_cavern.jpg';
  }

  return (
    <Image
      src={backgroundImage}
      width={1280}
      height={720}
      css={backgroundImageCss}
    />
  );
};
