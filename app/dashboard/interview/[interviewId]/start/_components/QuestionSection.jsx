// import React from 'react'

import { Lightbulb, Volume2 } from "lucide-react";

// const QuestionSection = ({questions, activeQuestionIndex}) => {
//   return questions&& (
//     <div className='p-5 border rounded-b-lg'>
//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
//         {questions&&questions.map((question, index) => (
//           <div key={index} className='mb-4'>
//             <h2 className={`p-2 rounded-full text-sm text-center cursor-pointer transition-all duration-200
//             ${
//              activeQuestionIndex === index
//               ? 'bg-blue-600 text-black'
//              : 'bg-secondary hover:bg-secondary/80'
//             }`}>Question{index + 1}: {question.questionText}</h2>    
//           </div>
//         ))}
//       </div>
//       <h2>{questions[activeQuestionIndex]?.questionText}</h2>
//     </div>
//   )
// }

// export default QuestionSection



const QuestionSection = ({ questions, activeQuestionIndex }) => {


  const textToSpeach = (text) => {
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  }
    // console.log("Questions in QuestionSection:", questions);
    // console.log("ACTIVE QUESTION OBJECT:", questions[activeQuestionIndex]);
  if (!questions) return null;

  return (
    <div className="p-1 rounded-b-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {questions&&questions.map((question, index) => (
            <h2
              className={`p-2 rounded-full text-sm text-center cursor-pointer transition-all
                ${
                  activeQuestionIndex === index
                    ? "bg-blue-950 text-white"
                    : "bg-secondary text-foreground"
                }`}
            >
              Question {index + 1}
            </h2>
        ))}
      </div>
        <h2 className="my-5 text-sm md:text-lg">{questions[activeQuestionIndex]?.question}</h2>
        <Volume2 className="cursor-pointer" onClick={()=>textToSpeach(questions[activeQuestionIndex]?.question)} />
        <div className="bg-amber-200 border rounded-lg p-5  mt-20">
            <h2 className="flex gap-2 items-center text-primary">
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className="text-sm  text-primary my-2">Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.</h2>
        </div>
       </div>
  );
};
export default QuestionSection
