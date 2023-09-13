import {
  BarElement, CategoryScale, Chart, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import formatDateTime from '../logic/formatDateTime';
import retrieveMission from '../logic/retrieveMission';
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
  const [mission, setMission] = useState(null);
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

  const updateTimer = (endDate) => {
    const endDateObject = new Date(endDate)
    const now = new Date().getTime();
    const timeDifference = endDateObject - now;

    if (timeDifference <= 0) {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }
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
    }else if (travelerRace === 'billionaire') {
      travelerImage = <img 
      className='w-2 mr-4 rounded-full object-cover' 
      src='https://img.freepik.com/premium-photo/woman-space-suit-with-blue-green-face_888757-173.jpg'
      />;
    }
  }

  return (
    <div className='flex justify-center items-start mt-8'>
      <article className='mission bg-white shadow-md rounded-lg p-4 my-4 border'>
        <div>
          <div className='flex flex-row items-start'>
            <div style={{ width: '24rem', height: '24rem' }} className='mr-4 rounded-full object-cover'>
              {travelerImage}
            </div>
            <div>
              <Bar 
                data={chartData} 
                options={{...chartOptions, aspectRatio: 1}} 
                style={{ width: '22rem', height: '22rem' }} 
              />
            </div>
          </div>
        </div>
        <br />
        <div className='mission-header'>
          {mission && (
            <div>
              <div className='text-xl font-semibold'>
                CAPTAIN: {mission.traveler[0].race}
              </div>
              <div className='text-lg'>DESTINATION: {mission.destination}</div>
              <div
                className={`text-sm ${
                  mission.status === 'in_progress'
                    ? 'text-green-500'
                    : 'text-red-500'
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
              <div>
                <h3>TIME REMAINING:</h3>
                <p>
                  {`${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, ${timeRemaining.seconds} seconds`}
                </p>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}  

export default MissionDetail;