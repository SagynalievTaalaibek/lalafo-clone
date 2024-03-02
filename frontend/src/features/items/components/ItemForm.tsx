import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCategory } from '../../categories/categoriesSlice';
import { selectItemsCreateLoading } from '../itemsSlice';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { ItemMutation } from '../../../types';

interface Props {
  onSubmit: (itemData: ItemMutation) => void;
}

const ItemForm: React.FC<Props> = ({ onSubmit }) => {
  const isLoading = useAppSelector(selectItemsCreateLoading);
  const categories = useAppSelector(selectCategory);
  const [state, setState] = useState<ItemMutation>({
    title: '',
    category: '',
    description: '',
    image: null,
    price: '',
  });

  const [imageValidation, setImageValidation] = useState(false);

  const onItemSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (state.image === null) {
      setImageValidation(true);
    } else {
      onSubmit(state);

      setState({
        title: '',
        category: '',
        description: '',
        image: null,
        price: '',
      });
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <>
      <form autoComplete="off" onSubmit={onItemSubmit}>
        <Grid container direction="column" spacing={2} sx={{ maxWidth: '60%' }}>
          <Grid item xs>
            <TextField
              label="Title"
              required
              id="title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Price"
              required
              id="price"
              type="number"
              name="price"
              value={state.price}
              onChange={inputChangeHandler}
              error={parseFloat(state.price) < 0}
              helperText={
                parseFloat(state.price) < 0 ? 'Price must be > 0' : ''
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              multiline
              rows={3}
              required
              label="Description"
              name="description"
              id="description"
              value={state.description}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                id="category"
                required
                labelId="categoryl"
                value={state.category}
                name="category"
                label="Category *"
                onChange={(e) => selectChangeHandler(e)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            {imageValidation ? 'Put image!!!!!' : ''}
            <FileInput
              label="Image"
              name="image"
              onChange={fileInputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading || parseFloat(state.price) < 0}
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{ mt: 1 }}
            >
              Create item
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ItemForm;
