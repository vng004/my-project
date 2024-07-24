import { useContext } from "react"
import { Link } from "react-router-dom"
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext"

const Categories = () => {
const {state, onRemove} = useContext(CategoryContext) as CategoryContextType 
  return (
    <div>
      <div className='w-[1080px] ml-[380px] border-t-8 border-r-2 border-l-2 border-b-8 h-[auto] flex justify-center   shadow-2xl rounded-[60px] mt-2'>
        <div className='w-[1000px] text-center  pt-[30px] '>
          <div
            className="flex justify-between items-center mb-10 px-6 py-7 rounded-lg bg-white border border-gray-500 text-[21px] shadow-xl">
            <h2 className="font-bold text-gray-700">QUẢN LÍ DANH MỤC</h2>

            <Link to="/admin/categories-add" className='border-2 border-gray-400 px-6 hover:text-black text-gray-400 hover:border-black'>
              <i className="fa-solid fa-plus   text-[22px]"></i>
            </Link>
          </div>
          <div className='pb-10 text-[19px] '>
            <table className="w-full  shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-lg leading-normal">
                  <th className="py-4 px-6 text-center border">STT</th>
                  <th className="py-4 px-6 text-center border">Tên danh mục</th>
                  <th className="py-4 px-6 text-center border">Mô tả</th>
                  <th className="py-4 px-6 text-center border">Thao tác</th>
                </tr>
              </thead>

              <tbody className="text-black text-[16px] font-light border-2">
                {state.categories?.map((c, index) => (
                  <tr className='hover:border-t-2 hover:border-b-2 transition' key={index}>
                    <td className='py-6 px-10 text-center whitespace-nowrap border-t border-b '>{index + 1}</td>
                    <td className='py-6 px-10 text-center whitespace-nowrap border-t border-b '>{c.title}</td>
                    <td className='py-6 px-10 text-center whitespace-nowrap border-t border-b '>{c.description}</td>
                    <td className='py-6 px-10 text-center whitespace-nowrap border-t border-b  space-x-3'>
                      <Link to={`/admin/categories-edit/${c._id}`} className='border px-2 py-1 rounded-xl border-gray-400 hover:text-black text-gray-500 hover:border-black'>
                        Sửa
                      </Link>
                      <button onClick={()=> onRemove(c._id!)}>
                        <i className="fa-regular fa-trash-can text-gray-400 hover:text-black text-[22px] "></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories