import { attributes } from '../lib/data';
import { AttributeListing } from './AttributeListing';

export const AttributesList = () => {
  return (
    <div className="list">
      {attributes.map(attribute => {
        return (<AttributeListing key={attribute.name} attributeDetails={attribute} />)
      })}
    </div>
  )
}