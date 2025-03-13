

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const staticCredentials = {
//     email: "admin@example.com",
//     password: "admin123",
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       formData.email === staticCredentials.email &&
//       formData.password === staticCredentials.password
//     ) {
//       setMessage("Login successful!");
//       setTimeout(() => {
//         navigate("/dashboard"); // Redirect to Dashboard
//       }, 1000);
//     } else {
//       setMessage("Invalid email or password.");
//     }
//   };
  

//   return (
//     <div className="d-flex vh-100 align-items-center justify-content-center">
//       <div className="container">
//         <div className="row d-flex justify-content-center align-items-center">
//           <div className="col-md-8">
//             <div style={{ height: "70vh" }} className="card shadow-lg overflow-hidden">
//               <div className="row g-0">
//                 {/* Left Section */}
//                 <div
//                   style={{ height: "70vh" }}
//                   className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white bg-danger p-4"
//                 >
//                   <h1 className="fw-bold">Destiny</h1>
//                   <p className="mt-3 fs-5">Let's Kick Now!</p>
//                   <p className="opacity-75 text-center">
//                     It's easy and takes less than 30 seconds.
//                   </p>
//                 </div>

//                 {/* Right Section - Login Form */}
//                 <div className="col-md-6 align-items-center justify-content-center d-flex flex-column p-4">
//                   <h2 className="text-center fw-semibold">Login</h2>
//                   {message && <p className="text-center text-danger">{message}</p>}
//                   <form className="mt-3" onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                       <label className="form-label">Email</label>
//                       <input
//                         type="email"
//                         name="email"
//                         className="form-control"
//                         placeholder="Enter your email"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Password</label>
//                       <input
//                         type="password"
//                         name="password"
//                         className="form-control"
//                         placeholder="Enter your password"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <button type="submit" className="btn btn-danger w-100">
//                       Get Started
//                     </button>
//                   </form>
//                   <p className="mt-3 text-center">
//                     Don't have an account?{" "}
//                     <span
//                       className="text-danger text-decoration-none"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => navigate("/signup")}
//                     >
//                       Sign up
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const staticCredentials = {
    email: "admin@example.com",
    password: "admin123",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === staticCredentials.email &&
      formData.password === staticCredentials.password
    ) {
      setMessage("Login successful!");
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to Dashboard
      }, 1000);
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div style={{ height: "70vh" }} className="card shadow-lg overflow-hidden">
              <div className="row g-0">
                {/* Left Section */}
                <div
                  style={{ height: "70vh", backgroundColor: "#FF6B45" }} // Updated color
                  className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white p-4"
                >
                  <h1 className="fw-bold">PREPACDEMY</h1>
                  <p className="mt-3 fs-5">Let's Kick Now!</p>
                  <p className="opacity-75 text-center">
                    It's easy and takes less than 30 seconds.
                  </p>
                </div>

                {/* Right Section - Login Form */}
                <div className="col-md-6 align-items-center justify-content-center d-flex flex-column p-4">
                  <h2 className="text-center fw-semibold">Login</h2>
                  {message && <p className="text-center text-danger">{message}</p>}
                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn text-white w-100" style={{ backgroundColor: "#FF6B45" }}>
                      Get Started
                    </button>
                  </form>
                  <p className="mt-3 text-center">
                    Don't have an account?{" "}
                    <span
                      className="text-decoration-none"
                      style={{ cursor: "pointer", color: "#FF6B45" }}
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
