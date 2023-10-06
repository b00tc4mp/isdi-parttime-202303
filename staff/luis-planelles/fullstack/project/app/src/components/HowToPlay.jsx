import { useAppContext } from '../hooks';

const HowToPlay = ({onClose}) => {
  const { navigate} = useAppContext()

  const handleGoToLogin = () =>  onClose()
  
  const handleGoToRegister = () => navigate('/register')
  

  return (
    <div class="play-info">
      <h1 className="text-3xl font-bold">How to play</h1>
      <br />
      <p className="mt-1 text-1xl lg">
        <strong>First, you need to create a user account:</strong> <br /> Register, 
        and you'll be able to create your mission on the main page. <br /><br /><strong>Creating a mission is simple:</strong>
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Choose a crew member:</strong> <br />A monkey, a dog, a robot, or a millionaire.
        </li>
        <br />
        <li>
          <strong>Select a destination:</strong> <br />The Moon (1 day), Mars (2 days), or an unexplored planet (3 days).
        </li>
        <br />
        <li>
          <strong>Select participant:</strong><br />Pick a person you want to challenge.
        </li>
        <br />
        <li>
          <strong>Set a loser price: </strong> <br />Set a prize for the loser.
        </li>
      </ul>
      <p className="mb-4">
        <strong>Once the mission is created:</strong> <br />Click on it and copy the confirmation link. Send it to your challenger(s), 
        and they will either accept or decline. If they accept, the mission will proceed, and a winner will be 
        determined when it ends, either in success or failure for you. However, we believe that winning or 
        losing has never been the most important thing. <br /> <br /><strong>Good luck!</strong> <br />
      </p>
      <div className="flex flex-row mt-2">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto mt-4"
          onClick={handleGoToRegister}
        >
          Register
        </button>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto mt-4"
          onClick={handleGoToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default HowToPlay;
