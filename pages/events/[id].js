import React from 'react'
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

const EventSingle = ({ event }) => {

    if(!event){
        return <p>No Event</p>;
    }
    return (
        <div>
            <EventSummary title={event.title} />
            <EventLogistics event={event} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </div>
    )
}

export async function getStaticProps(context){
    const id = context.params.id;
    const event = await getEventById(id);
    return {
        props: {
            event
        },
        revalidate: 30
    }
}

export async function getStaticPaths(){
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params: {id: event.id} }));

    return {
        paths,
        fallback: true
    };
}
export default EventSingle
