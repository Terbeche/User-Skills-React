import { useLocation } from 'react-router-dom';

const SkillDetails = () => {
  const location = useLocation();
  const skill = location.state.skill;
  const experiences = location.state.experiences;
  const education = location.state.education;
  const otherUsers = location.state.otherUsers;

  const relatedExperiences = experiences.filter(experience =>
    experience.strengths.includes(skill.name)
  );

  const relatedEducation = education.filter(education =>
    education.strengths.includes(skill.name)
  );

  return (
    <div>
      <h2>{skill.name}</h2>
      <p>Proficiency: {skill.proficiency}</p>
      <h3>Related Experiences</h3>
      <ul>
        {relatedExperiences.map(experience => (
          <li key={experience.id}>{experience.name}</li>
        ))}
      </ul>
      <h3>Other Users with this Skill</h3>
      <ul>
        {otherUsers.map(user => (
          <li key={user.username}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillDetails;