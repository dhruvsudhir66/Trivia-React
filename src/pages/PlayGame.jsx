import { AnimatePresence, motion } from "framer-motion";
import QuestionsCount from "../components/QuestionsCount";
import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlayGame = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [questionsCount, setQuestionsCount] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoriesList, setCatgoriesList] = useState([]);
  const [selectedCatgory, setSelectedCatgory] = useState(9);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/trivia", {
      state: {
        difficulty: selectedDifficulty,
        count: questionsCount,
        category: selectedCatgory,
      },
    });
  };

  const fetchCategoriesList = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCatgoriesList(data.trivia_categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const incrementQuestionsCount = () => {
    if (questionsCount < 30) {
      setQuestionsCount((count) => count + 5);
    }
  };

  const decrementQuestionsCount = () => {
    if (questionsCount > 10) {
      setQuestionsCount((count) => count - 5);
    }
  };

  const handleChoosing = (categoryId) => {
    setSelectedCatgory(categoryId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.5,
          }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col items-center justify-center px-6 py-10">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-white text-4xl md:text-5xl font-bold mb-10 drop-shadow-lg text-center"
      >
        Choose how you want to play!
      </motion.h1>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-white text-2xl font-extrabold mb-8 text-center drop-shadow-lg"
      >
        Difficulty
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-center gap-6"
      >
        {["Easy", "Medium", "Hard"].map((level) => {
          const isSelected = selectedDifficulty === level;
          const getBgColor = () => {
            if (!isSelected) return "bg-white/20";
            if (level === "Easy") return "bg-pink-400";
            if (level === "Medium") return "bg-pink-500";
            if (level === "Hard") return "bg-pink-600";
          };

          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-xl min-w-[140px] cursor-pointer drop-shadow-lg ${getBgColor()}`}
            >
              {level}
            </motion.button>
          );
        })}
      </motion.div>

      <QuestionsCount
        questionsCount={questionsCount}
        incrementQuestionsCount={incrementQuestionsCount}
        decrementQuestionsCount={decrementQuestionsCount}
      />

      <div className="flex flex-col items-center justify-center">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl font-extrabold mb-6 text-center drop-shadow-lg mt-6"
        >
          Choose Category
        </motion.h3>

        <motion.div
          className="grid grid-cols-6 gap-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {categoriesList.map((item) => {
            const isSelected = selectedCatgory === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleChoosing(item.id)}
                className={`p-1 m-1 flex items-center justify-center rounded-lg max-w-[200px] h-[60px] w-full text-white font-bold text-center cursor-pointer drop-shadow-lg ${
                  isSelected ? "bg-pink-400/80" : "bg-white/30"
                }`}
              >
                {item.name}
              </div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-500/80 text-white text-lg px-8 py-4 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer font-bold drop-shadow-lg"
          onClick={handleNavigate}
        >
          <PlayCircle className="w-6 h-6" /> Start Game
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PlayGame;
