import React, { useState } from 'react';

interface SkillsProps {
  skills: string[];
  isEditable: boolean;
}

const Skills: React.FC<SkillsProps> = ({ skills, isEditable }) => {
  const [skillList, setSkillList] = useState<string[]>(skills);
  const [newSkill, setNewSkill] = useState<string>('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkillList([...skillList, newSkill]);
      setNewSkill('');
    }
  };

  const handleSaveSkills = async () => {
    // Implement API call to save skills
    // Example: await fetch('/api/save-skills', { method: 'POST', body: JSON.stringify(skillList) });
  };

  return (
    <div className="w-1/3">
      <h2 className="text-xl font-bold">Skills</h2>
      <ul>
        {skillList.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      {isEditable && (
        <div>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add new skill"
          />
          <button onClick={handleAddSkill}>Add</button>
          <button onClick={handleSaveSkills}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Skills;
