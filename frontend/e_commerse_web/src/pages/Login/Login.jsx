import { useState } from "react";
import { loginapi } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const hadlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror("");

    if (!formdata.email || !formdata.password) {
      seterror("All fields are required.");
    }

    try {
      const response = await loginapi(formdata);
      console.log("Login successful", response.data);

      const accessToken = response.data.access;

      {
        accessToken && sessionStorage.setItem("accessToken", accessToken);
      }

      setsuccess(true);
      navigate("/");
    } catch (error) {
      const errordata = error.response?.data;
      // console.log('loggin filed:',errordata)

      seterror(
        errordata?.detail ||
          "Login failed. Please check your email and password.",
      );
      console.log("error:", errordata);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="login-page w-[60%] h-[70vh]  flex  justify-center mx-auto ">
      <div className=" flex flex-col md:flex-row justify-center gap-6 w-100">
        {/* left side image */}
        <div className="image-content text-amber-50">
          <h1>FASCO</h1>
          <h2>Style Meets Your Lifestyle</h2>
          <p>Discover your style with FASCO.</p>
        </div>
        {/* Right side form */}

        <form className="login-form" onSubmit={hadlesubmit}>
          <h2>Welcome Back!</h2>
          <p className="login-subtitle">
            Please enter your details to sign in.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              className="form-control"
              name="Email"
              value={formdata.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setformdata({ ...formdata, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            {/* <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={formdata.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setformdata({ ...formdata, password: e.target.value })
              }
              required
            /> */}

            
            <div className="flex flex-row items-center justify-center">
              <input
              type={showpassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-control"
              value={formdata.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setformdata({ ...formdata, password: e.target.value })
              }
              required
            />
            <span >
          <button
            type="button"
            className="btn btn-outline-secondary h-[49px]"
            onClick={() => setShowpassword(!showpassword)}
            aria-label={showpassword ? "Hide password" : "Show password"}
          >
            <i className={showpassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </button>
          </span>
          </div>
          
        </div>
            
          

          {error && (
            <div className="alert alert-danger p-2" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success p-2" role="alert">
              {success}
            </div>
          )}

          <div className="text-end mb-4">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-submit-btn w-100" disabled={loading}>
            {loading ? "Login..." : "Login"}
          </button>

          <p className="register-text mt-4 text-center">
            Don't have an account? <a href="/register">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
