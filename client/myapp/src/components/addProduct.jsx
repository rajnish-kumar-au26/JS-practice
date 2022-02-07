import { useState } from 'react';
import axios from 'axios';

function CreateProduct({ token }) {
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    const updatedProduct = { ...product, [name]: value };
    setProduct(updatedProduct);
  }

  const productHandler = async () => {
    const apiurl = 'http://localhost:4000/product/add';
    const apiRes = await axios
      .post(apiurl, product, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res)
      .catch((error) => error?.response);

    console.log(apiRes);

    // if (!apiRes.data.error) {
    //   SetRegister(true);
    // }

    setMessage(apiRes.data.message);
  };

  return (
    <div class="container mt-5">
      <h1 class="text-center mb-5">Add Products Below Here</h1>
      <h2>{message}</h2>
      <form>
        <input
          class="form-control"
          type="text"
          name="name"
          placeholder="product name"
          value={product.name}
          onChange={handleChange}
        />
        <br />
        <input
          class="form-control"
          type="text"
          name="description"
          placeholder="product description"
          value={product.description}
          onChange={handleChange}
        />
        <br />
        <input
          class="form-control"
          type="text"
          name="price"
          placeholder="product price"
          value={product.price}
          onChange={handleChange}
        />
        <br />
        <input
          class="form-control"
          type="text"
          name="image"
          placeholder="product image"
          value={product.image}
          onChange={handleChange}
        />
        <br />
        <button onClick={productHandler} type="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
