import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Product_type } from '../App';
import './Product.css';

type Tproduct = {
  product: Product_type,
  cart: Product_type[],
  setCart: (cart: any) => void,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const Product: React.FC<Tproduct> = ({ product, setCart, cart }: Tproduct) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isSelected: boolean = cart.some((p: Product_type) => p.title === product.title);

  function handleAddToCart() {
    if (!isSelected) {
      setCart((prev: Product_type[]) => [...prev, { ...product, count: 1 }])
    }
  }

  return (
    <div className="product_item">
      <p>{product.brand}</p>
      <h3>{product.title}</h3>
      {isSelected ?
        <div className="selected">Added</div>
        :
        <button onClick={handleAddToCart} className='add_btn'>Add to cart</button>}
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.price} $</h3>
      <button onClick={handleOpen}>Description</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, height: 'auto' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3>{product.title}</h3>
          </Typography>
          <Typography id="modal-modal-description"
            sx={{ mt: 2, whiteSpace: "initial", height: "auto", textOverflow: "initial" }}>
            {product.description}
          </Typography>
        </Box>

      </Modal>
    </div>
  );
};

export default Product;