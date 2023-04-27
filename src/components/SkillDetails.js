import { useLocation } from 'react-router-dom';
import React from 'react';

const SkillDetails = () => {
    const location = useLocation();
    const skill = location.state.skill;
    const education = location.state.education;
    const jobs = location.state.jobs;
    const projects = location.state.projects;
    const otherUsers = location.state.otherUsers;

//   const relatedEducation = education.filter(education =>
//     education.strengths.includes(skill.name)
//   );

//   const relatedJobs = jobs.filter(jobs =>
//     jobs.strengths.includes(skill.name)
//   );

//     const relatedProjects = projects.filter(projects =>
//         projects.strengths.includes(skill.name)
//     );

  return (
    <div className='skill-details'>
      <h2>{skill.name}</h2>
      <h3 className='skill-proficiency'>Proficiency: <span>{skill.proficiency}</span></h3>
        <p className='skill-recommendations'>Recommendations: <span>{skill.recommendations}</span></p>
        <hr></hr>
        
        <div className='experience-info'>
        <h3 className='section-title'>Related Jobs:</h3>
        <ul>
            {jobs.map(job => (
            <React.Fragment key={job.id}>
                <li className='experience'>{job.name}</li>
                {job.organizations && job.organizations[0] && (
                        <li className='organization-name'>{job.organizations[0].name}</li>
                    )}
                 <li className='experience-date'>
                        {job.fromMonth && job.fromMonth.slice(0, 3)} {job.fromYear} - {job.toMonth && job.toMonth.slice(0, 3)} {job.toYear}
                </li>    
               </React.Fragment>
        ))}
        </ul>
        </div>
        <hr></hr>


        <div className='experience-info'>
        <h3 className='section-title'>Related Education:</h3>
        <ul>
            {education.map(education => (
            <React.Fragment key={education.id}>
                <li className='experience'>{education.name}</li>
                {education.organizations && education.organizations[0] && (
                        <li className='organization-name'>{education.organizations[0].name}</li>
                    )}
            </React.Fragment>
        ))}
        </ul>
        </div>
        <hr></hr>


        <div className='experience-info'>
        <h3 className='section-title'>Related Projects:</h3>
        <ul>
            {projects.map(projects => (
                <React.Fragment key={projects.id}>
                    <li className='experience'>{projects.name}</li>
                    {projects.organizations && projects.organizations[0] && (
                        <li className='organization-name'>{projects.organizations[0].name}</li>
                    )}
                </React.Fragment>
        ))}
        </ul>
        </div>
        <hr></hr>

        <h3 className='other-users-section'>Other people with this skill:</h3>
        <ul>
            {otherUsers.map(user => (
                <li key={user.username} className='single-user'>
                    {user.picture ? (
                        <img className="profile-picture" src={user.picture} alt="Profile" />
                    ) : (
                        <div className="profile-picture-placeholder"></div>
                    )}
                    <div className='single-user-details'>
                        <span className='single-user-name'>{user.name}</span>
                        <span className='single-user-headline'>{user.professionalHeadline}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default SkillDetails;