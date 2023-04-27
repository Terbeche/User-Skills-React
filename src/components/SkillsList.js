import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillsList = ({ username }) => {
    const [skills, setSkills] = useState([]);
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState(null);
    const [experiences, setExperiences] = useState([]); 
    const [education, setEducation] = useState([]);
    const [otherUsers, setOtherUsers] = useState([]);
    const [clickedSkill, setClickedSkill] = useState(null);

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
        setEducation(data.education);
        })
        .catch(error => console.error(error));
    }, [username]);


    useEffect(() => {
        if (clickedSkill && otherUsers) {
          navigate(`/${clickedSkill.name}`, { state: { skill: clickedSkill, experiences, education, otherUsers } });
    
          setClickedSkill(null);
        }
      }, [clickedSkill, otherUsers]);


  
    const handleSkillClick = (skill)  => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = `https://torre.bio/api/search/people`;


        fetch('https://search.torre.co/people/_search/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "skill/role": {
                    "text": skill.name,
                    "experience": "potential-to-develop"
                    }
            })
          })
            .then(response => response.json())
            .then(data => {
              setOtherUsers(data.results);
              setClickedSkill(skill);
            });
            
    };  

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

      <div id="profile-picture-wrapper"> 
        {picture && <img id="profile-picture" src={picture} alt="Profile" />}
        </div>
        {name && <h1 id='name'>{name}</h1>}
        
        <div className='skills'>

  
        <h2 className='skills-title'>Skills and Interests:</h2>
        <div className='skills-group'>
        {skillGroups.master.length !== 0 && <h2 className='skill-level'>Master</h2>}
        <ul>
            {skillGroups.master.map(skill => (
            <li className='skill-name' key={skill.name} onClick={() => handleSkillClick(skill)}>
                {skill.name}
            </li>
            ))}
        </ul>
        </div>

        <div className='skills-group'>
        {skillGroups.expert.length !== 0 && <h2 className='skill-level'>Expert</h2>}
        <ul>
          {skillGroups.expert.map(skill => (
            <li className='skill-name' key={skill.name} onClick={() => handleSkillClick(skill)}>
              {skill.name}
            </li>
          ))}
        </ul>
        </div>

        <div className='skills-group'>
        {skillGroups.proficient.length !== 0 && <h2 className='skill-level'>Proficient</h2>}
        <ul>
          {skillGroups.proficient.map(skill => (
            <li className='skill-name' key={skill.name} onClick={() => handleSkillClick(skill)}>
              {skill.name}
            </li>
          ))}
        </ul>
        </div>

        <div className='skills-group'>
        {skillGroups.novice.length !== 0 && <h2 className='skill-level'>Novice</h2>}
        <ul>
          {skillGroups.novice.map(skill => (
            <li className='skill-name' key={skill.name} onClick={() => handleSkillClick(skill)}>
              {skill.name}
            </li>
          ))}
        </ul>
        </div>
        
        <div className='skills-group'>
        {skillGroups["no-experience-interested"].length !== 0 && <h2 className='skill-level'>No Experience - Interested</h2>}
        <ul>
            {skillGroups["no-experience-interested"].map(skill => (
            <li className='skill-name' key={skill.name} onClick={() => handleSkillClick(skill)}>
                {skill.name}
            </li>
            ))}
        </ul>
        </div>
        </div>
      </>
    );
  };
  
  export default SkillsList;