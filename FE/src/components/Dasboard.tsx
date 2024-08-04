import { useContext } from 'react';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { CategoryContext, CategoryContextType } from '../contexts/CategoryContext';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

const Dashboard = () => {
  const { totalProducts } = useContext(ProductContext) as ProductContextType;
  const { totalCategories } = useContext(CategoryContext) as CategoryContextType;
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;

  return (
    <div className={`${!isCollapsed ? 'w-[1270px] ml-64' : 'w-[1350px] ml-24'} pt-20 flex justify-center gap-10 h-[auto]`}>
      <div className="shadow-md p-16 bg-gradient-to-r from-red-500 to-red-400 rounded-lg   transition-transform transform hover:scale-105">
        <div className="text-white flex items-center gap-3 text-xl font-semibold">
          Tổng số sản phẩm: <span className="block text-2xl">{totalProducts}</span>
        </div>
      </div>

      <div className="shadow-md p-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg transition-transform transform hover:scale-105">
        <div className="text-white flex items-center gap-3 text-xl font-semibold">
          Tổng số danh mục: <span className="block text-2xl">{totalCategories}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
