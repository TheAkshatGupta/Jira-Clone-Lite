import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      
      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h1 className="text-4xl font-bold mb-4">JIRA Clone Lite 🚀</h1>
        <p className="max-w-xl mb-6">
          A full-stack task management application where you can create tasks,
          track progress, and manage your workflow efficiently.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black px-5 py-2 rounded"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border px-5 py-2 rounded"
          >
            Register
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-4">
        <p>
          Created by{" "}
          <a
            href="https://github.com/TheAkshatGupta"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-200"
          >
            Akshat Gupta
          </a>
        </p>
      </div>

    </div>
  );
}

export default Home;