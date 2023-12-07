import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { hasEventSelected, startDeletingEvent } = useCalendarStore();

  const handleDeleteEvent = () => {
    startDeletingEvent();
  };

  return (
    <>
      {hasEventSelected && (
        <button
          className="btn btn-danger fab-danger"
          onClick={handleDeleteEvent}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
    </>
  );
};
