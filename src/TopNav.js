import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { shallowEqual, useSelector } from 'react-redux';
import { FlexContainer, Gold, Spacer } from './particles';
import { colors } from './styles';

export const TopNav = () => {
  const { gold } = useSelector(state => ({
    gold: state.playerReducer.gold
  }), shallowEqual);

  return (
    <FlexContainer css={topNavCss}>
      <Spacer width={20} />
      <Gold gold={gold} />
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
