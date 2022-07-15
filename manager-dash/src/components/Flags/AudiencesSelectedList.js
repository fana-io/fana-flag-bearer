export const AudiencesSelectedList = ({
  audiencesSelected,
  removeAudience,
  audiences,
}) => {
  // audiencesSelected is array of audience._ids
  const audienceDetails = audiencesSelected.map((selectedId) => {
    return audiences.find((a) => selectedId === a._id);
  });

  // send Condition id back to parent to remove from state
  const handleRemoveAudience = (e) => {
    e.preventDefault();
    removeAudience(e.target.getAttribute('data-id'));
  };
  return (
    <>
      {audienceDetails.length ? (
        <ul>
          {audienceDetails.map((audience) => (
            <li key={audience._id}>
              {audience.displayName}
              <button
                type="button"
                onClick={handleRemoveAudience}
                data-id={audience._id}
              >
                Remove Condition
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No audiences created yet.</p>
      )}
    </>
  );
};
