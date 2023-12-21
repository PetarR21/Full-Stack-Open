import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (!notification) {
    return null;
  }

  return (
    <Alert variant={notification.type === 'success' ? 'success' : 'danger'}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
