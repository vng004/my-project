import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getList = async (req, res, next) => {
  try {
    const { keyword = '', _page = 1, _limit = 10, _sort = 'createdAt', _order = 'asc' } = req.query;

    // Xây dựng truy vấn dựa trên từ khóa
    const query = keyword ? { title: { $regex: keyword, $options: 'i' } } : {};

    const options = {
      page: parseInt(_page),
      limit: parseInt(_limit),
      sort: { [_sort]: _order === 'asc' ? 1 : -1 },
      populate: {
        path: 'category',
        select: 'title',
      },
    };

    // Sử dụng phương thức paginate của mongoose
    const data = await Product.paginate(query, options);

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách sản phẩm thành công!',
      data,
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error); // In lỗi ra console
    res.status(500).json({
      success: false,
      message: 'Lấy danh sách sản phẩm thất bại!',
      error: error.message,
    });
  }
};

// export const getProductsByCategory = async (req, res, next) => {
//   try {
//     const categoryId = req.params.id;
//     const data = await Product.find({ category: categoryId }).populate(
//       "category",
//       "title"
//     );
//     if (data) {
//       res.status(200).json({
//         success: true,
//         message: "Lấy danh sách sản phẩm theo danh mục thành công!",
//         data,
//       });
//     }
//   } catch (error) {
//     next({
//       status: 500,
//       success: false,
//       message: "Lấy danh sách sản phẩm theo danh mục thất bại!",
//       error: error.message,
//     });
//   }
// };


export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate(
      "category",
      "title"
    );

    if (data) {
      res.status(200).json({
        success: true,
        message: "Lấy sản phẩm thành công!",
        data,
      });
    }
  } catch (error) {
    next({
      status: 500,
      success: false,
      message: "Sản phẩm không tồn tại!",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    const categoryToUpdate = await Category.findByIdAndUpdate(
      req.body.category,
      {
        $push: { products: data._id },
      },
      { new: true }
    );
    if (data && categoryToUpdate) {
      res.status(201).json({
        success: true,
        message: "Thêm mới sản phẩm thành công!",
        data,
      });
    }
  } catch (error) {
    next({
      status: 500,
      success: false,
      message: "Thêm mới sản phẩm thất bại",
      error: error.message,
    });
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data) {
      res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công!",
        data,
      });
    }
  } catch (error) {
    next({
      status: 500,
      success: false,
      message: "Cập nhật sản phẩm thất bại!",
      error: error.message,
    });
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);

    if (data) {
      res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công!",
      });
    }
  } catch (error) {
    next({
      status: 500,
      success: false,
      message: "Xóa sản phẩm thất bại!",
      error: error.message,
    });
  }
};