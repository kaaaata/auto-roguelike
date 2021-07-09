import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { colors, mixins } from '../styles';
import { FlexContainer } from './FlexContainer';
import { Spacer } from './Spacer';
import { Text } from './Text';

export const TimerMeter = ({ timer, text, onComplete }) => {
  const timerMeterCss = css`
    .meter {
      position: relative;
      width: 300px;
      height: 30px;
      border: 2px solid ${colors.yellowLight};
      border-radius: 3px;

      .fill {
        ${mixins.keyframes('shrink', `
          0% { width: 0%; }
          100% { width: 100%; }
        `)}
        background: ${colors.yellowLight};
        height: 100%;
        animation: shrink ${timer / 1000}s linear;
        animation-iteration-count: 1;
      }
    }
  `;

  useEffect(() => {
    let timeout = setTimeout(() => {
      onComplete();
      clearTimeout(timeout);
    }, timer);
  }, [onComplete, timer]);

  return (
    <FlexContainer _css={timerMeterCss} flexDirection='column'>
      <Text centered>{text}</Text>
      <Spacer height={10} />
      <div className='meter'>
        <div className='fill' />
      </div>
    </FlexContainer>
  );
};
