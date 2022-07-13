export const AttributeListing = ({ attributeDetails }) => {
  return (
    <>
    <div className="listing">
      <h3>{attributeDetails.name}</h3>
      <p>Data Type: {attributeDetails.type}</p>
    </div>
    </>
  )
}