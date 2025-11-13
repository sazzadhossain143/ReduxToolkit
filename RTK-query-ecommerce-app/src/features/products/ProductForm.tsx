import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useAddProductMutation, useUpdateProductMutation } from "../../services/productsApi";


export default function ProductForm({ productToEdit, onCancel }: any) {

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: ''
  });

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
    else {
      setProduct({
        name: '',
        description: '',
        price: 0,
        category: ''
      });
    }
  }, [productToEdit]);

  // const dispatch = useDispatch<any>();

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
    console.log(name, value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitted product:", { ...product, id: nanoid() });
    //dispatch add product action
    if (productToEdit) {
      // Update existing product logic can go here
      try {
        await updateProduct({product: product, id: productToEdit.id});
      } catch (error) {
        console.log("Failed to add product: ", error);
      }
      onCancel();
    } else {
      // Add new product logic
      try {
        await addProduct({...product, id: nanoid()});
      } catch (error) {
        console.log("Failed to add product: ", error);
      }
    }
    //reset form
    setProduct({
      name: '',
      description: '',
      price: 0,
      category: ''
    });
  }

  return (
    <form onSubmit={handleSubmit} >
      <h2>Product Form</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={product.name} onChange={handlechange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={product.description} onChange={handlechange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={product.price} onChange={handlechange} />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={product.category} onChange={handlechange} />
      </div>

      <button type="submit">{productToEdit ? "Update product" : "Add product"}</button>
      {productToEdit && <button type="button" onClick={onCancel} >Cancel</button>}
    </form>
  )
}
