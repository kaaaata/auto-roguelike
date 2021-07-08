import { PureComponent } from 'react';
import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { colors, mixins } from './styles';
import { Text } from './particles';
import { controls } from './constants';

const frames = {
  idle: ['idle_1', 'idle_2', 'idle_3', 'idle_4'],
  attack: ['attack_1', 'attack_2', 'attack_2', 'idle_1'],
  death: ['death', 'death', 'death', 'death']
};
const resetDamageNumberAnimation = () => {
  const el = document.querySelector('.damage_number');
  if (el) {
    el.classList.remove('damage_number');
    void el.offsetWidth;
    el.classList.add('damage_number');
  }
};

export class CombatCharacter extends PureComponent {
  render() {
    const {
      spriteAction, hp, maxHp, shields, maxShields, name, isEnemy, needToFlipImage, hpDifferential, shieldsDifferential
    } = this.props;

    const animationName = `sprite_animation_${name}_${spriteAction}`;
    const animationCss = spriteAction === 'death'
      ? `background: url("assets/${name}/death.png") no-repeat center center;`
      : `
        ${mixins.keyframes(animationName, `
          0% { background: url("assets/${name}/${frames[spriteAction][0]}.png") center center / cover no-repeat; }
          33% { background: url("assets/${name}/${frames[spriteAction][1]}.png") center center / cover no-repeat; }
          66% { background: url("assets/${name}/${frames[spriteAction][2]}.png") center center / cover no-repeat; }
          100% { background: url("assets/${name}/${frames[spriteAction][3]}.png") center center / cover no-repeat; }
        `)}
        animation: ${animationName} ${controls.msPerTick / 1000}s infinite;
        animation-iteration-count: ${spriteAction === 'idle' ? 'infinite' : 1};
      `;
    const damageNumber = Math.abs(hpDifferential + shieldsDifferential);
    
    resetDamageNumberAnimation();

    return (
      <div css={combatCharacterCss(isEnemy)}>
        <div
          className='hp_fill shader_fill'
          css={css`
            height: ${~~(hp / maxHp * 100)}%;
            ${hpDifferential > 0 ? '' : `
              transition-delay: 0.5s;
              transition: height 0.75s ease-out;
            `}
          `}
        />
        <div
          className='hp_fill'
          css={css`
            height: ${~~(hp / maxHp * 100)}%;
            ${hpDifferential < 0 ? '' : `
              transition-delay: 0.5s;
              transition: height 0.75s ease-out;
            `}
          `}
        />
        <div
          className='shields_fill shader_fill'
          css={css`
            height: ${~~(shields / maxShields * 100)}%;
            ${shieldsDifferential > 0 ? '' : `
              transition-delay: 0.5s;
              transition: height 0.75s ease-out;
            `}
          `}
        />
        <div
          className='shields_fill'
          css={css`
            height: ${~~(shields / maxShields * 100)}%;
            ${shieldsDifferential < 0 ? '' : `
              transition-delay: 0.5s;
              transition: height 0.75s ease-out;
            `}
          `}
        />
        <div className='sprite' css={css`
          ${animationCss}
          height: 275px;
          width: 275px;
          ${needToFlipImage ? css`transform: scaleX(-1);` : ''}
        `} />
        <Text className='stats' color='black' centered>
          <span className={!hp ? 'strikethrough' : ''}>&nbsp;{name}&nbsp;</span><br />
          {hp} / {maxHp}<br />
          {shields ? <span className='shields'>{shields} / {maxShields}</span> : null}
        </Text>
        {damageNumber === 0 ? null : (
          <Text className='damage_number' type='title' color='yellow' centered>{damageNumber}</Text>
        )}
      </div>
    );
  }
};
const combatCharacterCss = (isEnemy) => css`
  height: 275px;
  width: 275px;
  position: relative;
  border: 2px solid ${isEnemy ? colors.red : colors.green};
  margin: 5px;

  .hp_fill {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: ${isEnemy ? colors.red : colors.green};
  }

  .shields_fill {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 25px;
    background: ${colors.slate};
  }

  .shader_fill {
    opacity: 0.5;
  }

  .sprite {
    position: absolute;
  }

  .strikethrough {
    text-decoration: line-through;
    text-decoration-color: ${colors.red};
  }

  .stats {
    position: absolute;
    width: 100%;
    margin-top: 10px;
    color: ${colors.black};

    .shields {
      color: ${colors.grey};
    }
  }

  .damage_number {
    position: absolute;
    width: 100%;
    opacity: 0;

    ${mixins.keyframes('damageNumberFadeOut', `
      0% { top: 35%; opacity: 1; }
      33% { top: 30%; opacity: 1; }
      66% { top: 25%; opacity: 1; }
      100% { top: 20%; opacity: 0; }
    `)}
    animation: damageNumberFadeOut 1s linear;
  }
`;
