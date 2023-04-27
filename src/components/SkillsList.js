import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillsList = ({ username }) => {
    const [skills, setSkills] = useState([]);
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState(null);
    const [experiences, setExperiences] = useState([]); 


    const navigate = useNavigate();

    useEffect(() => {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = `https://torre.bio/api/bios/${username}`;
      fetch(proxyUrl + targetUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
          }
  
          return response.json();
        })
        .then(data => {
        setSkills(data.strengths);
        setPicture(data.person.picture);
        setName(data.person.name);
        setExperiences(data.experiences);
        })
        .catch(error => console.error(error));
    }, [username]);
  
    function handleSkillClick(skill) {
      navigate(`/${skill.name}`, { state: { skill, experiences } });

    }

    const skillGroups = {
        "no-experience-interested": [],
        novice: [],
        proficient: [],
        expert: [],
        master: []
    };
  
    skills.forEach(skill => {
      if(skill.proficiency === 'no-experience-interested') {
        skillGroups["no-experience-interested"].push(skill);
        } else if
       (skill.proficiency === 'novice') {
        skillGroups.novice.push(skill);
      } else if (skill.proficiency === 'proficient') {
        skillGroups.proficient.push(skill);
      } else if (skill.proficiency === 'expert') {
        skillGroups.expert.push(skill);
      } else if (skill.proficiency === 'master') {
        skillGroups.master.push(skill);
      }

    });
  
    return (
      <>        
        {picture && <img src={picture} alt="Profile" />}

        {name && <h1>{name}</h1>}
        
        <h2>Skills and Interests</h2>
        {skillGroups.master.length !== 0 && <h2>Master</h2>}
        <ul>
            {skillGroups.master.map(skill => (
            <li key={skill.name} onClick={() => handleSkillClick(skill)}>
                {skill.name}
            </li>
            ))}
        </ul>

        {skillGroups.expert.length !== 0 && <h2>Expert</h2>}
        <ul>
          {skillGroups.expert.map(skill => (
            <li key={skill.name} onClick={() => handleSkillClick(skill)}>
              {skill.name}
            </li>
          ))}
        </ul>

        {skillGroups.proficient.length !== 0 && <h2>Proficient</h2>}
        <ul>
          {skillGroups.proficient.map(skill => (
            <li key={skill.name} onClick={() => handleSkillClick(skill)}>
              {skill.name}
            </li>
          ))}
        </ul>

        {skillGroups.novice.length !== 0 && <h2>Novice</h2>}
        <ul>
          {skillGroups.novice.map(skill => (
            <li key={skill.name} onClick={() => handleSkillClick(skill)}>
              {skill.name}
            </li>
          ))}
        </ul>

        {skillGroups["no-experience-interested"].length !== 0 && <h2>No Experience Interested</h2>}
        <ul>
            {skillGroups["no-experience-interested"].map(skill => (
            <li key={skill.name} onClick={() => handleSkillClick(skill)}>
                {skill.name}
            </li>
            ))}
        </ul>
      </>
    );
  };
  
  export default SkillsList;

  

  
   