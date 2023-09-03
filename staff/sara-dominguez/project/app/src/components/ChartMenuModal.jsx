import { useState } from 'react'
import ChildrenChart from './ChildrenChart'
import getTreeChart from '../logic/getTreeChart'
import { Input, Container, Button, FormButton } from '../library'
import useAppContext from '../hooks/useAppContext'
import Header from "./Header"


export default function ChartMenuModal({ employee, onCloseEmployeeChartMenuModal }) {
    console.log("searchEmployee --> open")

    const [chartGetted, setChartGetted] = useState(null)
    const [view, setView] = useState(null)
    const { alert } = useAppContext()

    const handleGetTreeChart = async (event) => {
        event.preventDefault()
        setView('companyChart')

        const searchPattern = event.target.employeesToSearch.value

        if (!searchPattern) {
            throw alert('No search criteria found')
        }

        try {
            const chartGetted = await getTreeChart(searchPattern)
            setChartGetted(chartGetted)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCloseEmployeeChartMenuModal = () => {

        onCloseEmployeeChartMenuModal()
    }


    return <Container tag="section" className="black w-[95%]">
        <Header employee={employee}
        />
        <main className="h-full mr-2 bg-slate-200 overflow-auto">
            <form className="ChartMenuModal  bg-slate-200 ml-30 flex flex-wrap sticky top-0 z-10 items-center overflow-auto" onSubmit={handleGetTreeChart} >
                <Input className="ml-36 placeholder:text-xs" type="text" name="employeesToSearch" placeholder="Search" />
                <div className="w-full flex mr-auto ml-auto p-0">
                    <FormButton className="w-[45%] h-[47%] ml-72 mr-5 mt-4 mb-5">Search</FormButton>
                </div>
            </form>
            <div className="flex flex-col">
                {view === 'companyChart' && chartGetted && (chartGetted).map((chartNode) => <ChildrenChart
                    key={chartNode.id}
                    child={chartNode}
                />)}
            </div>
        </main >
        <footer>
            <h5 className=" ml-1 p-0.5 sticky bottom-0 bg-slate-200 z-10 italic cursor-pointer rounded-b-[7px]" onClick={handleCloseEmployeeChartMenuModal}>Logout</h5>
        </footer>
    </Container>
}




