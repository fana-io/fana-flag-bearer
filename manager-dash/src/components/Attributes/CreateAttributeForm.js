import { useState } from "react"
import { attrTypeOptions } from "../../lib/formConstants"

export const CreateAttributeForm = () => {
  const [name, setName] = useState('')
  const [attrType, setAttrType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

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
              return <option key={option.value} value={option.value}>{option.text}</option>
            })
            }
          </select>
        </label>
        <input type="submit" value="submit" disabled/>
      </form>
    </div>
  )
  
}