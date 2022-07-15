import { useState } from 'react';

export const AddAudienceForm = ({ addAudience, audiences }) => {
  const defaultOption = audiences.length ? audiences[0]._id : '' 
  const [audienceDropdown, setAudienceDropdown] = useState(defaultOption);

  const handleAudienceSelect = (e) => {
    setAudienceDropdown(e.target.value)
  }

  const handleAddAudience = (e) => {
    e.preventDefault()
    addAudience(audienceDropdown)

  }
  
  return (
    <div>
      <label>
        <select onChange={ handleAudienceSelect}>
          {audiences.map((a) => (
            <option value={a._id} key={a._id}>{a.displayName}</option>
          ))}
        </select>
      </label>
      <button onClick={handleAddAudience}>Add Audience</button>
    </div>
  );
};
