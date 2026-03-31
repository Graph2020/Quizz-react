import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Quizz() {
  const { showQuestions, setShowQuestions } = useContext(AppContext);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
        );
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setQuestions(data.results);
        console.log("Fetched data:", data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, [showQuestions]);

  useEffect(() => {}, [showQuestions]);
  return <div>Quizz</div>;
}
