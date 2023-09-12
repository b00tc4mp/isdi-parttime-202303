const Mission = ({ mission: { id, traveler, destination, status, participants, loserPrice, startDate, endDate } }) => {
  const { name } = participants[0];
  const { race } = traveler[0];

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return `day: ${formattedDate} hour: ${formattedTime}`;
  }

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

