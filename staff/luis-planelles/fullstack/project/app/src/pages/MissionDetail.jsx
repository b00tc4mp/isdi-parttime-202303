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


  useEffect(() => {
    const updateMission = () => {
      try {
        retrieveMission(missionId)
          .then((mission) => {
            setMission(mission);
          })
          .catch((error) => alert(error));
      } catch (error) {
        alert(error.message);
      }
    };

    updateMission()

    const missionInterval = setInterval(updateMission, 15000);

    return () => clearInterval(missionInterval);
  }, []);


  useEffect(() => {
    const timerInterval = setInterval(() => {
        updateTimer(mission.endDate);
    }, 1000);
  
    return () => clearInterval(timerInterval);
  }, [mission]);

  useEffect(() => {
    try {
      retrieveMissionEvents(missionId)
      .then(setEvents)
      .catch(error => alert(error))
      
    } catch (error){
      alert(error.message)
      }
    }, []);

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
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
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
    <div className='flex justify-between'>
      <div>
        <div className='text-xl font-semibold'>
          MISSION: {missionId.slice(-3)}
        </div>
        {mission && (
        <div className='text-lg'>
          DEFIANT: {mission.creatorName}
        </div>
        )}
      </div>
      <div className='flex flex-col'>
        <button
          onClick={copyToClipboard}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'
        >
          Copy link
        </button>
        <br />
        {context.token && 
        <p className='mt-2'>
          <Link to='/' className='text-blue-500 hover:underline'>Back to Home</Link>
        </p>
        }
      </div>
    </div>
        <div>
          <div className='flex flex-row items-start'>
            <div 
              style={{ width: '24rem', height: '24rem' }} 
              className='mr-4 rounded-full object-cover'
              >
              {travelerImage}
            </div>
            <div>
              <Bar
                data={chartData}
                options={{ ...chartOptions, aspectRatio: 1 }}
                style={{ width: '22rem', height: '22rem' }}
              />
            </div>
          </div>
        </div>
        <br />
        <div className='mission-header'>
          {mission && (
            <div>
              <div className='text-lg'>
                EXPLORER: {mission.traveler[0].race}
              </div>
              <div className='text-lg'>DESTINATION: {mission.destination}</div>
              <div
                className={`text-sm ${
                  mission.status === 'in_progress'
                    ? 'text-gray-500'
                    : mission.status === 'failure'
                      ? 'text-red-500'
                      : 'text-green-500'
                }`}
              >
                MISSION STATUS: {mission.status}
              </div>
              BET VS:
              {mission.participants.filter((participant) => participant.confirmation === 'accept').length > 0 ? (
                mission.participants
                  .filter((participant) => participant.confirmation === 'accept')
                  .map((participant, index) => (
                    <div key={index}>
                      <div className="text-lg">{participant.name}</div>
                    </div>
                  ))
              ) : (
                <div className="text-red-500">
                  No participants have accepted the mission yet, we are waiting for feedback.
                </div>
              )}
              <div className='text-lg'>LOSER PRICE: {mission.loserPrice}</div>
              <div className='text-sm'>
                <time className='text-xs' dateTime={mission.startDate}>
                  MISSION STARTS: {formatDateTime(mission.startDate)}
                </time>
              </div>
              <div className='text-sm'>
                <time className='text-xs' dateTime={mission.endDate}>
                  MISSION ENDS: {formatDateTime(mission.endDate)}
                </time>
              </div>

              {mission.status === 'in_progress' && (
                <div>
                  <h3>TIME REMAINING:</h3>
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
            </div>
          )}
          {mission && mission.status === 'failure' && (
            <div className='flex justify-center items-start mt-8'>
              <article className='mission bg-white shadow-md rounded-lg p-4 my-4 border'>
                {mission.participants.map((participant, index) => (
                  <div key={index} className='text-lg text-green-500'>
                    Congratulations {participant.name}! You are the winner.
                  </div>
                ))}
                <div className='text-lg'>
                  {mission.creatorName} owes you a {mission.loserPrice}.
                </div>
              </article>
            </div>
          )}
          {mission && mission.status === 'success' && (
            <div className='text-lg text-green-500'>
              The {mission.traveler[0].race} has reached the {mission.destination}. 
              Therefore, {mission.participants.map((participant, index) => (
                <span key={index}>
                  {participant.name}
                  {index < mission.participants.length - 1 ? ', ' : ''}
                </span>
              ))} 
              owes {mission.creatorName} a {mission.loserPrice}.
            </div>
          )}
          {events && events.length > 0 && (
            <div className='mt-4 p-4 border border-gray-300 rounded-lg'>
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
        </div>
      </article>
    </div>
  );
}

export default MissionDetail;
