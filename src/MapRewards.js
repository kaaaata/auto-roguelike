import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { shallowEqual, useSelector } from 'react-redux';
import { FlexContainer, Image, Text } from './particles'
import { colors } from './styles';

export const RewardsDisplay = ({ rewards, text, isCentered = false }) => (
  <FlexContainer
    justifyContent={isCentered ? 'center' : 'flex-start'}
    alignContent='flex-start'
    gap='10px'
    flexWrap='wrap'
    _css={rewardsDisplayCss}
  >
    <Text type='header' centered>{text}</Text>
    {rewards.map((i, index) => (
      <Image key={index} src={`${i.type}.png`} width={40} height={40} />
    ))}
  </FlexContainer>
);

export const MapRewards = () => {
  const { rewards } = useSelector(state => ({
    rewards: state.dungeonReducer.dungeonMapRewards
  }), shallowEqual);

  return (
    <RewardsDisplay rewards={rewards} text='Loot Gathered' />
  );
};
const rewardsDisplayCss = css`
  border: 3px solid ${colors.yellow};
  border-radius: 10px;
  width: 400px;
  height: 300px;
  overflow-y: scroll;
  padding: 10px;
  margin: 20px;
  background: rgba(0, 0, 0, 0.9);

  .text {
    width: 100%;
  }
`;
