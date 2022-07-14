export const AttributeListing = ({ attributeDetails }) => {
  return (
    <>
    <div className="listing">
      <h4>{attributeDetails.key}</h4>
      <p>Data Type: {attributeDetails.attrType}</p>
    </div>
    </>
  )
}