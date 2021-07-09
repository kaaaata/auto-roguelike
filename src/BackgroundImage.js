import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { Image } from './particles';

const backgroundImageCss = css`
  position: absolute;
`;

export const BackgroundImage = ({ scene }) => {
  let backgroundImage = 'bg_cave_opening.jpg';
  
  switch (scene) {
    case 'combat':
      backgroundImage = 'bg_blue_cavern.jpg';
      break;
    default:
      break;
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
