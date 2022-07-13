import { useState } from "react"

export const CreateAttributeForm = () => {
  const [name, setName] = useState('')
  const [attrType, setAttrType] = useState('')

  console.log('name: ', name);
  console.log('attribute type', attrType);

  // TODO: import dynamic list of attribute types from manager
  const attrTypeOptions = [
    {value: "", text:"Select a type"}, 
    {value: "BOOL", text:"Boolean"}, 
    {value: "STR", text: "String"}, 
    {value: "NUM", text: "Number"}, 
    {value: "DATETIME", text: "Date/Timestamp"}
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: submit attribute to manager backend

  }

  return (
    <div>
      <h3>Create a new attribute</h3>
      <form onSubmit={null} className="form">
        <label>
          Attribute Name
        <input
          name="name"
          type="text"
          onChange={ (e) => setName(e.target.value) }
        />
        </label>
        <label>
          Attribute Type
          <select
            onChange={ (e) => setAttrType(e.target.value) }
          >
            { attrTypeOptions.map(option => {
              return <option value={option.value}>{option.text}</option>
            })
            }
          </select>
        </label>
        <input type="submit" value="submit" disabled/>
      </form>
    </div>
  )
  
}