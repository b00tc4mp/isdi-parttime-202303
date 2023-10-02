import { useState } from 'react';
import formatDateTime from '../pages/helpers/formatDateTime';
import copyInvitationLink from './helpers/copyInvitationLink';

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

    const [showFeedback, setShowFeedback] = useState(false);

    const handleFeedback = (event) => {
      event.preventDefault();

      setShowFeedback(!showFeedback);
    };

    const handleCopyInvitationLink = (event, participantId) => {
      event.preventDefault();
    
      const link = `participant-feedback/${_id.toString()}/${participantId.toString()}`

      copyInvitationLink(link)
    }

    return (
      <article className="mission bg-white shadow-md rounded-lg p-4 my-4 border">
        <div className="mission-header">
        <div className="text-center bg-gray-200 p-4">
          <div className="text-xl font-semibold">Mission {_id.toString().slice(-3)}</div>
          <br />
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
          <div className="border border-gray-500 rounded-lg p-4 mt-4">
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
          <div className="border border-gray-500 rounded-lg p-4 mt-4">
            <div className="text-lg font-roboto">Creator: {creatorName}</div>
            <ul className="list-disc ml-6">
              <div className="text-lg font-roboto">Explorer: {traveler[0].race}</div>
            </ul>
            <div className="text-lg font-roboto">Destination: {destination}</div>
            <div className="text-lg font-roboto">Loser Price: {loserPrice}</div>
          </div>
            <div className="border border-gray-500 rounded-lg p-4 mt-4">
            <div className="text-lg font-roboto">Participants:</div>
              <ul className="list-disc ml-6">
              {participants.map((participant, index) => (
                <li key={index} className="text-lg font-roboto">
                  <div className="text-lg font-roboto">
                    {participant.name}
                    {participant.confirmation === 'pending' && status !== 'in_progress' && (
                      <span className="text-red-500"> no answer</span>
                    )}
                  </div>
                  {participant.confirmation === 'pending' && status === 'in_progress' && (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto"
                      onClick={(event) => handleCopyInvitationLink(event, participant._id)}
                    >
                      Copy Invitation Link
                    </button>
                  )}
                  {participant.confirmation !== 'pending' && (
                    <div className={`text-${participant.confirmation === 'decline' ? 'red' : 'green'}-500`}>
                      {participant.confirmation}
                      <div>
                        {participant.feedback !== undefined && (
                          <>
                            <button
                              className="button-feedback"
                              onClick={(event) => handleFeedback(event)}
                            >
                              Show Feedback
                            </button>
                            {showFeedback && (
                              <div className="text-lg font-roboto">{participant.feedback}</div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    );
};

export default Mission;



