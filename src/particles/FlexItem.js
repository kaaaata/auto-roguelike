import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { mq } from '../styles';

export const FlexItem = ({
  className = '',
  flex,
  flexGrow = 1,
  flexShrink,
  flexBasis,
  _css,
  children
}) => {
  const flexItemCss = css`
    ${mq.genResponsiveCss('flex', flex, false)}
    ${mq.genResponsiveCss('flex-grow', flexGrow, false)}
    ${mq.genResponsiveCss('flex-shrink', flexShrink, false)}
    ${mq.genResponsiveCss('flex-basis', flexBasis, false)}
    ${_css}
  `;

  return (
    <div
      css={flexItemCss}
      className={`flex_item ${className}`}
    >
      {children}
    </div>
  );
};
