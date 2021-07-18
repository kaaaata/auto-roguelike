import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { RewardsDisplay } from './MapRewards';
import { FlexContainer, Modal, Spacer } from './particles';
import { TimerMeter } from './particles/TimerMeter';

export const CombatVictoryModal = ({ text, rewards, closeModal }) => (
  <Modal
    halfModal
    title={text}
    shouldCloseOnClick={false}
    shouldShowCloseButton={false}
  >
    <FlexContainer css={combatVictoryModalCss} justifyContent='space-between' alignItems='center' flexDirection='column'>
      <RewardsDisplay rewards={rewards} text='Spoils' isCentered />
      <div>
        <TimerMeter
          timer={2000}
          text='Gathering loot...'
          onComplete={closeModal}
        />
        <Spacer height={40} />
      </div>
    </FlexContainer>
  </Modal>
);
const combatVictoryModalCss = css`
  height: 100%;
`;
