import { useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const email = useRef('');
  async function registrationHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: 'Signing Up...',
      message: 'Registering for newsletter',
      status: 'pending'
    })

    try {
      let response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email: email.current.value })
      })
        
      if(response.ok){
        response = await response.json();
        notificationCtx.showNotification({
          title: 'Signed Up Successfully',
          message: response.message,
          status: 'success'
        })
        return;
      }

      
      response = await response.json();
      throw new Error(response.message);


      
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Oops, Something Went Wrong!!!',
        message: error.message,  
        status: 'error'
      })
    }
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={email}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
