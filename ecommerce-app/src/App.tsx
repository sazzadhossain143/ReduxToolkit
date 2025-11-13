import { useState } from "react";
import ProductForm from "./features/products/ProductForm"
import ProductView from "./features/products/ProductView"

function App() {
const [productToEdit, setproductToEdit] = useState(null);

  const handleEdit = (product:any) => {  
    console.log("Edit product in App component:", product);
    // Implement edit functionality here
    setproductToEdit(product);
  }

  const handleCancelEdit = () => {
    setproductToEdit(null);
  }

  return (
    <>
      <ProductForm productToEdit={productToEdit} onCancel={handleCancelEdit} />
      <ProductView onHandleEdit={handleEdit} />
    </>
  )
}

export default App
