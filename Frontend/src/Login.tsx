function Login() {
    return (
        <div className="min-vh-100 bg-dark text-white d-flex align-items-center py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">

                        {/* Logo + Heading */}
                        <div className="text-center mb-4">

                            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                                <span className="fs-1 text-primary">
                                    ◈
                                </span>

                                <span className="fs-2 fw-bold text-white">
                                    Intervexa
                                </span>
                            </div>

                            <h1 className="fw-bold text-white mb-2">
                                Welcome Back
                            </h1>

                            <p className="text-light fs-5 mb-0">
                                Sign in to continue your AI interview journey
                            </p>

                        </div>


                        {/* Login Card */}
                        <div className="card bg-dark border border-secondary shadow-lg">

                            {/* text-start added here */}
                            <div className="card-body p-4 p-md-5 text-start">

                                <form>

                                    {/* Email */}
                                    <div className="mb-4">

                                        <label
                                            htmlFor="email"
                                            className="form-label text-white fw-semibold"
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
                                    <div className="mb-3">

                                        <div className="d-flex justify-content-between align-items-center">

                                            <label
                                                htmlFor="password"
                                                className="form-label text-white fw-semibold mb-2"
                                            >
                                                Password
                                            </label>

                                            <a
                                                href="#"
                                                className="text-primary text-decoration-none small mb-2"
                                            >
                                                Forgot Password?
                                            </a>

                                        </div>

                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control form-control-lg bg-dark text-white border-secondary"
                                            placeholder="Enter your password"
                                        />

                                    </div>


                                    {/* Remember Me */}
                                    <div className="form-check mb-4">

                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="remember"
                                        />

                                        <label
                                            htmlFor="remember"
                                            className="form-check-label text-light"
                                        >
                                            Remember me
                                        </label>

                                    </div>


                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 mb-3 fw-semibold"
                                    >
                                        Login
                                    </button>

                                </form>

                            </div>

                        </div>


                        {/* Sign Up */}
                        <p className="text-center text-light mt-4">

                            Don't have an account?{" "}

                            <a
                                href="/signup"
                                className="text-primary text-decoration-none fw-semibold"
                            >
                                Create Account
                            </a>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;