import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="mt-24">
      <footer className="border-2 text-black w-full h-[450px] rounded-[100px] space-y-[140px] ">
        <div className="">
          <div className="flex justify-center space-x-[600px] pt-12">
            <div className="flex space-x-[70px]">
              <div className="font-semibold text-[15px] space-y-10">
                <div>
                  <Link to={''} className="hover:text-[#858585]">Hệ thống cửa hàng</Link >
                </div>
                <div>
                  <Link to={''} className="hover:text-[#858585]">Bộ sưu tập</Link >
                </div>
                <div>
                  <Link to={''} className="hover:text-[#858585]">Tin tức thị trường</Link >
                </div>
              </div>
              <div className="">
                <div className="text-[15px] font-semibold">
                  <Link to={''} className="hover:text-[#858585]">Hỗ trợ khách hàng</Link >
                </div>
                <div className="text-[13px] text-[#858585] space-y-6 pt-6">
                  <div>
                    <Link to={''} className="hover:text-gray-300">Vận chuyển</Link>
                  </div>
                  <div>
                    <Link to={''} className="hover:text-gray-300">Trả lại hàng</Link>
                  </div>
                  <div>
                    <Link to={''} className="hover:text-gray-300">Quy trình thanh toán</Link>
                  </div>
                  <div>
                    <Link to={''} className="hover:text-gray-300">Liên hệ chúng tôi</Link>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-[15px] font-semibold">
                  <Link to={''} className="hover:text-[#858585]">Giới thiệu về VNG</Link >
                </div>
                <div className="text-[13px] text-[#858585] space-y-6 pt-6">
                <div>
                  <Link to={''} className="hover:text-gray-300">Triết lý kinh doanh</Link>
                </div>
                <div>
                  <Link to={''} className="hover:text-gray-300">Tổ chức - sự kiện</Link>
                </div>
                <div>
                  <Link to={''} className="hover:text-gray-300">Nhà đầu tư</Link>
                </div>
                <div>
                  <Link to={''} className="hover:text-gray-300">Lịch sử phát triển</Link>
                </div>
                </div>
              </div>
            </div>
            <div className="flex text-black space-x-6 text-[15px]">
              <div className="border-black border h-[27px] w-[28px] rounded-full flex items-center justify-center">
                <i className="fa-brands fa-twitter"></i>
              </div>
              <div className="border-black border h-[27px] w-[28px] rounded-full flex items-center justify-center">
                <i className="fa-brands fa-facebook"></i>
              </div>
              <div className="border-black border h-[27px] w-[28px] rounded-full flex items-center justify-center">
                <i className="fa-brands fa-youtube"></i>
              </div>
              <div className="border-black border h-[27px] w-[28px] rounded-full flex items-center justify-center">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>

          </div>


        </div>
        <div className="flex justify-center space-x-[500px] ">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-location-dot"></i>
            <div  className="text-[16px] font-semibold">VietNam</div >
            <p className="text-[13px] text-[#858585] pl-5">© 2024 VNG, Inc. Mọi quyền được bảo lưu</p>
          </div>
          <div className=" flex text-[13px] text-[#858585] space-x-[50px] ">
            <div>
              <Link to={''} className="hover:text-gray-300">Điều khoản bán hàng</Link>
            </div>
            <div>
              <Link to={''} className="hover:text-gray-300">Điều khoản sử dụng</Link>
            </div>
            <div>
              <Link to={''} className="hover:text-gray-300">Quyền riêng tư</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer