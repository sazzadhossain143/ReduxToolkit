
import { useDeleteProductMutation, useGetProductsQuery } from '../../services/productsApi';

export default function ProductView({ onHandleEdit }: any) {

  const {data: products , isLoading, error} = useGetProductsQuery<any>({});

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id:any) => {
    deleteProduct(id);
  }

  return (
    <div>
      <h2>Product View</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {!isLoading && !error && products.length > 0 && (
        <section className='products-container'>
          {products.map((product:any) => (
            <article key={product.id} className='product'>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={()=> handleDelete(product.id)} >delete</button>
              <button onClick={()=>onHandleEdit(product)} >update</button>

            </article>
          ))}
        </section>
      )}
    </div>
  )
}