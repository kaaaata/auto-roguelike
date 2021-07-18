import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { shallowEqual, useSelector } from 'react-redux';
import { FlexContainer, Coins, Spacer } from './particles';
import { colors } from './styles';

export const TopNav = () => {
  const { coins } = useSelector(state => ({
    coins: state.playerReducer.coins
  }), shallowEqual);

  return (
    <FlexContainer css={topNavCss}>
      <Spacer width={20} />
      <Coins coins={coins} />
    </FlexContainer>
  )
};
const topNavCss = css`
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  box-shadow: 2px 2px 4px ${colors.black};
  position: absolute;
  top: 0;
`;
