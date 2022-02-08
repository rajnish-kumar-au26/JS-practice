import { useState, useEffect } from 'react';
import axios from 'axios';
import ProdcuctCard from './productCard';
// import Pagination from './Pagination';
import ReactPaginate from 'react-paginate';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token && !isLoaded) {
      fetchProducts();
    }
  }, [isLoaded]);

  const fetchProducts = async (offset = 1) => {
    const data = offset + 1;
    const product = await axios
      .get('http://localhost:4000/product/list/10/' + data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res)
      .catch((error) => error.response);

    if (!product?.data?.error) {
      setProducts(product.data.data);
      setIsLoaded(true);
      setMessage(product.data.message);
    }
  };

  const generateTableBody = (data) => {
    return data.map((elem, index) => {
      return (
        // <tr key={index}>
        //   <th scope="row">{index + 1}</th>
        //   <td>{elem.name}</td>
        //   <td>{elem.image}</td>
        //   <td>{elem.description}</td>
        //   <td>{elem.price}</td>
        //   <td>{elem.date}</td>
        // </tr>

        <ProdcuctCard
          key={index}
          id={index + 1}
          name={elem.name}
          image={elem.image}
          description={elem.description}
          price={elem.price}
        />
      );
    });
  };

  return (
    <div>
      <section id="main" class=" main section pagetitle">
        {products?.rows?.length && generateTableBody(products.rows)}
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={products?.count ? products.count : 20}
          // pageRangeDisplayed={6}
          onPageChange={(e) => fetchProducts(e.selected)}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-item'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-item'}
          activeClassName={'active'}
        />
      </section>
    </div>
  );
};

export { ProductList };
