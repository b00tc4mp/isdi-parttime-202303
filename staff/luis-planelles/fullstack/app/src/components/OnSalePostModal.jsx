import { useEffect, useState } from 'react';
import removePostFromSale from '../logic/removePostFromSale';
import retrievePost from '../logic/retrievePost';
import sellPost from '../logic/sellPost';
import { context } from '../ui';

const OnSalePostModal = ({ postId, onCancel, onPostUpdated }) => {

  const [price, setPrice] = useState('');
  
  useEffect(() => { 
  try {
    retrievePost(context.userId, postId, (error, post) => {
      if (error) {
        alert(error.message)

        return
    }

    setPrice(post.price || '')
  });

  } catch (error) {
    alert(error.message);
  }
}, [onPostUpdated])

  const handlePriceChange = (event) => {
      const inputValue = event.target.value,
        newPrice = 
        ! inputValue || isNaN(inputValue) || inputValue < 1
        ? '' 
        : parseFloat(inputValue)
      
      setPrice(newPrice);
  },

  handleSaleUpdatePost = () => {
    try {
      sellPost(context.userId, postId, price, (error) => {
        if (error) {
          alert(error.message)
        }
        
        onPostUpdated();
      });

    } catch (error) {
      alert(error.message);
    }
  },

  handleRemoveSale = () => {
    try {
      removePostFromSale(context.userId, postId, (error) => {
        if (error) {
          alert(error.message)
        }
        
        onPostUpdated();
      });

    } catch (error) {
      alert(error.message);
    }
  },

  handleCancelSalePost = () => {
    onCancel();
  };

  return (
    <section className='edit-post container'>
      <div className='post-price'>
        <input className='input' type='number' value={price} onChange={handlePriceChange}/>
        <button className='button set-price' onClick={handleSaleUpdatePost}>
          set price
        </button>
        <button className='button remove-sale' onClick={handleRemoveSale} type='button'>
          remove sale
        </button>
        <button className='button cancel' onClick={handleCancelSalePost} type='button'>
          cancel
        </button>
      </div>
    </section>
  );
};

export default OnSalePostModal;