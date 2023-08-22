export default function Employee({ employee: { name, firstSurname, secondSurname, avatar, salaryLevel } }) {
    return <div className="w-9/12 bg-slate-50 flex ml-20 mb-2 border border-black p-3 rounded-[7px]">
        <img className="rounded-[25px]" src={avatar} width="25px" />
        <div className="w-9/12 pl-2">{name} {firstSurname} {secondSurname}</div>
        <div className="w-4/12 justify-end">Salary Level: {salaryLevel}</div>
    </div>
}