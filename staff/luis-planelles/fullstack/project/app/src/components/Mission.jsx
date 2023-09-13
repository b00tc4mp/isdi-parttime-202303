import formatDateTime from '../logic/formatDateTime';

const Mission = (
  { 
    mission: 
    { 
    id, 
    traveler, 
    destination, 
    status, 
    participants, 
    loserPrice, 
    startDate, 
    endDate 
    } 
  }) => {

  const { name } = participants[0];
  const { race } = traveler[0];

  return (
    <article className='mission bg-white shadow-md rounded-lg p-4 my-4 border'>
      <div className='mission-header'>
        <div className='text-xl font-semibold'>{race}</div>
        <div className='text-lg'>{destination}</div>
        <div className={`text-sm ${status === 'in_progress' ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </div>
        <div className='text-lg'>{name}</div>
        <div className='text-lg'>{loserPrice}</div>
        <div className='text-sm'>
          <time className='text-xs' dateTime={startDate}>
            {formatDateTime(startDate)}
          </time>
        </div>
        <div className='text-sm'>
          <time className='text-xs' dateTime={endDate}>
            {formatDateTime(endDate)}
          </time>
        </div>
      </div>
    </article>
  );
};

export default Mission;

