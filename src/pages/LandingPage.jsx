import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/play");
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white text-5xl font-extrabold mb-6 drop-shadow-lg"
        >
          Welcome to TriviaMania!
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white text-lg mb-8 drop-shadow-sm"
        >
          Challenge your brain with fun and exciting trivia questions across all
          categories. Are you ready to play?
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
          className="flex justify-center" // ✅ Added this
        >
          <button onClick={handleClick} className="bg-yellow-400 hover:bg-yellow-300 text-black text-lg px-8 py-4 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer">
            <PlayCircle className="w-6 h-6" /> Play Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}
