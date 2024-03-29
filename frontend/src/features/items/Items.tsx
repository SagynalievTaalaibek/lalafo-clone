import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategory } from '../categories/categoriesThunks';
import { fetchItems } from './itemsThunks';
import { selectItems, selectItemsFetchLoading } from './itemsSlice';
import { selectMenuCategory } from '../categories/categoriesSlice';
import MenuBar from './components/MenuBar';
import ItemCard from './components/ItemCard';
import { CircularProgress, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const selectCategory = useAppSelector(selectMenuCategory);
  const fetchItemLoading = useAppSelector(selectItemsFetchLoading);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (id) {
      dispatch(fetchItems(id));
    } else {
      dispatch(fetchItems(''));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <MenuBar />
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bolder', mt: 2, mb: 2 }}
            component="div"
          >
            {selectCategory ? selectCategory : 'All Items'}
          </Typography>
          <Grid container spacing={2}>
            {fetchItemLoading ? (
              <CircularProgress />
            ) : items.length > 0 ? (
              items.map((value) => (
                <ItemCard
                  key={value._id}
                  id={value._id}
                  title={value.title}
                  price={value.price}
                  image={value.image}
                />
              ))
            ) : (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bolder',
                  mt: 2,
                  marginLeft: '30px',
                  color: 'red',
                }}
                component="div"
              >
                No Items!!!
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Items;
