import { useContext } from "react"
import { ProductContext, ProductContextType } from "../contexts/ProductContext"

const Cart = () => {
  const { state } = useContext(ProductContext) as ProductContextType
  return (
    <div>
      <div className="flex justify-center gap-6 mt-20">
        {state.products?.slice(0,1).map(p => (
          <div className="w-[600px] border-2 h-auto flex">
            <div key={p._id}>
              <img src={p.thumbnail} alt="" />
            </div>
            <div></div>


          </div>
        ))}
        <div className="w-[450px] h-[499px] border">
          <div className="h-[53px] bg-[#E2F4FF] text-[20px] text-center p-[10px] font-bold">Cart total</div>
          <div className="flex justify-center gap-[230px] pt-5 text-[19px]">
            <p>Subtotal</p>
            <p>$ 23,20</p>
          </div>
          <div className="flex mt-6 justify-center items-center w-[363px] ml-[45px] h-[54px] rounded-2xl gap-[110px] text-[19px] border-2">
            <p className="text-16px">Enter coupon code</p>
            <p className="text-14px text-[#003F62]">Apply</p>
          </div>
          <div className="flex mt-6 justify-center items-center w-[363px] ml-[45px] h-[54px] rounded-2xl gap-[210px] text-[19px] border-2">
            <p className="text-16px">County</p>
            <p className="text-14px text-[#003F62]"></p>
          </div>
          <div className="flex justify-center gap-[230px] pt-5 text-[16px]">
            <p>Subtotal</p>
            <p>$ 23,20</p>
          </div>
          <button
            type='submit'
            className='font-semibold bg-black hover:bg-[#727272] text-white  rounded-full w-[325px] h-[60px] transition-all duration-300 text-[17px] '
          >
            Thêm vào giỏ hàng<i className="pl-1 text-[17px] fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart