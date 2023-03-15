function Avenger(id, fullName, classRoom, city, job, studies,markAv) {
    this.id = id;
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
};
const tonyStark = new Avenger (1, "Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
console.log(tonyStark);
//Tony Stark, NYC... 