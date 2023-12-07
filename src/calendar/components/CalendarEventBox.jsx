import PropTypes from "prop-types";

export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <p>- {user.name}</p>
    </>
  );
};

CalendarEventBox.propTypes = {
  event: PropTypes.object,
  title: PropTypes.string,
  user: PropTypes.object,
};
