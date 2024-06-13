import IData from "./IData";
/*
*/

export default interface ILoginStore{
    data:IData
    setData:(value:IData) => void
}

