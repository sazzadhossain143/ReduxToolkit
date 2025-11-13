import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts, fetchProducts} from './productSlice';

export default function ProductView({ onHandleEdit }: any) {
  const {isloading, products, error } = useSelector((state:any) => state.productsR);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Product View</h2>
      {isloading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {!isloading && !error && products.length > 0 && (
        <section className='products-container'>
          {products.map((product:any) => (
            <article key={product.id} className='product'>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {/* <p>Price: ${product.price}</p> */}
              <button onClick={()=> dispatch(deleteProducts(product.id))} >delete</button>
              <button onClick={()=>onHandleEdit(product)} >update</button>

            </article>
          ))}
        </section>
      )}
    </div>
  )
}