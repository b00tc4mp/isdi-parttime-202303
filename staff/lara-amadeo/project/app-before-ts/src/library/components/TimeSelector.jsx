import "./TimeSelector.css"

export default function TimeSelector({ dayLabel, firstLabel, secondLabel, firstName, secondName, ...props }) {

    return <>
        <div className='time-selector-day-container'>
            <p className='body-text-bold grey-700'>{dayLabel}</p>
            <div className='time-selector-range'>

                <div className='time-selector-container'>
                    <label className="body-text grey-700" htmlFor="mondayFrom">{firstLabel}</label>
                    <input type='time' className='time-selector' name={`${firstName}`}></input>
                </div>

                <div className='time-selector-container'>
                    <label className="body-text grey-700" htmlFor="mondayTo">{secondLabel}</label>
                    <input type='time' className='time-selector' name={`${secondName}`}></input>
                </div>

            </div>
        </div>
    </>
}