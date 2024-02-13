import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
    return (
        <section className='cta'>
            {/* break tag is visible only on small devices, else it is hidden  */}
            <p className='cta-text'>Driven to code the future. <span> </span>
                <br className='sm:block hidden' />
                Is there a place for me on your team?</p>
            <Link to="/Contact" className='btn'>
                Contact
            </Link>
        </section>
    )
}

export default CTA