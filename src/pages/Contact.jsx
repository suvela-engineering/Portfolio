import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        form_name: form.name,
        to_name: "Juho Suvela",
        from_email: form.email,
        to_email: 'juho.suvela@suvela-engineering.fi',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      showAlert({ show: true, text: 'Message sent successfully!', type: 'success' })

      // TODO: Hide an alert
      setForm({ name: '', email: '', message: '' });
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
      showAlert({ show: true, text: 'I didnt receive your message', type: 'danger' })
    })
  };

  const handleFocus = () => { };
  const handleBlur = () => { };

  return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
      <div className='flex-1 min-w-[50%] flex flex-col'>

        {alert.show && <Alert {...alert} />}

        <h1 className='head-text'>Get in Touch</h1>

        <form className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}>

          <label className='text-black-500 font-semibold'>Name
            <input
              type='text'
              name='name'
              className='input'
              placeholder='Max'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='max@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>Your Message
            <textarea
              name='message'
              rows={4}
              className='textarea'
              placeholder='Let me know how can I help you!'
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type='submit'
            className='btn'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>

  )
}

export default Contact