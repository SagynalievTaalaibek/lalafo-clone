import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectCategory,
  selectCategoryItem,
} from '../../categories/categoriesSlice';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { CategoryI } from '../../../types';

const style = {
  my: 2,
  color: 'blue',
  display: 'block',
  textDecoration: 'underline',
  fontSize: '17px',
};

const MenuBar = () => {
  const dispatch = useAppDispatch();
  const categoryData = useAppSelector(selectCategory);
  const navigate = useNavigate();

  const onSelectItem = (category: CategoryI) => {
    dispatch(selectCategoryItem(category.category));
    navigate(`/${category._id}`);
  };

  return (
    <>
      <Box>
        <Button
          sx={style}
          onClick={() => onSelectItem({ _id: '', category: '' })}
        >
          All items
        </Button>
        {categoryData.map((page) => (
          <Button key={page._id} sx={style} onClick={() => onSelectItem(page)}>
            {page.category}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default MenuBar;
