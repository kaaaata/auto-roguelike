import { useEffect, useRef } from 'react';
import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from './stores/actions';
import { Image, FlexContainer } from './particles'
import { colors } from './styles';
import { MapRewards } from './MapRewards';

const MapIcon = ({ image, isComplete }) => (
  <FlexContainer justifyContent='center' alignItems='center' _css='height: 100%;'>
    <Image
      src={`${image}.png`}
      width={30}
      height={30}
      css={css`
        width: ${isComplete ? 70 : 30}px;
        height: ${isComplete ? 70 : 30}px;
        opacity: ${isComplete ? 0 : 1};
        transition: all 0.5s linear;
      `}
    />
  </FlexContainer>
);

export const Map = () => {
  const dispatch = useDispatch();

  const { dungeonMap, path } = useSelector(state => ({
    dungeonMap: state.dungeonReducer.dungeonMap,
    path: state.dungeonReducer.path
  }), shallowEqual);

  const moveIndex = useRef(0);
  moveIndex.current = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (path[moveIndex.current + 1]) {
        document.getElementById('map_player_animated_icon').style.left = `${620 + 60 * path[moveIndex.current + 1].x}px`;
        document.getElementById('map_player_animated_icon').style.top = `${100 + 60 * path[moveIndex.current + 1].y}px`;
      }
      if (moveIndex.current === path.length - 1) {
        const { x, y } = path[path.length - 1];
        if (!(x === dungeonMap.length - 1 && y === dungeonMap.length - 1)) {
          dispatch(actions.dungeonSetMapEventComplete(path[path.length - 1]));
          if (dungeonMap[y][x].event.type === 'coins') {
            dispatch(actions.dungeonAddMapRewards([{ type: 'coins', value: dungeonMap[y][x].event.value }]));
          }
          if (dungeonMap[y][x].event.type === 'combat') {
            dispatch(actions.dungeonInitializeCombat());
            dispatch(actions.sceneDrawCurtain());
            setTimeout(() => dispatch(actions.sceneSetScene('combat')), 1000);
            return clearInterval(interval);
          }
          dispatch(actions.dungeonSetPlayerMapPath());
        }
        return clearInterval(interval);
      } else {
        moveIndex.current++;
      }
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <>
      <MapRewards />

      <div css={mapCss}>
        {dungeonMap.map((row, y) => (
          <FlexContainer key={`row_${y}`}>
            {row.map((col, x) => {
              const key = `${y}-${x}`;
              return (
                <div
                  key={key}
                  className='tile'
                  css={dungeonMap[y][x] ? css`
                    ${dungeonMap[y][x].walls.top ? `border-top: 1px solid ${colors.yellow};` : ''}
                    ${dungeonMap[y][x].walls.right ? `border-right: 1px solid ${colors.yellow};` : ''}
                    ${dungeonMap[y][x].walls.bottom ? `border-bottom: 1px solid ${colors.yellow};` : ''}
                    ${dungeonMap[y][x].walls.left ? `border-left: 1px solid ${colors.yellow};` : ''}
                    background: ${colors.blackMediumDark};
                  ` : css`background: ${colors.transparent};`}
                >
                  {dungeonMap[y][x].event && (
                    <MapIcon image={dungeonMap[y][x].event.type} isComplete={dungeonMap[y][x].event.isComplete} />
                  )}
                </div>
            );
            })}
          </FlexContainer>
        ))}
      </div>

      <div
        id='map_player_animated_icon'
        css={mapPlayerAnimatedIconCss}
        style={{ left: `${620 + 60 * path[0].x}px`, top: `${100 + 60 * path[0].y}px` }}
      />
    </>
  );
};
const mapPlayerAnimatedIconCss = css`
  position: absolute;
  border-radius: 50%;
  background: ${colors.yellow};
  width: 20px;
  height: 20px;
  transition: all 0.5s linear;
`;
const mapCss = css`
  position: absolute;
  top: 80px;
  left: 600px;
  width: fit-content;
  cursor: url("assets/fire_cursor.png"), auto;
  border: 1px solid ${colors.yellow};
  box-shadow: 4px 4px 8px ${colors.black};

  .tile {
    height: 60px;
    width: 60px;
    font-size: 20px;
    box-sizing: border-box;

    .checkmark {
      margin: -2px auto 0 auto;
    }
  }
`;
