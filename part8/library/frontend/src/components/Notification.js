const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return <p className='notification'>{notification}</p>;
};

export default Notification;
