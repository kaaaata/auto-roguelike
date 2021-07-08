import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { FlexContainer, Gold, Modal, Spacer } from './particles';
import { TimerMeter } from './particles/TimerMeter';

export const CombatVictoryModal = ({ room, text, closeModal }) => (
  <Modal
    halfModal
    title={text}
    closeModal={closeModal}
    shouldCloseOnClick={false}
    shouldShowCloseButton={false}
  >
    <FlexContainer css={combatVictoryModalCss} justifyContent='space-between' alignItems='center' flexDirection='column'>
      {room.gold ? <Gold gold={room.gold} /> : null}
      <div>
        <TimerMeter timer={2000} text='Moving to next room...' onComplete={closeModal} />
        <Spacer height={40} />
      </div>
    </FlexContainer>
  </Modal>
);
const combatVictoryModalCss = css`
  height: 100%;
`;
