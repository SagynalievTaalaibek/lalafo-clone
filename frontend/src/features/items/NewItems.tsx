import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createItems } from './itemsThunks';
import { fetchCategory } from '../categories/categoriesThunks';
import Typography from '@mui/material/Typography';
import ItemForm from './components/ItemForm';
import { ItemMutation } from '../../types';

const NewItems = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const onSubmit = async (itemData: ItemMutation) => {
    await dispatch(createItems(itemData));
    navigate('/');
  };

  return (
    <>
      <Typography
        component="div"
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: '20px' }}
      >
        Create new Item
      </Typography>
      <ItemForm onSubmit={onSubmit} />
    </>
  );
};

export default NewItems;
