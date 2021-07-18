import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { colors } from '../styles';
import { Text } from './Text';

const buttonTypeWidths = {
  default: '225px',
  wide: '100%',
  'fit-content': 'fit-content'
};

export const Button = ({
  onClick,
  onMouseEnter,
  type = 'default', // 'default'|'wide'|'fit-content'
  isDisabled = false,
  textProps = {},
  className = '',
  centered = false,
  _css = '',
  children
}) => (
  <button
    onClick={isDisabled ? undefined : onClick}
    onMouseEnter={isDisabled ? undefined : onMouseEnter}
    className={`button ${className}`}
    css={css`
      background: ${isDisabled ? colors.greyDark : colors.yellowLight};
      padding: 0 10px;
      height: 30px;
      border-radius: 3px;
      border: 2px solid ${colors.yellowLight};
      outline: none;
      width: ${buttonTypeWidths[type]};
      cursor: ${isDisabled ? 'default' : 'pointer'};
      ${centered ? '' : 'text-align: left;'}
  
      &:hover {
        ${isDisabled ? '' : `background: ${colors.gold};`}
      }

      ${_css}
    `}
  >
    <Text
      type='small'
      inline
      color='black'
      {...textProps}
      _css='text-shadow: none;'
    >
      {children}
    </Text>
  </button>
);
