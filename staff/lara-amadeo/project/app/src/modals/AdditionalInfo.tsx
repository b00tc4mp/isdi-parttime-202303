import './AdditionalInfo.css'
import Context from "../Context.js"
import { useContext, useState, useRef } from "react"
import DaySelector from '../library/components/DaySelector'
import Topbar from '../library/modules/Topbar'
import { registerAdditionalInfo } from '../logic/registerAdditionalInfo'
import { handleAdditionalInfoHelper } from '../logic/helpers/utils'
import Header from '../library/components/Header'
import TextArea from '../library/components/TextArea'
import TextField from '../library/components/TextField'
import TimeSelector from '../library/components/TimeSelector'
import ButtonBar from '../library/modules/ButtonBar'

export default function AdditionalInfo() {
    const { loaderOn, loaderOff, navigate } = useContext(Context)
    const [availabilityDays, setAvailabilityDays] = useState<string[]>([])
    const formRef = useRef<HTMLFormElement>(null)

    const days = ['1', '2', '3', '4', '5', '6', '7']

    const onDayClick = (day: string) => {
        if (availabilityDays && availabilityDays.includes(day)) {
            const updatedArray = availabilityDays.filter(item => item !== day)
            setAvailabilityDays(updatedArray)

        }
        else setAvailabilityDays(availabilityDays.concat(day))
    }

    const handleAdditionalInfo = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const { description, tags, location, availability } = handleAdditionalInfoHelper(formRef.current!, availabilityDays);

        (async () => {
            loaderOn()
            try {
                await registerAdditionalInfo(description, tags, location, availability)

                setTimeout(() => {
                    loaderOff()
                    navigate('/')
                }, 1000)

            } catch (error: any) {
                console.log(error)
            }

        })()
    }


    const handleSkipInfo = (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            loaderOn()

            setTimeout(() => {
                loaderOff()
                navigate('/')
            }, 1000)

        } catch (error: any) {
            console.log(error.message)
        }
    }

    const onClose = () => {
        navigate('/')
    }

    return <>
        <div className="page-first-level">
            <div className='additional-container'>
                <Topbar className={'topbar-modals'} level='second' secondLevel={{
                    label: "Complete profile",
                    close: true,
                    onCloseClick: onClose
                }} />
                <Header text={'Profile details'} />

                <form className='additional-form' ref={formRef}>
                    <TextArea name={'description'} label={'Description'} placeholder={'Start by writing a bit about yourself, this helps other users to get to know you.'} />
                    <TextField type={'text'} label={'Tags'} name={'tags'} placeholder={'Write some tags about your lifestyle. p.e. Healthy, Sporty, Diet...'} />
                    <TextField type={'text'} label={'Pick-up location'} name={'location'} />

                    {/*Availability options*/}
                    <div className='availability-container'>
                        <p className='body-text grey-700'>Availability</p>
                        <div className='availability-dots-container'>
                            {days.map(day => {
                                const dayText = `
                                ${day === '1' ? 'M' : ''}
                                ${day === '2' ? 'T' : ''}
                                ${day === '3' ? 'W' : ''}
                                ${day === '4' ? 'T' : ''}
                                ${day === '5' ? 'F' : ''}
                                ${day === '6' ? 'S' : ''}
                                ${day === '7' ? 'S' : ''}`
                                const state = `${availabilityDays && availabilityDays.includes(day) ? 'selected' : 'default'}`
                                return <DaySelector key={day} label={dayText} state={`${availabilityDays && availabilityDays.includes(day) ? 'selected' : 'default'}`} onClick={() => onDayClick(day)} />
                            })}
                        </div>
                    </div>
                    {availabilityDays.map(day => {
                        const daylabel = `
                        ${day === '1' ? 'Monday' : ''}
                        ${day === '2' ? 'Tuesday' : ''}
                        ${day === '3' ? 'Wednesday' : ''}
                        ${day === '4' ? 'Thursday' : ''}
                        ${day === '5' ? 'Friday' : ''}
                        ${day === '6' ? 'Saturday' : ''}
                        ${day === '7' ? 'Sunday' : ''}`
                        return <TimeSelector dayLabel={daylabel} firstLabel={'From'} secondLabel={'To'} firstName={`${daylabel.toLowerCase().trim()}From`} secondName={`${daylabel.toLowerCase().trim()}To`} />
                    })}
                </form>

                {/* buttonbar */}
                <ButtonBar firstButton={{
                    label: 'Finish',
                    onClick: handleAdditionalInfo
                }} link={{
                    label: 'Do it later',
                    onClick: handleSkipInfo
                }} />
            </div>
        </div>
    </>
}