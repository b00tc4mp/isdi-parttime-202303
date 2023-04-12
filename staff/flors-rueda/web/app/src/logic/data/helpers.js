export const generateUUID = () => {
    let date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
      let random = Math.random() * 16;
      random = (date + random) % 16 | 0;
      date = Math.floor(date / 16);
      return (character === 'x' ? random : (date)).toString(16);
    });
};
