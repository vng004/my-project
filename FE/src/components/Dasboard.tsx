import { useContext } from "react";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { OrderContext, OrderContextType } from "../contexts/OrderContext";

const Dashboard = () => {
  const { totalProducts } = useContext(ProductContext) as ProductContextType;
  const { totalCategories } = useContext(CategoryContext) as CategoryContextType;
  const { isCollapsed } = useContext(AuthContext) as AuthContextType
  const { totalOrder } = useContext(OrderContext) as OrderContextType


  return (
    <div className={`${!isCollapsed ? ' w-[1270px] ml-80' : 'w-[1350px] ml-44'}  pt-20 flex gap-10  h-[auto] `}>
      {/* <h1>Dashboard</h1> */}
      <div className="shadow-md p-20 bg-gradient-to-r from-red-500 to-red-400">
        Tổng số sản phẩm: {totalProducts}
      </div>

      <div className="shadow-md p-20 bg-gradient-to-r from-blue-500 to-blue-400">
        Tổng số danh mục: {totalCategories}
      </div>

      <div className="shadow-md p-20 bg-gradient-to-r from-green-500 to-green-400">
        Tổng số đơn hàng:{totalOrder}
      </div>

    </div>
  );
};

export default Dashboard;
