import {
  BarElement, CategoryScale, Chart, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link, useParams } from 'react-router-dom';
import context from '../../../../app/src/logic/context';
import retrieveMission from '../logic/retrieveMission';
import retrieveMissionEvents from '../logic/retrieveMissionEvents';
import calculateTimeRemaining from './helpers/calculateTimeRemaining';
import copyToClipboard from './helpers/copyToClipboard';
import formatDateTime from './helpers/formatDateTime';
  
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MissionDetail = () => {
  const { missionId } = useParams();
  const [events, setEvents] = useState();
  const [mission, setMission] = useState();
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const updateMission = () => {
    try {
      retrieveMission(missionId)
        .then(mission => setMission(mission))
        .catch(error => alert(error))
    } catch (error) {
      alert(error.message);
    }
  };
  
  const updateEvents = () => {
    try {
      retrieveMissionEvents(missionId)
      .then(setEvents)
      .catch(error => alert(error))
      
    } catch (error){
      alert(error.message)
      }
  }

  useEffect(() => {
    updateMission();
    updateEvents();

    const updateInterval = setInterval(() => {
      updateMission();
      updateEvents();
    }, 15000);

    return () => clearInterval(updateInterval);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      updateTimer(mission.endDate);
    }, 1000);
  
    return () => clearInterval(timerInterval);
  }, [mission]);


  const updateTimer = (endDate) => {
    const timeRemainingData = calculateTimeRemaining(endDate);
    setTimeRemaining(timeRemainingData);
  };
  
  const chartData = {
    labels: ['Food', 'Water', 'Oxygen', 'Stress', 'health'],
    datasets: [
      {
        label: '',
        data: [
          mission?.traveler[0]?.food,
          mission?.traveler[0]?.water,
          mission?.traveler[0]?.oxygen,
          mission?.traveler[0]?.stress,
          mission?.traveler[0]?.health,
        ],
        backgroundColor: ['#D2B48C', '#ADD8E6', '#98FB98', '#E6E6FA', '#FFFACD'],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
  };
  
  
  let travelerImage = null;

  if (mission && mission.traveler[0]) {
    const travelerRace = mission.traveler[0].race;

    if (travelerRace === 'monkey') {
      travelerImage = <img
        className='w-2 mr-4 rounded-full object-cover' src='/assets/monkey.jpg'
      />;
    } else if (travelerRace === 'dog') {
      travelerImage = <img
        className='w-2 mr-4 rounded-full object-cover' src='/assets/dog.jpg'
      />;
    } else if (travelerRace === 'robot') {
      travelerImage = <img
        className='w-2 mr-4 rounded-full object-cover' src='/assets/robot.jpg'
      />;
    } else if (travelerRace === 'billionaire') {
      travelerImage = <img
        className='w-2 mr-4 rounded-full object-cover' src='/assets/billionaire.jpg'
      />;
    }
  }

  return (
    <div className='flex justify-center items-start mt-8'>
      <article className='mission bg-white shadow-md rounded-lg p-4 my-4 border'>
        <div className="mx-auto px-4 text-white bg-blue-500 rounded-lg">
          <div className='flex justify-between'>
            <footer className="w-full py-16">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="font-bold text-black text-lg mb-2">
                    <span style={{ color: 'black' }}>MISSION:</span> {missionId.slice(-3)}
                  </div>
                  {mission && (
                    <div className="font-bold text-black text-lg mt-2">
                      <span style={{ color: 'black' }}>DEFIANT:</span> {mission.creatorName}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={copyToClipboard}
                    className="bg-white hover:bg-gray-300 text-blue-500 font-bold py-1 px-4 mt-4 rounded mb-2"
                  >
                    Copy link
                  </button>
                  {context.token && (
                    <p className="back-home-button">
                      <Link to="/">Back to Home</Link>
                    </p>
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
        <br />
            <div>
              <div className='flex flex-row items-start'>
                <div 
                  style={{ width: '17.5rem', height: '17.5rem', padding: '0.5rem', marginTop: 'rem', background: '#4299E1'}} 
                  className='mr-4 rounded-full object-cover'
                  >
                  {travelerImage}
                </div>
                <div>
                  <Bar
                    data={chartData}
                    options={{ ...chartOptions, aspectRatio: 1 }}
                    style={{ width: '20rem', height: '20rem', padding: '1rem'}}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className='mission-header'>
            {mission && (
              <div className='flex justify-between'>
                <div className='flex-1 justify-start'>
                  <div className='text-lg mr-4'>
                  <strong>DESTINATION: </strong>
                    {mission.destination} {' '}
                  <span 
                    className={`${mission.status === 'in_progress' 
                    ? 'text-gray-500' 
                    : mission.status === 'failure' 
                    ? 'text-red-500' 
                    : 'text-green-500'}`}
                    > 
                    {mission.status}
                  </span>
                </div>
                <div className="text-sm mt-2">
                  <strong>BET VS:</strong>
                  {mission.participants.map((participant, index) => (
                    <div key={index}>
                      <div className='text-lg font-roboto'>
                        {mission.status === 'in_progress' ? (
                          <>
                            {participant.name}{' '}
                            <span className={`${
                              participant.confirmation === 'pending' 
                                ? 'text-gray-500' 
                                : participant.confirmation === 'decline' 
                                ? 'text-red-500' 
                                : 'text-green-500'
                            }`}>
                              {participant.confirmation}
                            </span>
                          </>
                        ) : (
                          <span className="text-red-500">out</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                <div className='flex-1'>
                <div className="ml-2">
                  <div className='text-lg'>
                    <strong >LOSER PRICE:</strong> {mission.loserPrice}
                  </div>
                  <div className='text-sm'>
                    <strong >MISSION STARTS:</strong> {formatDateTime(mission.startDate)}
                  </div>
                    <br />
                  {mission.status === 'in_progress' && (
                    <div>
                      <h3 className="text-black"><strong>TIME REMAINING:</strong></h3>
                      <p>
                        {
                          `${timeRemaining.days} days, 
                          ${timeRemaining.hours} hours, 
                          ${timeRemaining.minutes} minutes, 
                          ${timeRemaining.seconds} seconds`
                        }
                      </p>
                    </div>
                  )}
                  {mission.status !== 'in_progress' && (
                    <div className='text-sm'>
                      <strong >MISSION ENDS:</strong> {formatDateTime(events[ events.length -1].date)}
                    </div>
                  )}
                </div>
              </div>
              </div>
            )}
            </div>
            {events && events.length > 0 && (
            <div className='mt-4 p-4 border rounded-lg'>
              <h2 className='text-lg font-semibold mb-2'>EVENTS DAMAGE REPORT:</h2>
              {events.map((event, index) => (
                <div key={index} className='mb-4'>
                  <div className='text-sm'>
                    <span className='font-semibold'>Date:</span> {formatDateTime(event.date)}
                  </div>
                  <div className='text-sm'>
                    <span className='font-semibold'>Event:</span> {event.event}
                  </div>
                  <div className='text-sm'>
                    <span className='font-semibold'>Link:</span>{' '}
                    <a
                      href={event.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline'
                    >
                      {event.link}
                    </a>
                  </div>
                </div>
              ))} 
              </div>
            )}
        </article>
      </div>
  );
}

export default MissionDetail;
