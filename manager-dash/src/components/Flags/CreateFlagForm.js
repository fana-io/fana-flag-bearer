import { useState } from 'react';
import { audiences } from '../../lib/data';

console.log(audiences);

export const CreateFlagForm = () => {
  const [displayName, setDisplayName] = useState('');
  const [status, setStatus] = useState(false);
  // const [audience, setAudience] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit to manager backend
  };
  const addAudienceDropDown = (e) => {
    e.preventDefault()
    // TODO: add another dropdown for audience
    // should take into account previously selected audiences
    console.log('clicked');
  }

  return (
    <div>
      <h3>Create a new flag</h3>
      <form onSubmit={null} className="form">
        <label>
          Flag Name
          <input
            name="name"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          Status
          <select type="radio">
            <option value="false">off</option>
            <option value="true">on</option>
          </select>
        </label>
        <h4>Add Audiences</h4>
        <AudienceDropdown />
        <div>

        <button onClick={ addAudienceDropDown }>Add Another Audience</button>
        </div>
        <input type="submit" value="Create Flag" disabled />
      </form>
    </div>
  );

  function AudienceDropdown() {
    const [audience, setAudience] = useState([]);
    return (
      <label>
        <select onChange={(e) => setAudience(audience.concat(e.target.value))}>
          {audiences.map((a) => (
            <option value={a._id}>{a.displayName}</option>
          ))}
        </select>
      </label>
    );
  }
};
