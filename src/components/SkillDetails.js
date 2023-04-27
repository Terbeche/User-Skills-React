import { useLocation } from 'react-router-dom';

const SkillDetails = () => {
  const location = useLocation();
  const skill = location.state.skill;
const experiences = location.state.experiences;

const relatedExperiences = experiences.filter(experience =>
    experience.strengths.includes(skill.name)
  );
  return (
    <div>
      <h2>{skill.name}</h2>
      <p>{skill.proficiency}</p>
      <h3>Related Experiences</h3>
      <ul>
        {relatedExperiences.map(experience => (
          <li key={experience.id}>{experience.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillDetails;