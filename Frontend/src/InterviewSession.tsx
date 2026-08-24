import { useState } from "react";

interface Message {
    role: "ai" | "user";
    message: string;
    type?: "technical" | "behavioral";
}

function InterviewSession() {

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "ai",
            type: "technical",
            message:
                "Hi! Welcome to your Intervexa interview. Let's begin with a technical question. What is the difference between props and state in React?"
        }
    ]);

    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    const [questionNumber, setQuestionNumber] = useState(1);

    const totalQuestions = 15;


    const sendMessage = async () => {

        if (!input.trim() || loading) {
            return;
        }

        const userMessage = input.trim();

        // Add user's message
        setMessages((previous) => [
            ...previous,
            {
                role: "user",
                message: userMessage
            }
        ]);

        setInput("");

        setLoading(true);


        try {


            const response = await fetch(
                "http://localhost:8000/api/interview/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: userMessage,
                        question_number: questionNumber,
                        session_id: "intervexa-session"
                    })
                }
            );


            const data = await response.json();


            setMessages((previous) => [
                ...previous,
                {
                    role: "ai",
                    message: data.response,
                    type: data.type
                }
            ]);


            setQuestionNumber((previous) => previous + 1);

        } catch (error) {

            console.error(error);

            setMessages((previous) => [
                ...previous,
                {
                    role: "ai",
                    message:
                        "Sorry, I couldn't connect to the interview agent. Please try again."
                }
            ]);

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-vh-100 bg-dark text-white">

            {/* Header */}
            <nav className="navbar border-bottom border-secondary">
                <div className="container-fluid px-4">

                    <div className="d-flex align-items-center gap-2">

                        <span className="fs-3 text-primary">
                            ◈
                        </span>

                        <span className="fs-4 fw-bold">
                            Intervexa
                        </span>

                    </div>


                    <div className="d-flex align-items-center gap-3">

                        <span className="text-light">
                            Mixed Interview
                        </span>

                        <span className="badge bg-primary">
                            {questionNumber} / {totalQuestions}
                        </span>

                    </div>

                </div>
            </nav>


            {/* Progress */}
            <div className="container-fluid px-0">

                <div
                    className="progress rounded-0"
                    style={{ height: "4px" }}
                >

                    <div
                        className="progress-bar bg-primary"
                        style={{
                            width: `${(questionNumber / totalQuestions) * 100}%`
                        }}
                    />

                </div>

            </div>


            {/* Chat */}
            <div className="container py-4">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9 col-xl-8">

                        {/* Chat Messages */}
                        <div
                            className="mb-4"
                            style={{
                                minHeight: "65vh",
                                maxHeight: "65vh",
                                overflowY: "auto"
                            }}
                        >

                            {messages.map((message, index) => (

                                <div
                                    key={index}
                                    className={`d-flex mb-4 ${
                                        message.role === "user"
                                            ? "justify-content-end"
                                            : "justify-content-start"
                                    }`}
                                >

                                    <div
                                        className={
                                            message.role === "user"
                                                ? "bg-primary rounded-4 p-3"
                                                : "bg-secondary bg-opacity-25 border border-secondary rounded-4 p-3"
                                        }
                                        style={{ maxWidth: "75%" }}
                                    >

                                        {message.role === "ai" && (

                                            <div className="mb-2">

                                                <span className="fw-bold">
                                                    🤖 AI Interviewer
                                                </span>

                                                {message.type && (
                                                    <span className="badge bg-primary ms-2">
                                                        {message.type}
                                                    </span>
                                                )}

                                            </div>

                                        )}

                                        <div>
                                            {message.message}
                                        </div>

                                    </div>

                                </div>

                            ))}


                            {/* Loading */}
                            {loading && (

                                <div className="d-flex justify-content-start">

                                    <div className="bg-secondary bg-opacity-25 border border-secondary rounded-4 p-3">

                                        <span className="text-light">
                                            🤖 AI is thinking...
                                        </span>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* Input */}
                        <div className="card bg-dark border-secondary">

                            <div className="card-body p-3">

                                <div className="input-group">

                                    <textarea
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="Type your answer..."
                                        rows={2}
                                        value={input}
                                        disabled={loading}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {

                                            if (
                                                e.key === "Enter" &&
                                                !e.shiftKey
                                            ) {
                                                e.preventDefault();
                                                sendMessage();
                                            }

                                        }}
                                    />

                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={sendMessage}
                                        disabled={
                                            loading || !input.trim()
                                        }
                                    >
                                        Send ➤
                                    </button>

                                </div>

                                <small className="text-secondary">
                                    Press Enter to send • Shift + Enter for a new line
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default InterviewSession;