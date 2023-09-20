import {
  BarElement, CategoryScale, Chart, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link, useParams } from 'react-router-dom';
import formatDateTime from '../logic/formatDateTime';
import retrieveMission from '../logic/retrieveMission';
import retrieveUser from '../logic/retrieveUser';
import calculateTimeRemaining from "./helpers/calculateTimeRemaining";
import copyToClipboard from './helpers/copyToClipboard';
  
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
  const [user, setUser] = useState();
  const [mission, setMission] = useState();
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        retrieveMission(missionId)
          .then((mission) => {
            setMission(mission);
            updateTimer(mission.endDate);
          })
          .catch((error) => alert(error));
      } catch (error) {
        alert(error.message);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [missionId]);

  useEffect(() => {
    try {
      retrieveUser()
      .then(setUser)
      .catch(error => alert(error.message))
      
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
        className='w-2 mr-4 rounded-full object-cover'
        src='https://images.saatchiart.com/saatchi/2179415/art/10294067/9356691-MAMZSVLX-7.jpg'
      />;
    } else if (travelerRace === 'dog') {
      travelerImage = <img
        className='w-2 mr-4 rounded-full object-cover'
        src='https://cdnb.artstation.com/p/assets/images/images/054/242/543/large/futur3-art-46-dog-astronaut.jpg?1664100695'
      />;
    } else if (travelerRace === 'robot') {
      travelerImage = <img
        className='w-2 mr-4 rounded-full object-cover'
        src='https://t4.ftcdn.net/jpg/05/95/79/25/360_F_595792521_C1933LqJehWuldSDzdgbd8eNGre5ObT7.jpg'
      />;
    } else if (travelerRace === 'billionaire') {
      travelerImage = <img
        className='w-2 mr-4 rounded-full object-cover'
        src='https://img.freepik.com/premium-photo/woman-space-suit-with-blue-green-face_888757-173.jpg'
      />;
    }
  }

  return (
    <div className='flex justify-center items-start mt-8'>
      <article className='mission bg-white shadow-md rounded-lg p-4 my-4 border'>
      <div className='text-xl font-semibold'>
        MISSION: {missionId.slice(-3)}
      </div>
      <br />
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
              <div className='text-lg'>BET VS: {mission.participants[0].name}</div>
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
                <div className='text-lg text-red-500'>
                  Congratulations {mission.participants[0].name}! You are the winner.
                </div>
                <div className='text-lg'>
                  The mission creator owes you a {mission.loserPrice}.
                </div>
              </article>
            </div>
          )}
          {mission && mission.status === 'success' && (
            <div className='text-lg text-green-500'>
              The {mission.traveler[0].race} has reached the {mission.destination}. 
              Therefore, {mission.participants[0].name} owes {user.name} a {mission.loserPrice}.
            </div>
          )}
          <br />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Copy link
          </button>
        </div>
      <p className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </p>
      </article>
    </div>
  );
}

export default MissionDetail;