import { useState } from 'react';
import { useSelector } from 'react-redux'

export const AddAudienceForm = ({ addAudience }) => {
  const audiences = useSelector(state => state.audiences)

  console.log('audiences', audiences);
  const [audience, setAudience] = useState(audiences);

  const handleAudienceSelect = (e) => {
    console.log('etarget', e.target.value);
    setAudience(audience.concat(e.target.value))
  }

  const handleAddAudience = (e) => {
    e.preventDefault()
    addAudience(audience)

  }
  
  return (
    <div>
      <label>
        <select onChange={ handleAudienceSelect}>
          {audiences.map((a) => (
            <option value={a._id}>{a.displayName}</option>
          ))}
        </select>
      </label>
      <button onClick={handleAddAudience}>Add Audience</button>
    </div>
  );
};
