import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

  const email = useRef('');
  async function registrationHandler(event) {
    event.preventDefault();
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ email: email.current.value })
    })
    const response = await res.json();
    console.log(response);
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
