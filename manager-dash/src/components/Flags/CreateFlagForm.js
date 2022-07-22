import { useState } from 'react';
import apiClient from '../../lib/apiClient';
import { AddAudienceForm } from './AddAudienceForm';
import { AudiencesSelectedList } from './AudiencesSelectedList';

export const CreateFlagForm = ({audiences}) => {
  const [displayName, setDisplayName] = useState('');
  const [status, setStatus] = useState(false);
  const [audiencesSelected, setAudiencesSelected] = useState([]); // stores ids of selected audiences

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await apiClient.createFlag({
      displayName,
      // sdkKey: ? , where do i get this?
      status,
      audiences: audiencesSelected
    })
    // console.log('new flag created', data);
    // TODO: submit to manager backend
  };
  const addAudience = (audienceSelectedId) => {
    setAudiencesSelected([...audiencesSelected, audienceSelectedId ])
  }
  const removeAudience = (audienceId) => setAudiencesSelected(audiencesSelected.filter(id => id !== audienceId));

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
          <select type="radio" onChange={ (e) => setStatus(Boolean(e.target.value))}>
            <option value="false">off</option>
            <option value="true">on</option>
          </select>
        </label>
        <h4>Audiences</h4>
          <AudiencesSelectedList audiencesSelected={audiencesSelected} audiences={audiences} removeAudience={removeAudience}/>
        <h4>Add Audiences</h4>
        <AddAudienceForm addAudience={addAudience} audiences={audiences}/>
        <div>


        </div>
        <input type="submit" value="Create Flag" disabled />
      </form>
    </div>
  );
}