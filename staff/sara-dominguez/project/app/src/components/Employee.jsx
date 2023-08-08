export default function Employee({ employee: { name, firstSurname, secondSurname, avatar, salaryLevel } }) {


    return <div>
        <h4> <img src={avatar} width="25px" /> {name} {firstSurname} {secondSurname} salary Level:{salaryLevel}
        </h4>
    </div>
}