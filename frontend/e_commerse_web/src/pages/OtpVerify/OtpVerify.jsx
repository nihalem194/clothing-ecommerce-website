
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./OtpVerify.css";
import { verifyOtp } from "../../services/authService";

const OtpVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(
    location.state?.email || ""
  );
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !/^\d{6}$/.test(otp)) {
      setError("Please enter your email and a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOtp({
        email: email.trim(),
        otp,
      });

      setSuccess(
        response.data.message || "Email verified successfully!"
      );

      setTimeout(() => {
        navigate("/login", { state: { email } });
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-page container flex ">
      <div className="otp-container">
        <div className="otp-card">
          <div className="otp-icon">✉</div>

          <h2>Verify Your Email</h2>

          <p className="otp-description">
            Enter the 6-digit verification code sent to your email.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                6-Digit OTP
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="form-control otp-input"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                pattern="[0-9]{6}"
                title="Please enter exactly 6 digits"
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2" role="status">
                {success}
              </div>
            )}

            <button
              className="btn btn-dark w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <p className="otp-footer">
            Already verified? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
