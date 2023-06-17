import { useState } from 'react'
import Modal from '../../components/shared/Modal'
import Calendar from 'react-calendar'

const ProgramPage = () => {
    const [dates, setDates] = useState([])


    const handleSelect = (value, event) => {
        if (event.target.tagName === 'BUTTON') {
            event.target.classList.toggle('react-calendar__tile--active')
        } else if (event.target.tagName === 'ABBR') {
            event.target.parentElement.classList.toggle('react-calendar__tile--active')
        };

        const dateValue = value.toDateString();

        if (dates.includes(dateValue)) {
            setDates(state => [...state.filter(date => date !== dateValue)])
        } else {
            setDates(state => [...state, dateValue])
        };

    };

    return (
        <div>
            <Modal extraClass={'h-screen'}>

                <div>
                    <h1 className='text-center font-bold text-lg mb-4'>
                        Selecteaza zilele in care esti disponibil
                    </h1>
                    <p>- cel putin 14 zile</p>

                    {/* <Calendar value={date} minDate={new Date()} 
                    showNeighboringMonth={false} view="month"
                    onChange={(value) => setDate(new Date(value).toDateString())} 
                    prev2Label={null} next2Label={null}
                    /> */}
                     <Calendar  minDate={new Date()} 
                    showNeighboringMonth={false} view="month"
                    prev2Label={null} next2Label={null}
                    value={''}
                    onChange={handleSelect}
                    // onChange={(value, event) => console.log(value)}
                    
                    />

                </div>
            </Modal>
        </div>
    )
}

export default ProgramPage
