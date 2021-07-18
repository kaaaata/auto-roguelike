import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { Image } from './particles';

const backgroundImageCss = css`
  position: absolute;
`;

export const BackgroundImage = ({ scene }) => {
  let backgroundImage;
  
  switch (scene) {
    case 'combat':
      backgroundImage = 'bg_blue_cavern.jpg';
      break;
    case 'planning':
    case 'map':
      backgroundImage = 'bg_cave_opening.jpg';
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
