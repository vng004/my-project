import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Auth from '../models/Auth.js';

export const Register = async (req, res, next) => {
    try {
        const { email, password , userName} = req.body;

        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã tồn tại!',
            });
        }

        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);

        const data = {
            email: email,
            password: hash,
            userName: userName
        };
        const user = await Auth.create(data);

        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Đăng ký tài khoản thành công!',
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next({
            status: 500,
            message: 'Đăng ký tài khoản thất bại!',
            error: error.message,
        });
    }
};
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({ email });

        const match = await bcrypt.compare(password, user.password)

        if (match) {
            const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '100d' });

            res.status(200).json({
                success: true,
                message: 'Đăng nhập tài khoản thành công!',
                token,
                user: {
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                },
            });
        }
        res.status(400).json({
            success: false,
            message: 'Email không tồn tại!',
        });
    } catch (error) {
        next({
            status: 500,
            message: 'Đăng nhập tài khoản thất bại!',
            error: error.message,
        });
    }
};
