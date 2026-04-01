import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import shuffle from "shuffle-array";
import clsx from "clsx";
interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffled_answers: string[];
}
interface SelectedAnswer {
  [question: string]: string;
}

export default function Quizz() {
  const { showQuestions } = useContext(AppContext);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer>({});
  const isAllSelected =
    Object.keys(selectedAnswers).length === questions.length;
  const answerValues = Object.values(selectedAnswers);

  const howManyIsRight = questions.filter(
    (question, index) => question.correct_answer === answerValues[index],
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
        );
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();

        const questionsWithAnswers = data.results.map((q: any) => ({
          ...q,
          shuffled_answers: shuffle([...q.incorrect_answers, q.correct_answer]),
        }));

        setQuestions(questionsWithAnswers);
        console.log("Fetched data:", questionsWithAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, [showQuestions]);

  const displayQuestions = questions.map((question) => {
    return (
      <div
        className="flex w-full flex-col items-start gap-4 border-b border-[#D6DBF5] pb-4"
        key={question.question}
      >
        <h2
          className="text-primary text-xl font-bold"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
        <div className="flex flex-wrap gap-4">
          {question.shuffled_answers.map((answer: string, index: number) => {
            const isSelected = selectedAnswers[question.question] === answer;
            const isCorrect =
              isAllSelected && answer === question.correct_answer;
            const isWrong =
              isAllSelected && isSelected && answer !== question.correct_answer;
            return (
              <button
                onClick={() => {
                  // Optional: Prevent changing answers after everything is selected
                  if (isAllSelected) return;

                  setSelectedAnswers({
                    ...selectedAnswers,
                    [question.question]: answer,
                  });
                }}
                key={index}
                className={clsx(
                  "text-primary rounded-full border border-[#4D5B9E] px-6 py-1 font-medium transition-colors",
                  !isAllSelected && "hover:bg-[#D6DBF5]",
                  !isAllSelected && isSelected && "bg-[#4D5B9E] text-white",
                  isCorrect && "border-green-500 bg-green-500 text-white",
                  isWrong && "border-red-500 bg-red-500 text-white",
                  isAllSelected && !isCorrect && !isWrong && "opacity-50",
                )}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-10 font-sans">
      {displayQuestions}
      {questions.length > 0 && isAllSelected && (
        <>
          <button className="main-btn self-center px-2">New game</button>
          <div>Correct answers: {howManyIsRight.length}</div>
        </>
      )}
    </section>
  );
}
