import { validators } from 'com';

const { validateId, validateText } = validators;

const participantFeedback = (
  participantId,
  missionId,
  confirmation,
  feedback
) => {
  validateId(participantId, 'participant id');
  validateId(missionId, 'mission id');
  validateText(confirmation, 'confirmation');
  validateText(feedback, 'feedback');

  return fetch(
    `${
      import.meta.env.VITE_API_URL
    }/participant-feedback/${missionId}/${participantId}`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        participantId,
        missionId,
        confirmation,
        feedback,
      }),
    }
  ).then((res) => {
    if (res.status !== 201) {
      return res.json().then((error) => {
        throw new Error(error.message);
      });
    }
  });
};

export default participantFeedback;
