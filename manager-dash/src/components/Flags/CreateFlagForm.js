import { useState } from 'react';
import { AddAudienceForm } from './AddAudienceForm';
import { AudiencesSelectedList } from './AudiencesSelectedList';
import { useDispatch } from 'react-redux';

/*
todo:
- validate: don't allow duplicate audiences
*/

export const CreateFlagForm = () => {
  const [displayName, setDisplayName] = useState('');
  const [status, setStatus] = useState(false);
  const [audiences, setAudiences] = useState([]);
  const dispatch = useDispatch()

  console.log('flag form audiences saved:', audiences);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit to manager backend
  };
  const addAudience = (audienceSelected) => {
    console.log('audience received', audienceSelected);
    setAudiences([...audiences, audienceSelected ])
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
        <h4>Audiences</h4>
          <AudiencesSelectedList audiences={audiences} />
        <h4>Add Audiences</h4>
        <AddAudienceForm addAudience={addAudience}/>
        <div>


        </div>
        <input type="submit" value="Create Flag" disabled />
      </form>
    </div>
  );
}