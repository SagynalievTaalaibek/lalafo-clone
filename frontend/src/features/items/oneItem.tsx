import { useParams } from 'react-router-dom';

const OneItem = () => {
  const { id } = useParams() as { id: string };

  return <div></div>;
};

export default OneItem;
