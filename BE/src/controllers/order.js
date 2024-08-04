import Order from '../models/Order.js';


// Lấy tất cả đơn hàng của người dùng
export const getOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId })
      .populate('user', 'userName')
      .populate('products.product', 'title thumbnail price');
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'userName')
      .populate('products.product', 'title thumbnail price');
    if (!order) {
      return res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
    }

    if (order.orderStatus === 'Đã giao hàng') {
      return res.status(400).json({ message: 'Đơn hàng đã giao không thể cập nhật trạng thái nữa' });
    }

    if (order.orderStatus === 'Đã gửi hàng' && orderStatus !== 'Đã giao hàng') {
      return res.status(400).json({ message: 'Đơn hàng đã gửi hàng, chỉ có thể cập nhật trạng thái thành "Đã giao hàng"' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
