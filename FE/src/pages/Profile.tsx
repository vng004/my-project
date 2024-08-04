import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../interface/user";
import { Link } from "react-router-dom";

const Profile = () => {
  // const { user, getProfile, updateProfile , logout} = useAuth();
  // const [formData, setFormData] = useState<User | null>(null);

  // useEffect(() => {
  //   getProfile()
  // }, [])

  // useEffect(() => {
  //   if (user) {
  //     setFormData(user);
  //   }
  // }, [user]);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (formData) {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (formData) {
  //     updateProfile(formData);
  //   }
  // };
  // return (
  //   <div className="m-40 flex justify-center">
  //     <div>
  //       <h2>Profile</h2>
  //       <form onSubmit={handleSubmit}>
  //       <div>
  //           <label htmlFor="thumbnail"></label><input type="text" value={formData?.thumbnail}
  //             onChange={handleChange}/>
  //           <img src={formData?.thumbnail} alt="" className="w-20 h-20 rounded-full border" />
  //         </div>
  //         <div className="w-[500px]">
  //           <label htmlFor="username">Username:</label>
  //           <input
  //             type="text"
  //             id="username"
  //             name="username"
  //             value={formData?.userName}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="email">Email:</label>
  //           <input
  //             type="email"
  //             id="email"
  //             name="email"
  //             value={formData?.email}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <button type="submit">Update Profile</button>
  //       </form>
  //       <Link to={'/login'} onClick={()=> logout()} > Logout</Link>
  //     </div>
  //   </div>
  // )
}

export default Profile