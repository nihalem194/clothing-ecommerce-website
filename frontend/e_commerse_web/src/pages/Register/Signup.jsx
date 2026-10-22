
import "./Signup.css";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { registerapi } from "../../services/authService";


function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName.trim()||
      !formData.email.trim()||
      !formData.password||
      !formData.confirm_password 
    ){
      setError(
        "All fields are required.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    

    // Frontend validation test only.
    try{
      const response= await registerapi(formData);
      console.log(response.data)
      navigate('/verify-OTP')
    
    }catch(error){
      const errorData=error.response?.data
      console.log('Registration filed:',errorData);

      setError(
        errorData?.email?.[0]|| errorData?.password?.[0] || errorData?.confirm_password?.[0] || errorData?.detail || 
        "Something went wrong."
      )
    }

    // Django API connect cheyyumbol ivide API request ayakkam.
    // console.log("Signup validation successful");
  };

  return (
    <div className="signup-page container p-0">
      <div className="row g-0">

        {/* Left side - Fashion image */}
        <div className="col-md-5 d-wrap d-md-flex signup-image">
          <Link to="/" className="signup-logo">
            FASCO
          </Link>

          <div className="signup-image-content mt-5">
            <h1>
              Style Meets
              <br />
              Your Lifestyle
            </h1>

            <p>
              Discover your style with FASCO.
              Enjoy new arrivals and a better
              shopping experience.
            </p>
          </div>
        </div>

        {/* Right side - Signup form */}
        <div className="col-12 col-md-7 signup-form-section">
          <div className="signup-top-link">
            <span>Already have an account?</span>{" "}
            <Link to="/login">Login</Link>
          </div>

          <div className="signup-form-container">
            <h2>Create Your Account</h2>

            <p className="signup-subtitle">
              Sign up to enjoy a better shopping experience.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Full name */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={
                        showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      }
                    ></i>
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div className="mb-3">
                <label
                  htmlFor="confirmPassword"
                  className="form-label"
                >
                  Confirm Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  name="confirm_password"
                  placeholder="Confirm your password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
