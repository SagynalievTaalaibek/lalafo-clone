import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { apiURL } from '../../../constants';

interface Props {
  id: string;
  title: string;
  price: string;
  image: string;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '61%',
});

const ItemCard: React.FC<Props> = ({ id, title, image, price }) => {
  const navigate = useNavigate();
  let cardImage = apiURL + '/' + image;

  return (
    <>
      <Grid item sm md={6} onClick={() => navigate(`/items/${id}`)}>
        <Card sx={{ height: '100%' }}>
          <ImageCardMedia
            image={cardImage}
            title={title}
            sx={{ maxWidth: '440px' }}
          />
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h5">Price: {price}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ItemCard;
