import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { mq } from '../styles';

export const Image = (props) => {
  const {
    src,
    width,
    height,
    size = 'cover',
    circular,
    rgbaFilter,
    external = false,
    className = '',
    filter,
    _css = '',
    onClick,
    onMouseEnter,
    children
  } = props;

  const widthCss = mq.genResponsiveCss('width', width);
  const heightCss = mq.genResponsiveCss('height', height);
  const linearGradientCss = rgbaFilter ? `linear-gradient(${rgbaFilter}, ${rgbaFilter}), ` : '';
  const url = `${external ? '' : 'assets/'}${src}`;

  const imageCss = css`
    ${children ? `
      background: ${linearGradientCss}url("${url}") center center / ${size} no-repeat;
      ${widthCss}
      ${heightCss}
    ` : `
      display: block;
    `
    }
    
    ${circular ? 'border-radius: 50%;' : ''}
    ${onClick ? 'cursor: pointer;' : ''}
    ${filter ? `filter: ${filter};` : ''}

    ${_css}
  `;

  return children ? (
    <div
      className={`image ${className}`}
      css={imageCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </div>
  ) : (
    <img
      src={url}
      width={width}
      height={height}
      alt={url}
      className={`image ${className}`}
      css={imageCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    />
  );
};
