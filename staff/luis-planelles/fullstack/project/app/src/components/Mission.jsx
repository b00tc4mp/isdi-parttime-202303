import formatDateTime from '../logic/formatDateTime';

const Mission = (
  { 
    mission: 
    {
      _id,
      traveler, 
      destination, 
      status, 
      participants, 
      loserPrice, 
      startDate, 
      endDate
    }
  }) => {

  return (
    <article className='mission bg-white shadow-md rounded-lg p-4 my-4 border'>
      <div className='mission-header'>
      <div className='text-xl font-semibold'> Mission {_id.toString().slice(-3)} </div>
      <br />
        <div className='text-lg'>Explorer:</div>
        <ul className='list-disc ml-6'>
          {traveler.map((travelerInfo, index) => (
            <li key={index} className='text-lg'>{travelerInfo.race}</li>
          ))}
        </ul>
        <div className='text-lg'>Destination:</div>
        <ul className='list-disc ml-6'>
          <li className='text-lg'>{destination}</li>
        </ul>
        <div className={`text-sm ${status === 'in_progress' ? 'text-gray-500' : status === 'failure' ? 'text-red-500' : 'text-green-500'}`}>
          Mission Status: {status}
        </div>
        <div className='text-lg'>Participants:</div>
        <ul className='list-disc ml-6'>
          {participants.map((participant, index) => (
            <li key={index} className='text-lg'>{participant.name}</li>
          ))}
        </ul>
        <div className='text-lg'>Loser Price:</div>
        <ul className='list-disc ml-6'>
          <li className='text-lg'>{loserPrice}</li>
        </ul>
        <div className='text-sm'>
          <time className='text-xs' dateTime={startDate}>
            Mission Starts: {formatDateTime(startDate)}
          </time>
        </div>
        <div className='text-sm'>
          <time className='text-xs' dateTime={endDate}>
            Mission Ends: {formatDateTime(endDate)}
          </time>
        </div>
      </div>
    </article>
  );
};

export default Mission;



