import { useState, useEffect } from 'react';
import GameOver from '../components/game/GameOver';
import { useParams, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import inLogger from '../inLogger';
import { configureLevelToRender } from '../helpers/game/configureLevelToRender';
import retrieveLevel from '../logic/retrieve-level';
import GameContainer from '../components/game/GameContainer';
import useHandleErrors from '../hooks/useHandleErrors';
import isUserLoggedIn from '../logic/is-user-logged-in';
import retrieveLoggedUser from '../logic/retrieve-logged-user';

const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState('beach');
  const [layout, setLayout] = useState(null);
  const [levelToRender, setLevelToRender] = useState(null);
  const [health, setHealth] = useState(null);
  const [likesInfo, setLikesInfo] = useState({});
  const [levelId, setLevelId] = useState(null)
  const [isGameOver, setIsGameOver] = useState(0); // 0 = playing, -1 = lost, 1 = won
  const [gameData, setGameData] = useState({ stonks: 0, holes: 0, bombs: 0, life: 0, })
  const [createData, setCreateData] = useState(null);
  const handleErrors = useHandleErrors();

  const getLevel = () => {
    if (id !== 'try') {
      handleErrors(async () => {
        const level = await retrieveLevel(id);
        setLevelId(id)
        setLayout(level.layout)
        const configuredLevel = configureLevelToRender(level.layout);
        setLevelToRender(configuredLevel);
        setHealth(level.hp ? level.hp : 5);
        setName(level.name);
        setLikesInfo({ likes: level.likes, isLevelLiked: level.isLevelLiked })
        setIsLoading(false);
      })
    } else {
      const { createdLayout, hp, levelName, data } = location.state;
      const configuredLevel = configureLevelToRender(createdLayout);
      setLevelToRender(configuredLevel);
      setLayout(createdLayout);
      setName(levelName);
      setHealth(hp ? hp : 5);
      setCreateData(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      handleErrors(async () => {
        const user = await retrieveLoggedUser();
        setAvatar(user.avatar)
      });
    };
    getLevel();
  }, [id]);

  const handleRetry = () => {
    setIsLoading(true);
    setLevelToRender(null);
    setHealth(null);
    setIsGameOver(0);
    setGameData({ stonks: 0, holes: 0, bombs: 0, life: 0, })
    getLevel();
  };

  const handleGameOver = (state) => {
    setIsGameOver(state);
    setGameData(prevGameData => ({
      ...prevGameData,
      stonks: state === 1 ? 1 : 0
    }));
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col flex-wrap">
      {isGameOver !== 0 && (
        <>
          <GameOver isGameWon={isGameOver > 0 ? true : false} onRetry={handleRetry} isCreatedLevel={'try' === id} layout={layout} hp={health} name={name} likesInfo={likesInfo} id={levelId} gameData={gameData} createData={createData} />
          <div className="top-0 inset-0 bg-black opacity-50"></div>
        </>
      )}
      <GameContainer level={levelToRender} initialHp={health} onGameOver={handleGameOver} avatar={avatar} setGameData={setGameData} />
    </section>
  );
};

export default inLogger(Game);
