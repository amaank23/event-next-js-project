import { useRouter } from 'next/router';
import React from 'react'
import EventList from '../../components/event-list';
import EventsFilter from '../../components/events-filter';
import { getAllEvents } from '../../helpers/api-utils';

const index = ({ data }) => {
    const router = useRouter()
    function eventsFilter(month, year){
        router.push(`/events/${year}/${month}`)
    }
    return (
        <>
            <EventsFilter eventsFilter={eventsFilter} />
            <EventList data={data} />
        </>
        
    )
}

export async function getStaticProps(){
    const data = await getAllEvents();

    return {
        props: {
            data
        }
    }
}

export default index
