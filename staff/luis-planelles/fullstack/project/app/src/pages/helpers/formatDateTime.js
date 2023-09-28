const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;

  return `day: ${formattedDate} hour: ${formattedTime}`;
};

export default formatDateTime;
