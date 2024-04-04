import { useState } from "react";
import "./App.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  observations: string;
}

interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
}

function App() {
  const products = [
    {
      id: 1,
      name: "Hamburguer",
      description: "Delicioso hamburguer de carne",
      price: 10,
      image: "https://via.placeholder.com/150",
      quantity: 0,
      observations: "",
    },
    {
      id: 2,
      name: "Pizza",
      description: "Pizza quentinha e saborosa",
      price: 20,
      image: "https://via.placeholder.com/150",
      quantity: 0,
      observations: "",
    },
    {
      id: 3,
      name: "Sushi",
      description: "Sushi fresquinho e bem preparado",
      price: 30,
      image: "https://via.placeholder.com/150",
      quantity: 0,
      observations: "",
    },
  ];
  const [cart, setCart] = useState<Product[]>([]);
  const [address, setAddress] = useState<Address>({
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
  });
  const [deliveryOption, setDeliveryOption] = useState<string>("delivery"); // 'delivery' or 'pickup'
  const [showCartPopup, setShowCartPopup] = useState<boolean>(false);
  const [showProductPopup, setShowProductPopup] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const addToCart = () => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (item: Product) => item.id === selectedProduct!.id
    );
    if (index !== -1) {
      updatedCart[index].quantity += selectedQuantity;
      updatedCart[index].observations = selectedProduct!.observations;
    } else {
      updatedCart.push({ ...selectedProduct!, quantity: selectedQuantity });
    }
    setCart(updatedCart);
    setSelectedQuantity(1); // Reset selected quantity to 1 after adding to cart
    setShowProductPopup(false); // Close product popup after adding to cart
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleDeliveryOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeliveryOption(e.target.value);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total: number, item: Product) => total + item.price * item.quantity,
      0
    );
  };

  const sendWhatsAppMessage = () => {
    const message = `
    Olá! 
    Gostaria de encomendar os seguintes produtos: 
    ${cart
      .map(
        (product: Product) =>
          `${product.name} (quantidade : ${product.quantity}) - Observações: ${product.observations}`
      )
      .join(", ")}.
    ${
      deliveryOption === "delivery"
        ? `Meu endereço é: ${address.street}, ${address.number}, ${address.neighborhood}, CEP: ${address.cep}.`
        : "Vou retirar o pedido no local."
    }
    Opção de entrega: ${deliveryOption}.
    Valor total do pedido: R$ ${calculateTotal().toFixed(2)}.
  `;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511987361695?text=${encodedMessage}`);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item: Product) => item.id !== productId);
    setCart(updatedCart);
  };

  const openProductPopup = (product: Product) => {
    setSelectedProduct(product);
    setShowProductPopup(true);
  };

  const closeProductPopup = () => {
    setShowProductPopup(false);
  };

  const openCartPopup = () => {
    setShowCartPopup(true);
  };

  const closeCartPopup = () => {
    setShowCartPopup(false);
  };

  return (
    <div className="App">
      <div className="header-container">
        <img
          className="logo-imagem"
          src="https://storage.googleapis.com/udois-261822.appspot.com/imagens-templates/thumbnail_08200720220325623da567de0a0.webp"
          alt=""
        />
        <h1>Lista de Produtos</h1>
        <button className="button-minicart-open" onClick={openCartPopup}>
          <img
            className="button-minicart-icon"
            src="https://cdn-icons-png.flaticon.com/512/57/57451.png"
            alt=""
          />
        </button>
      </div>
      <div className="product-list">
        {products.map((product: Product) => (
          <div key={product.id} className="product-card">
            <img
              onClick={() => openProductPopup(product)}
              src={product.image}
              alt={product.name}
            />
            <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
            <button onClick={() => openProductPopup(product)}>
              Ver Detalhes
            </button>
            </div>
          </div>
        ))}
      </div>

      {showProductPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="header-popup-product">
              <button className="button-close" onClick={closeProductPopup}>
                X
              </button>
            </div>
            <img src={selectedProduct!.image} alt="" />
            <h2>{selectedProduct!.name}</h2>
            <p>{selectedProduct!.description}</p>
            <p>Preço: R$ {selectedProduct!.price.toFixed(2)}</p>
            <label htmlFor="quantity">Quantidade:</label>
            <input
              type="number"
              id="quantity"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
            />
            <label htmlFor="observations">Observações:</label>
            <textarea
              id="observations"
              value={selectedProduct!.observations}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct!,
                  observations: e.target.value,
                })
              }
            ></textarea>
            <button onClick={addToCart}>Adicionar ao Carrinho</button>
          </div>
        </div>
      )}

      {showCartPopup && (
        <div className="popup">
          <div className="popup-content-minicart">
            <div className="header-minicart">
              <h2>Carrinho de Compras</h2>
              <button className="button-close" onClick={closeCartPopup}>
                X
              </button>
            </div>
            <ul className="product-list-minicart">
              {cart.map((item: Product) => (
                <div key={item.id} className="product-item-minicart">
                  <img
                    className="product-item-imagen-minicart"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="product-infos-minicart">
                    <span>{item.name}</span>
                    <span>quantidade: {item.quantity}</span>
                    <span>Observações: {item.observations}</span>
                  </div>
                  <img
                    onClick={() => removeFromCart(item.id)}
                    className="icon-trasher"
                    src="https://cdn-icons-png.flaticon.com/512/126/126468.png"
                    alt=""
                  />
                </div>
              ))}
            </ul>
            <div className="minicart-delivery-select">
              <label htmlFor="deliveryOption">Opção de Entrega:</label>
              <select
                id="deliveryOption"
                value={deliveryOption}
                onChange={handleDeliveryOptionChange}
              >
                <option value="delivery">Entrega</option>
                <option value="pickup">Retirada</option>
              </select>
            </div>
            {deliveryOption === "delivery" && (
              <div className="formulario-address-container">
                <label htmlFor="cep">CEP:</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={address.cep}
                  onChange={handleAddressChange}
                />
                <label htmlFor="street">Rua:</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                />
                <label htmlFor="number">Número:</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={address.number}
                  onChange={handleAddressChange}
                />
                <label htmlFor="neighborhood">Bairro:</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  value={address.neighborhood}
                  onChange={handleAddressChange}
                />
              </div>
            )}
            {deliveryOption === "pickup" && (
              <div className="pickup-address-container">
                <span>
                  <b>Endereço: </b>R. Cel. Nogueira Padilha, 1500 - Vila
                  Hortência, Sorocaba - SP, 18020-002
                </span>
              </div>
            )}
            <div>
              <p>Valor Total do Pedido: R$ {calculateTotal().toFixed(2)}</p>
            </div>
            <div className="container-button-finish">
              <button className="button-buy" onClick={sendWhatsAppMessage}>
                Enviar Pedido via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
