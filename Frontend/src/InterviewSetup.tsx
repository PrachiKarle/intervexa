import { useNavigate } from "react-router-dom";

function InterviewSetup() {
    const nav = useNavigate();
    return (
        <div className="min-vh-100 bg-dark text-white py-5">

            <div className="container">

                {/* Header */}
                <div className="text-center mb-5">

                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                        <span className="fs-1 text-primary">
                            ◈
                        </span>

                        <span className="fs-2 fw-bold">
                            Intervexa
                        </span>
                    </div>

                    <h1 className="fw-bold">
                        Configure Your Interview
                    </h1>

                    <p className="text-light fs-5">
                        Customize your interview before you begin
                    </p>

                </div>


                <div className="row justify-content-center">

                    <div className="col-12 col-md-10 col-lg-8">

                        <div className="card bg-dark border border-secondary shadow-lg">

                            <div className="card-body p-4 p-md-5 text-start">

                                {/* Role */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="role"
                                        className="form-label text-white fw-semibold"
                                    >
                                        Select Job Role
                                    </label>

                                    <select
                                        id="role"
                                        className="form-select form-select-lg bg-dark text-white border-secondary"
                                    >
                                        <option>React Developer</option>
                                        <option>Frontend Developer</option>
                                        <option>Full Stack Developer</option>
                                        <option>Backend Developer</option>
                                        <option>Python Developer</option>
                                        <option>Software Engineer</option>
                                    </select>

                                </div>


                                {/* Experience */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="experience"
                                        className="form-label text-white fw-semibold"
                                    >
                                        Experience Level
                                    </label>

                                    <select
                                        id="experience"
                                        className="form-select form-select-lg bg-dark text-white border-secondary"
                                    >
                                        <option>Fresher</option>
                                        <option>0 - 1 Year</option>
                                        <option>1 - 3 Years</option>
                                        <option>3 - 5 Years</option>
                                        <option>5+ Years</option>
                                    </select>

                                </div>


                                {/* Difficulty */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="difficulty"
                                        className="form-label text-white fw-semibold"
                                    >
                                        Difficulty
                                    </label>

                                    <select
                                        id="difficulty"
                                        className="form-select form-select-lg bg-dark text-white border-secondary"
                                    >
                                        <option>Easy</option>
                                        <option>Intermediate</option>
                                        <option>Hard</option>
                                    </select>

                                </div>





                                {/* Resume */}
                                {/* <div className="form-check mb-4">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="resume"
                                    />

                                    <label
                                        className="form-check-label text-light"
                                        htmlFor="resume"
                                    >
                                        Use my resume for personalized questions
                                    </label>

                                </div> */}


                                {/* Start Button */}
                                <button
                                    type="button" onClick={() => nav("/start")}
                                    className="btn btn-primary btn-lg w-100 fw-semibold"
                                >
                                    Start AI Interview
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default InterviewSetup;