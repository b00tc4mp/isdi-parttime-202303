import { useState, useEffect } from 'react';
import GameOver from '../components/game/GameOver';
import { useParams, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import inLogger from '../inLogger';
import { configureLevelToRender } from '../helpers/game/configureLevelToRender';
import retrieveLevel from '../logic/retrieve-level';
import GameContainer from '../components/game/GameContainer';

const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const [name, setName] = useState(null)
  const [layout, setLayout] = useState(null);
  const [levelToRender, setLevelToRender] = useState(null);
  const [health, setHealth] = useState(null);
  const [isGameOver, setIsGameOver] = useState(0); // 0 = playing, -1 = lost, 1 = won

  const getLevel = async () => {
    if (id !== 'try') {
      try {
        const level = await retrieveLevel(id);
        setLayout(level.layout)
        const configuredLevel = configureLevelToRender(level.layout);
        setLevelToRender(configuredLevel);
        setHealth(level.hp ? level.hp : 5);
        setName(level.name)
        setIsLoading(false);
      } catch (error) {
        alert(`retrieve level error: ${error.message}`);
        setIsLoading(false);
      }
    } else {
      const { createdLayout, hp, levelName } = location.state;
      const configuredLevel = configureLevelToRender(createdLayout);
      setLevelToRender(configuredLevel);
      setLayout(createdLayout);
      setName(levelName)
      setHealth(hp ? hp : 5);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLevel();
  }, [id]);

  const handleRetry = () => {
    setIsLoading(true);
    setLevelToRender(null);
    setHealth(null);
    setIsGameOver(0);

    getLevel();
  };

  const handleGameOver = (state) => {
    setIsGameOver(state)
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col flex-wrap">
      {isGameOver !== 0 && (
        <>
          <GameOver isGameWon={isGameOver > 0 ? true : false} onRetry={handleRetry} isCreatedLevel={'try' === id} layout={layout} hp={health} name={name} />
          <div className="top-0 inset-0 bg-black opacity-50"></div>
        </>
      )}
      <GameContainer level={levelToRender} initialHp={health} onGameOver={handleGameOver} />
    </section>
  );
};

export default inLogger(Game);
