import { createContext, useEffect, useState } from "react";


const NotificationContext = createContext({
    notification: null,
    showNotification: function (){},
    hideNotification: function (){}
});

export function NotificationContextProvider(props){
    const [activeNotification, setActiveNotification] = useState();

    function showNotificationHandler(notificationData){
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler(){
        setActiveNotification(null)
    }

    useEffect(() => {
        if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')){
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000)
            
            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification])

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotificationHandler: hideNotificationHandler
    }
    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext