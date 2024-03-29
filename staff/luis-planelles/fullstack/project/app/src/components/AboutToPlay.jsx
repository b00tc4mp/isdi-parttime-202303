import { useState } from 'react';
import HowToPlay from '../components/HowToPlay';

const AboutToplay = ({onClose}) => {

  const [howToPlay, setHowToPlay] = useState(false);

  const handleClose = () => onClose();
  
  const handleLearnMore = () => setHowToPlay(true)


    return (
      <div class="play-info">
          <h1 className="text-3xl font-bold">Welcome to Space Pursuit!</h1><br />
          <p className="mt-1 text-1xl lg">
            Space Pursuit is an exciting social betting app where you can challenge your friends and set a prize, 
            whether it's a beer, a meal, or even dinner at a specific place. Here's how it works:
          </p>
          <ol className="mt-4 list-decimal list-inside">
            <li className="mb-2">
              <strong>Create a Challenge:</strong><br />
                Start by challenging your friends. Set a reward like a drink, a meal, 
                or something else.
            </li>
            <br />
            <li className="mb-2">
              <strong>Form a Crew:</strong> <br />
                Choose from various crew members, such as a monkey, a dog, a robot, or
                even a millionaire. Each one has its own skills and advantages.
            </li>
            <br />
            <li className="mb-2">
              <strong>Set up a Mission:</strong> <br />
                Define the mission's duration, which can be a trip to the Moon (1 day), 
                Mars (2 days), or an unexplored planet (5 days).
            </li>
            <br />
            <li className="mb-2">
              <strong>Challenge Accepted:</strong> <br />
                If someone accepts your challenge, the mission is activated. It will 
                connect to NASA's space-time API to simulate real-time space events.
            </li>
            <br />
            <li className="mb-2">
              <strong>Face Space Events:</strong> <br />
              During the mission, space events will cause damage to your crew member. 
              These events are real, and you can check them on the mission page with 
              a direct link to the NASA report. As you know, Space is uncertain, and 
              the success of a space mission is uncertain too.
            </li>
            <br />
            <li className="mb-2">
              <strong>Who Pays?:</strong> <br />
                If you overcome the events, the participant who accepted the challenge
                will reward you with the established prize. If you fail, you will be the one who has to pay.
            </li>
            <br />
          </ol>
          <p className="mt-4 text-lg">Get ready for the space adventure, 
            and may the best player win! Have fun on Space Pursuit!</p>
          <br />
 
        {howToPlay && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-md">
              <HowToPlay 
              onClose={handleClose}
              />
            </div>
          </div>
        )}
        <div className="flex flex-row mt-2">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto mt-4"
          onClick={handleLearnMore}
          >
            Learn More
        </button>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto mt-4"
          onClick={handleClose}
        >
          close
        </button>
        </div>
      </div>
    )
}

export default AboutToplay

