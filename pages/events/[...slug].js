import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import EventList from '../../components/event-list'
import { getFilteredEvents } from '../../helpers/api-utils'

const FilteredEvent = ({ filteredData, error }) => {
    const router = useRouter()
    if(!router.query.slug){
        return <p>LOADING.......</p>
    }

    if(error){
        return <p>Invalid Filter</p>
    }

    
    if(filteredData.length === 0){
        return <p>No Events Found</p>
    }
    return (
        <>
            <EventList data={filteredData} />
        </>
    )
}

export async function getServerSideProps(context){
    const [ year, month ] = context.params.slug;
    let error = false;

    const newYear = +year;
    const newMonth = +month;

    if(isNaN(newYear) || isNaN(newMonth)){
        error = true
    }

    const filteredData = await getFilteredEvents({ year: newYear, month: newMonth });

    console.log(filteredData);
    return {
        props: {
            filteredData,
            error
        }
    }
}


export default FilteredEvent
