import React from 'react'
import EventList from '../components/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';

const index = ({ data }) => {
    return (
        <EventList data={data} />
    )
    
}

export async function getStaticProps(){

    const data = await getFeaturedEvents();
    return {
        props: {
            data
        },
        revalidate: 1800
    }
}

export default index
