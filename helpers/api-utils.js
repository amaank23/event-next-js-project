export async function getAllEvents(){
    try {
        const response = await fetch('https://next-js-event-project-default-rtdb.firebaseio.com/events.json');
        const data = await response.json();
        const events = [];

        for (const key in data){
            events.push({
                id: key,
                ...data[key]
            })
        }
        return events;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getFeaturedEvents() {
    const data = await getAllEvents();
    return data.filter((event) => event.isFeatured);
  }

  export async function getEventById(id) {
    const data = await getAllEvents();
    return data.find((event) => event.id === id);
  }

  export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const events = await getAllEvents();
  
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      console.log(eventDate.getFullYear(), eventDate.getMonth());
      console.log(year, month - 1);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }