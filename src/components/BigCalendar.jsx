import Calendar from 'react-awesome-calendar';
import React from 'react'

const events = [{
    id: 1,
    color: '#fd3153',
    from: '2024-01-02T18:00:00+00:00',
    to: '2024-01-02T19:00:00+00:00',
    title: 'This is an event'
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2024-01-01T13:00:00+00:00',
    to: '2024-01-01T14:00:00+00:00',
    title: 'This is another event'
    },
    {
        id: 2,
        color: '#1ccb9e',
        from: '2024-01-01T13:00:00+00:00',
        to: '2024-01-01T14:00:00+00:00',
        title: 'This is another event'
    }, {
    id: 3,
    color: '#3694DF',
    from: '2024-01-05T13:00:00+00:00',
    to: '2024-01-05T20:00:00+00:00',
    title: 'This is also another event'
}];

const BigCalendar = ()=> {
    
        return (
            <Calendar
                events={events}
            />
        );
    
}


export default BigCalendar
