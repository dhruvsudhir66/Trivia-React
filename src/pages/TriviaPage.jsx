import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react";

const TriviaPage = () => {
  const location = useLocation();
  let { difficulty, count, category } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/play");
  };

  difficulty = difficulty.toLowerCase();

  const fetchQuestions = async () => {
    if (questions.length > 0) return;

    const url = `https://opentdb.com/api.php?amount=${count}&category=${category}&difficulty=${difficulty}&encode=url3986`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const questionsUpdated = results.map((item, index) => {
      const allAnswers = shuffleArray([
        decodeURIComponent(item.correct_answer),
        ...item.incorrect_answers.map((ans) => decodeURIComponent(ans)),
      ]);

      return {
        id: index + 1,
        question: decodeURIComponent(item.question),
        correctAnswer: decodeURIComponent(item.correct_answer),
        answers: allAnswers,
      };
    });

    setQuestions(questionsUpdated);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [questions, currentQuestionIndex]);

  const incrementCurrentIndex = (selectedAnswer) => {
    if (currentQuestion.correctAnswer === selectedAnswer) {
      setScore((score) => score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
    setQuizHistory((prevHistory) => {
      const newEntry = {
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        selectedAnswer: selectedAnswer,
      };
      return [...prevHistory, newEntry];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col items-center justify-center px-6 py-10">
      <AnimatePresence mode="wait">
        {showScore ? (
          <motion.div
            key="score"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 w-[700px] text-center p-10 rounded-lg text-white text-2xl font-bold shadow-xl flex flex-col items-center"
          >
            <div className="mb-6">
              🎉 Game Over! Your Score: {score} / {questions.length}
            </div>

            {quizHistory.map((history, index) => {
              const isCorrect =
                history.selectedAnswer === history.correctAnswer;

              return (
                <div key={index} className="mb-6">
                  <p className="text-[18px] text-white mb-2">
                    {index + 1}. {decodeURIComponent(history.question)}
                  </p>

                  <div className="flex gap-4 items-center justify-center">
                    <p
                      className={`p-2 min-w-[200px] rounded-lg text-white text-center text-[14px] ${
                        isCorrect ? "bg-green-500/70" : "bg-red-500/70"
                      }`}
                    >
                      Your Answer: {decodeURIComponent(history.selectedAnswer)}
                    </p>

                    {!isCorrect && (
                      <p className="p-2 min-w-[200px] rounded-lg bg-green-500/30 text-white text-center text-[14px]">
                        Correct Answer:{" "}
                        {decodeURIComponent(history.correctAnswer)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-green-400/80 hover:bg-green-500 text-white text-lg px-6 py-2 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer font-bold drop-shadow-lg"
              onClick={handleNavigate} // or navigate to home
            >
              <PlayCircle className="w-5 h-5" />
              New Game
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="bg-white/20 w-[700px] drop-shadow-2xl rounded-lg p-10"
          >
            <h1 className="text-white font-extrabold drop-shadow-lg text-xl mb-8 text-center">
              {currentQuestion.id}. {currentQuestion.question}
            </h1>
            <div className="grid grid-cols-2 gap-5">
              {currentQuestion?.answers?.map((item, idx) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/10 min-w-[200px] w-full flex items-center justify-center p-4 rounded-lg font-bold text-lg text-white shadow-2xl cursor-pointer hover:bg-pink-300/50"
                  key={idx}
                  onClick={() => incrementCurrentIndex(item)}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TriviaPage;
