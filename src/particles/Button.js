import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { colors } from '../styles';
import { Text } from './Text';

const buttonTypeWidths = {
  default: '100%',
  mini: '200px',
  'fit-content': 'fit-content'
};

export const Button = ({
  onClick,
  onMouseEnter,
  type = 'default', // 'default'|'mini'|'fit-content'
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
      background: ${isDisabled ? colors.greyDark : colors.slateLight};
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      border: none;
      outline: none;
      width: ${buttonTypeWidths[type]};
      color: ${colors.white};
      cursor: ${isDisabled ? 'default' : 'pointer'};
      ${centered ? '' : 'text-align: left;'}
  
      &:hover {
        ${isDisabled ? '' : `background: ${colors.slate};`}
      }

      ${_css}
    `}
  >
    <Text
      type='mini'
      inline
      {...textProps}
    >
      {children}
    </Text>
  </button>
);
