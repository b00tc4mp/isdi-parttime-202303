import { useState, useEffect } from 'react'
import EmployeeModal from './EmployeeModal'
import UpdateEmployeeModal from './UpdateEmployeeModal'
import { Input, Container, Button, FormButton, Select } from '../library'

export default function EmployeeFoundeModal({ employee: { _id, name, firstSurname, secondSurname, avatar, professionalEmail, professionalPhoneNumber, centerAttached, department, jobPosition }, }) {
    console.log("employeeFoundedModal --> open")

    const [modal, setModal] = useState(null)

    const handleEmployeeModal = () => {
        setModal('employeeModal')
    }
    const handleUpdateEmployeeModal = () => {
        setModal('updateEmployeeModal')
    }
    const handleCloseModal = () => {
        setModal(null)
    }

    return <section className="w-[99%] h-[80%] pl-1 bg-slate-200">
        <div className="w-full bg-slate-50 mb-2 flex border border-black p-3 rounded-[7px] shadow-md items-center">
            <img className="rounded-full mr-3" src={avatar} width="60rem" />
            <div className="flex flex-wrap">
                <div className="flex flex-wrap w-5/12">
                    <div className="w-11/12 pl-2 text-xs font-bold">{name} {firstSurname} {secondSurname}</div>
                    <div className="w-11/12 pl-2 text-xs justify-end">{professionalEmail}</div>
                    <div className="w-11/12 pl-2 text-xs justify-end">
                        {(professionalPhoneNumber).toString().replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3.$4')}</div>
                </div>
                <div className="flex flex-wrap w-5/12">
                    <div className="w-9/12 text-xs justify-end">Department: {department}</div>
                    <div className="w-9/12 text-xs justify-end">Job Position: {jobPosition}</div>
                    <div className="w-9/12 text-xs justify-end">Center Attached: {centerAttached}
                    </div>
                </div>
                <div className="flex flex-wrap w-2/12">
                    <button className="w-10/12 text-xs rounded-md bg-amber-500 px-3 py-1 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 drop-shadow-md text-cente" onClick={handleEmployeeModal}>Upper Level</button>
                    <button className="w-10/12 text-xs rounded-md bg-amber-500 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 drop-shadow-md text-center" onClick={handleUpdateEmployeeModal}>LowerLevel</button>
                </div >
            </div>
        </div>
        {modal === 'employeeModal' && < EmployeeModal
            key={_id}
            employeeId={_id}
            onEmployeeModalClose={handleCloseModal}
        />}
        {
            modal === 'updateEmployeeModal' && < UpdateEmployeeModal
                key={_id}
                employeeId={_id}
                onUpdateEmployeeModalClose={handleCloseModal}
                onEmployeeUpdated={handleCloseModal}
            />
        }
    </section>
}