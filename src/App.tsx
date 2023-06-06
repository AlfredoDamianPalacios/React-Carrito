import { useState } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [products, setProducts] = useState<
    { name: string; description: string; price: string }[]
  >([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setNewProduct({ name: "", description: "", price: "" });
    }
  };

  const handleRemoveProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += parseFloat(product.price);
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div className="app">
      <div className="form-section">
        <h2>Agregar Producto</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            onClick={handleAddProduct}
            disabled={!newProduct.name || !newProduct.price}
          >
            Agregar
          </button>
        </form>
      </div>

      <div className="products-section">
        <h2>Productos Agregados</h2>
        <div className="total-price">Precio Total: ${getTotalPrice()}</div>
        <div className="product-list">
          {products.map((product, index) => (
            <div className="product-item" key={index}>
              <div className="item-subcontent">
                <strong>{product.name}</strong>
                <br />
                {product.description}
                <br />$ {product.price}
              </div>
              <button type="button" onClick={() => handleRemoveProduct(index)}>
                Sacar del carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
