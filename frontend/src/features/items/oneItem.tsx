import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteItem, fetchItems, fetchOneItem } from './itemsThunks';
import {
  selectFetchOneItemLoading,
  selectItemsDeleteLoading,
  selectOneItem,
} from './itemsSlice';
import { selectUser } from '../users/usersSlice';
import { CardMedia, CircularProgress, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { apiURL } from '../../constants';

const OneItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const oneItem = useAppSelector(selectOneItem);
  const oneItemFetchLoading = useAppSelector(selectFetchOneItemLoading);
  const deleteLoading = useAppSelector(selectItemsDeleteLoading);

  const { id } = useParams() as { id: string };

  let cardImage = '';

  if (oneItem?.image) {
    cardImage = apiURL + '/' + oneItem.image;
  }

  const onDeleteItem = async () => {
    if (id) {
      await dispatch(deleteItem(id));
      await dispatch(fetchItems(''));
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(fetchOneItem(id));
  }, [dispatch, id]);
  return (
    <>
      {oneItemFetchLoading ? (
        <CircularProgress />
      ) : (
        oneItem && (
          <Grid container>
            <Grid item xs={4} sx={{ maxWidth: '500px', marginRight: '20px' }}>
              <Box sx={{ maxWidth: '400px' }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={cardImage}
                  alt={oneItem.title}
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Grid container>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bolder',
                    fontSize: '40px',
                    marginRight: '20px',
                  }}
                >
                  {oneItem.title}
                </Typography>
                {user?._id === oneItem.seller._id ? (
                  <LoadingButton
                    variant="contained"
                    disabled={deleteLoading}
                    loading={deleteLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    sx={{ mt: 1, backgroundColor: 'red' }}
                    onClick={onDeleteItem}
                  >
                    Delete
                  </LoadingButton>
                ) : (
                  ''
                )}
              </Grid>
              <Typography component="p" sx={{ fontSize: '20px' }}>
                {oneItem.description}
              </Typography>
              <Typography variant="h6">Price: {oneItem.price}</Typography>
              <Typography variant="h6">
                Category: {oneItem.category.category}
              </Typography>
              <Typography component="p">
                Seller name: {oneItem.seller.displayName}
              </Typography>
              <Typography component="p">
                Seller phone: {oneItem.seller.phone}
              </Typography>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default OneItem;
