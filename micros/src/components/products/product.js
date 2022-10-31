import { useEffect } from "react";

import { useState } from "react";

const Product = () => {
  const [products, setProducts] = useState();
  const [content, setContent] = useState([{}]);

  useEffect(() => {
    async function fetcher() {
      console.log(process.env.REACT_APP_PRODUCTS_API);
      await fetch(process.env.REACT_APP_PRODUCTS_API)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        });
    }
    fetcher();
  }, []);

  useEffect(() => {
    // setContent(
    //   products.map((p) => {
    //     <h1>{p._id}</h1>;
    //   })
    // );
    pollute();
  });

  const pollute = () => {
    if (products !== undefined) {
      console.log(products);
      products.array.forEach((element) => {
        <h1>{element.name}</h1>;
      });
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {pollute}
    </div>
  );
};

export default Product;
