import { motion } from "framer-motion";

const QuestionsCount = ({questionsCount, incrementQuestionsCount, decrementQuestionsCount}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className=""
      >
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl font-extrabold mb-8 text-center drop-shadow-lg mt-8"
        >
          No of Questions
        </motion.h3>
        <div className="flex items-center gap-4 mt-2">
          <button className="w-12 h-12 bg-white/20 text-white text-2xl rounded-full flex items-center justify-center hover:bg-white/30 transition cursor-pointer" onClick={decrementQuestionsCount}>
            –
          </button>

          <p className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-white drop-shadow-lg">
            {questionsCount}
          </p>

          <button className="w-12 h-12 bg-white/20 text-white text-2xl rounded-full flex items-center justify-center hover:bg-white/30 transition cursor-pointer" onClick={incrementQuestionsCount}>
            +
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default QuestionsCount;
