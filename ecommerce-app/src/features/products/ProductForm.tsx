import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProducts, updateProducts } from "./productSlice";


export default function ProductForm({ productToEdit, onCancel }: any) {

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: ''
  });

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

  const dispatch = useDispatch<any>();

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
    console.log(name, value);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted product:", { ...product, id: nanoid() });
    //dispatch add product action
    if (productToEdit) {
      // Update existing product logic can go here
      // dispatch(updateProducts(product));
      dispatch(updateProducts({product: product, id: productToEdit.id}));
      onCancel();
    } else {
      // Add new product logic
      dispatch(addProducts({
        ...product,
        id: nanoid(), // Simple unique id based on timestamp
      }));
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
