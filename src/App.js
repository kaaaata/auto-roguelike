import { useEffect } from 'react';
import { css } from '@emotion/react'; /** @jsxImportSource @emotion/react */
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from './stores/actions';
import { colors } from './styles';
import { Combat } from './Combat';
import { Planning } from './Planning';
import { TopNav } from './TopNav';
import { BackgroundImage } from './BackgroundImage';
import { characters } from './constants';
import { genDungeonMap } from './gameplay/genDungeonMap';
import { Spacer } from './particles';

// const inDevelopment = process.env.NODE_ENV !== 'production';

const App = () => {
  const dispatch = useDispatch();

  // initialize stuff
  useEffect(() => {
    dispatch(actions.dungeonSetAllies([
      { ...characters['Minotaur'] },
      { ...characters['Arriette'] },
      { ...characters['Tiamat'] }
    ]));
    dispatch(actions.dungeonSetEnemies([
      { ...characters['Bat'] },
      { ...characters['Bat'] },
      { ...characters['Bat'] }
    ]));
    // dispatch(actions.rewardsSetRewards({ gold: random(5, 10) }));
    dispatch(actions.dungeonSetMap(genDungeonMap(1, 'short')));
    dispatch(actions.sceneSetScene('planning'));
  }, [dispatch]);

  const { scene } = useSelector(state => ({
    scene: state.sceneReducer.scene
  }), shallowEqual);
  
  let sceneComponent = null;
  switch (scene) {
    case 'combat':
      sceneComponent = <Combat />;
      break;
    case 'planning':
      sceneComponent = <Planning />;
      break;
    default:
      break;
  }

  return (
    <main id='app' css={appCss}>
      <BackgroundImage scene={scene} />
      <TopNav />
      <div className='scene'>
        <Spacer height={60} />
        {sceneComponent}
      </div>
    </main>
  );
};
const appCss = css`
  border: 2px solid black;
  width: 1280px;
  height: 720px;
  user-select: none;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: ${colors.white};
  letter-spacing: 0.3px;
  font-family: 'Cabin', sans-serif;
  button {
    font-family: 'Cabin', sans-serif;
  }
  .sand { color: ${colors.sand}; }
  .green { color: ${colors.green}; }
  .blue { color: ${colors.blue}; }
  .red { color: ${colors.red}; }
  .yellow { color: ${colors.yellow}; }
  .violet { color: ${colors.violet}; }
  .greyDark { color: ${colors.greyDark}; }
  .black { color: ${colors.black}; }
  
  .bold { font-weight: bold; }

  .scene {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default App;
