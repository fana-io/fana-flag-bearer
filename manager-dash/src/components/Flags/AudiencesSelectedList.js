export const AudiencesSelectedList = ({audiences, removeAudience }) => {
    // send Condition id back to parent to remove from state
    const handleRemoveAudience = (e) => {
      e.preventDefault();
      removeAudience(e.target.getAttribute('data-id'));
    };

  return (
    <>
    { audiences.length ? (
      <ul>
        {audiences.map((audience) => (
          <li>
            {audience}
            {/* <SelectedAudience audience={audience} key={audience.id} /> */}
            <button
              type="button"
              onClick={handleRemoveAudience}
              data-id={audience.id}
              >
              Remove Condition
            </button>
          </li>
        ))}
      </ul>
        )
        : <p>No audiences created yet.</p>
      }
      </>
  )
}