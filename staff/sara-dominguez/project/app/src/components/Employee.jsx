import { useState, useEffect } from 'react'

export default function Employee({ employee: { _id, name, firstSurname, secondSurname, avatar, salaryLevel }, onReIncorporatedEmployee, onDeletedEmployee }) {
    const [isDeleted, setIsDeleted] = useState(false)
    const [view, setView] = useState(null)

    const handleDeleteEmployee = () => {
        if (isDeleted) {
            setView(null)
            setIsDeleted(false)
            onReIncorporatedEmployee(_id)
        } else {
            setView('deletedPayrollmonthToBePaid')
            setIsDeleted(true)
            onDeletedEmployee(_id)
        }
    }
    const deleteText = view === 'deletedPayrollmonthToBePaid' ? '🔙' : '🗑'

    return <div className={`w-9/12 bg-slate-50 flex ml-20 mb-2 border border-black p-3 rounded-[7px] shadow-md items-center ${view === 'deletedPayrollmonthToBePaid' ? 'bg-red-300' : 'bg-neutral-50'}`}>
        <img className="rounded-[25px]" src={avatar} width="25rem" />
        <div className="w-7/12 pl-2 text-xs">{name} {firstSurname} {secondSurname}</div>
        <div className="w-4/12 text-xs ml-">Salary Level: {salaryLevel}</div>
        <div className="w-1/12 text-xs ml-2" onClick={handleDeleteEmployee}>{deleteText}</div>
    </div>
}