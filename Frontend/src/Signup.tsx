function Signup() {
  return (
    <div className="min-vh-100 bg-dark text-white d-flex align-items-center py-5">

      <div className="container">

        <div className="row justify-content-center">

          {/* Increased width */}
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">

            {/* Logo + Heading */}
            <div className="text-center mb-4">

              <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                <span className="fs-1 text-primary">◈</span>

                <span className="fs-2 fw-bold text-white">
                  Intervexa
                </span>
              </div>

              <h1 className="fw-bold text-white mb-2">
                Create Your Account
              </h1>

              <p className="text-light fs-5 mb-0">
                Start your personalized AI interview journey
              </p>

            </div>


            {/* Signup Card */}
            <div className="card bg-dark border border-secondary shadow-lg">

              <div className="card-body p-4 p-md-5 text-start">

                <form>

                  {/* Full Name */}
                  <div className="mb-4">

                    <label
                      htmlFor="name"
                      className="form-label text-white fw-semibold fs-6"
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      className="form-control form-control-lg bg-dark text-white border-secondary"
                      placeholder="Enter your full name"
                    />

                  </div>


                  {/* Email */}
                  <div className="mb-4">

                    <label
                      htmlFor="email"
                      className="form-label text-white fw-semibold fs-6"
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg bg-dark text-white border-secondary"
                      placeholder="Enter your email"
                    />

                  </div>


                  {/* Password */}
                  <div className="mb-4">

                    <label
                      htmlFor="password"
                      className="form-label text-white fw-semibold fs-6"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg bg-dark text-white border-secondary"
                      placeholder="Create a password"
                    />

                  </div>


                  {/* Confirm Password */}
                  <div className="mb-4">

                    <label
                      htmlFor="confirmPassword"
                      className="form-label text-white fw-semibold fs-6"
                    >
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control form-control-lg bg-dark text-white border-secondary"
                      placeholder="Confirm your password"
                    />

                  </div>


                  {/* Terms */}
                  <div className="form-check mb-4">

                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                    />

                    <label
                      htmlFor="terms"
                      className="form-check-label text-light"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-primary text-decoration-none"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-primary text-decoration-none"
                      >
                        Privacy Policy
                      </a>
                    </label>

                  </div>


                  {/* Create Account */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3 fw-semibold"
                  >
                    Create Account
                  </button>


                  {/* Divider */}
                  <div className="d-flex align-items-center my-4">

                    <hr className="flex-grow-1 border-secondary" />

                    <span className="px-3 text-light">
                      OR
                    </span>

                    <hr className="flex-grow-1 border-secondary" />

                  </div>


                  {/* Google */}
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg w-100"
                  >
                    Continue with Google
                  </button>

                </form>

              </div>

            </div>


            {/* Login */}
            <p className="text-center text-light fs-6 mt-4">

              Already have an account?{" "}

              <a
                href="/login"
                className="text-primary text-decoration-none fw-semibold"
              >
                Login
              </a>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;