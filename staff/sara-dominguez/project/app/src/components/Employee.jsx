export default function Employee({ employee: { id, name, firstSurname, secondSurname, avatar, salaryLevel } }) {


    return <div>
        <h4> <img src={avatar} width="25px" />{name}{firstSurname}{secondSurname}{salaryLevel}
        </h4>
    </div>
}