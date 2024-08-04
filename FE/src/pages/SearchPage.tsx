import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';

const SearchPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword') || '';
  const { formatPrice } = useContext(ProductContext) as ProductContextType

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/search`, {
          params: { keyword }
        });
        setProducts(response.data.data.docs);
      } catch (error) {
        console.log(error)
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className='pt-40  flex justify-center pl-[65px] pr-[65px]'>
      <div className=' h-auto min-h-[450px]'>
        <p className='text-[20px] pb-5'>Kết quả tìm kiếm cho: "{keyword}"</p>
        <div className="grid grid-cols-4 gap-10 pt-5 h-[500px] ">
          {products.map((product) => (
            <div key={product._id} className="product-container relative">
              <div className="">
                <Link to={`/product-detail/${product._id}`}>
                  <img
                    src={product.thumbnail}
                    className="product-image w-[360px]"
                    alt={product.title}
                  />
                </Link>
              </div>

              <div className="product-details  text-[17px] font-medium">
                <div>{product.title}</div>
                <div className="text-[14px]">
                  <div className="font-normal text-gray-600">{product.category.title}</div>
                  <div>{formatPrice(product.price)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
