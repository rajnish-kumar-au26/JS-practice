import { useState, useEffect } from 'react';
import axios from 'axios';
const Product = ({ token }) => {
  const [products, setProducts] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token && !isLoaded) {
      fetchProducts();
    }
  }, [isLoaded]);

  const fetchProducts = async () => {
    const product = await axios
      .get('http://localhost:4000/product/list/10/1', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res)
      .catch((error) => error.response);

    if (!product?.data?.error) {
      console.log(product.data);
      setProducts(product.data.data);
      setIsLoaded(true);
      setMessage(product.data.message);
    }
  };

  const generateTableBody = (data) => {
    return data.map((elem, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{elem.name}</td>
          <td>{elem.image}</td>
          <td>{elem.description}</td>
          <td>{elem.price}</td>
          <td>{elem.date}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2>Products</h2>
      <h4>{message}</h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">image</th>
            <th scope="col">description</th>
            <th scope="col">price</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
          {products?.rows?.length && generateTableBody(products.rows)}
        </tbody>
      </table>
    </div>
  );
};

export { Product };
