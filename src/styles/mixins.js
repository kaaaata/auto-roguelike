
export const mixins = {
  keyframes: (animationName, css) => `
    @-webkit-keyframes ${animationName} {
      ${css}
    }
    @-moz-keyframes ${animationName} {
      ${css}
    }
    @-o-keyframes ${animationName} {
      ${css}
    }
    @keyframes ${animationName} {
      ${css}
    }
  `
};
