import { z } from 'zod';

export const schemaProduct = z.object({
  title: z.string().min(6, { message: "Tên sản phẩm phải có ít nhất 6 ký tự!" }),
  price: z.number().min(0, { message: "Giá sản phẩm phải là số dương!" }),
  thumbnail: z.any().optional(),
  description: z.string().optional(),
  category: z.string().nonempty({ message: "Danh mục không được để trống!" }),
});


export const categorySchema = z.object({
  title: z.string().min(6, 'Tên danh mục phải có ít nhất 6 ký tự!'),
  description: z.string().optional(),

})

export const schemaUser = z.object({
  userName: z.string().min(3, { message: "Tên người dùng phải có ít nhất 3 ký tự!" }).optional(),
  email: z.string().email('Địa chỉ email không hợp lệ!'),
  password: z.string().min(6, 'Mật khẩu tối thiểu phải 6 kí tự!')
})
