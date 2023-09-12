
const Mission = ({ mission: { id, traveler, destination, status, participants, loserPrice, startDate, endDate},
}) => {
  
  const { name } = participants[0]
  const { race } = traveler[0]
  

  return (
    <article className='mission' key={id}>
        <div className='mission-header'>
            <p className='mission-traveler'>{race}</p> 
            <p className='mission-destination'>{destination}</p>
            <p className='mission-status'>{status}</p>
            <p className='mission-participants'>{name}</p> 
            <p className='mission-destination'>{loserPrice}</p>
            <p className='mission-start-date'><time>{startDate.toLocaleString()}</time></p>
            <p className='mission-end-date'><time>{endDate.toLocaleString()}</time></p>
        </div>
      </article>
  );
}

export default Mission