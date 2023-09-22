import formatDateTime from '../logic/formatDateTime';

const Mission = (
  { 
    mission: 
    {
      _id,
      creatorName,
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
      <article className="mission bg-white shadow-md rounded-lg p-4 my-4 border">
        <div className="mission-header">
          <div className="text-xl font-semibold">Mission {_id.toString().slice(-3)}</div>
          <div 
            className={
            `text-sm ${status === 'in_progress' ? 
            'text-gray-500' : 
            status === 'failure' ? 
            'text-red-500' : 
            'text-green-500'}`
            }>
          <span className="text-blue-500">MISSION STATUS: </span> 
          <span className="text-black">{status}</span>
          </div>
          <div className="mt-4">
            <div className="text-lg font-roboto">Creator: {creatorName}</div>
            <ul className="list-disc ml-6">
              <div className="text-lg font-roboto">Explorer: {traveler[0].race}</div>
            </ul>
            <div className="text-lg font-roboto">Destination: {destination}</div>
            <div className="text-lg font-roboto">Participants:</div>
            <ul className="list-disc ml-6">
              {participants.map((participant, index) => (
                <li key={index} className="text-lg font-roboto">
                  {participant.name}
                </li>
              ))}
            </ul>
            <div className="text-lg font-roboto">Loser Price: {loserPrice}</div>
            <div className="text-sm mt-2">
              <time className="text-xs font-roboto" dateTime={startDate}>
                Mission Starts: {formatDateTime(startDate)}
              </time>
            </div>
            <div className="text-sm">
              <time className="text-xs font-roboto" dateTime={endDate}>
                Mission Ends: {formatDateTime(endDate)}
              </time>
            </div>
          </div>
        </div>
      </article>
    );
    
};

export default Mission;



