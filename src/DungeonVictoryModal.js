import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import * as actions from './stores/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FlexContainer, Gold, Modal, Spacer, Text } from './particles';
import { sum } from 'lodash';

export const DungeonVictoryModal = ({ text, closeModal }) => {
  const dispatch = useDispatch();

  const { rewards, dungeonMapCurrentRoom } = useSelector(state => ({
    rewards: state.rewardsReducer.rewards,
    dungeonMapCurrentRoom: state.dungeonReducer.dungeonMapCurrentRoom
  }), shallowEqual);

  return (
    <Modal
      title={text}
      closeModal={() => {
        dispatch(actions.playerAdjustGold(sum(rewards.filter(i => i.type === 'gold').map(i => i.value))));
        closeModal();
      }}
      shouldCloseOnClick={false}
      shouldShowCloseButton
    >
      <FlexContainer justifyContent='space-between' alignItems='center' flexDirection='column'>
        <Text>
          <span className='green'>{dungeonMapCurrentRoom}/{dungeonMapCurrentRoom}</span> rooms completed! This dungeon's spoils are rightfully yours.
        </Text>
        <Spacer height={40} />
        <FlexContainer flexWrap='wrap' _css={css`gap: 60px;`}>
          {rewards.map(i => (
            <>
              {i.type === 'gold' ? <Gold gold={i.value} /> : null}
            </>
          ))}
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};
