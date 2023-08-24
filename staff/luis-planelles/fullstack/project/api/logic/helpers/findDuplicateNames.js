const findDuplicateNames = (participants) => {
  const names = participants.map((participant) => participant.name);

  const uniqueNames = {};
  const duplicateNames = [];

  for (const name of names) {
    if (uniqueNames[name]) {
      duplicateNames.push(name);
    } else {
      uniqueNames[name] = true;
    }
  }

  return duplicateNames;
};

module.exports = findDuplicateNames;
