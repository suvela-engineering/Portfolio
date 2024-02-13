import React from 'react'
import { skills, experiences } from '../constants/'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';

const About = () => {

  const skillImages = document.querySelectorAll(".btn-container img");

  skillImages.forEach((image) => {
    image.addEventListener("mouseover", () => {
      alert(image.title); // You can replace this with a more visual tooltip implementation
    });
  });

  return (
    <section className='max-container'>
      <h1 className='head-text'>Hello, I'm <span className='blue-gradient_text font-semibold
      drop-shadow'>Juho</span>
      </h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>Full-stack software developer based in Finland.
          Always willing to learn about new technologies and tools.</p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill, index) => (
            <div key={index} className='block-container w-20 h-20'>
              <div className='btn-back rounded-xl'></div> {/* Add shadow to box */}
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  title={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>I've worked a couple of years in the field of software development with awesome people
            and gained many new skills.
            Here's my work experience so far as a developer:</p>
          <div className='mt-12 flex'>
            <VerticalTimeline>
              {experiences.map((experience, index) => (
                <VerticalTimelineElement key={index}
                  date={experience.date}
                  icon={<div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>}
                  iconStyle={{ background: experience.iconBg }}
                  contentStyle={{
                    borderBottom: '8px',
                    borderStyle: 'solid',
                    borderBottomColor: experience.iconBg,
                    boxShadow: 'none'
                  }}
                >
                  <div>
                    <h3 className='text-black text-xl font-poppins font-semibold'>
                      {experience.title}
                    </h3>
                    <p className='text-black-500 font-medium font-base' style={{ margin: 0 }}>
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {experience.points.map((point, index) => (
                      <li key={`experience-point-${index}`}
                        className='text-black-500/50 font-normal pl-1 text-sm'>
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>
      </div>

      <hr className='border-slate-200'></hr>
      <CTA />
    </section>
  )
}

export default About