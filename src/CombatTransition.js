import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { colors, mixins } from './styles';

export const CombatTransition = () => {
  const { combatTransitionFlipper } = useSelector(state => ({
    combatTransitionFlipper: state.sceneReducer.combatTransitionFlipper
  }), shallowEqual);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (combatTransitionFlipper) {
      setShouldAnimate(true);
    }
  }, [combatTransitionFlipper]);
  
  const animationCss = combatTransitionFlipper ? `
    ${mixins.keyframes('draw_curtain', `
      0% { height: 0%; }
      40% { height: 50%; }
      60% { height: 50%; }
      100% { height: 0%; }
    `)}
    animation: draw_curtain 2s ease-in-out;
  ` : `
    ${mixins.keyframes('draw_curtain_1', `
      0% { height: 0%; }
      40% { height: 50%; }
      60% { height: 50%; }
      100% { height: 0%; }
    `)}
    animation: draw_curtain_1 2s ease-in-out;
  `;

  const curtainCss = css`
    position: absolute;
    width: 100%;
    background: ${colors.blackDark};
    ${shouldAnimate ? animationCss : ''}
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    &.top {
      top: 0;
    }

    &.bottom {
      bottom: 0;
    }
  `;

  return (
    <>
      <div className='curtain top' css={curtainCss} />
      <div className='curtain bottom' css={curtainCss} />
    </>
  );
};
