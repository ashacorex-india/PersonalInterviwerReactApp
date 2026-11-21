
import React, { useEffect, useState } from 'react'
import "../styles/MainForm.css";

const MainForm = ({ obj }) => {
  const GRQO_API_KEY = import.meta.env.GRQO_API_KEY;
  const [companyType, setCompanyType] = useState("");
  const [additionalSkills, setAdditionalSkills] = useState("");
  const [exp, setExp] = useState("");

  const [questions, setQuestions] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [interviewData, setInterviewdata] = useState([]);
  const [evaulation, setEvaulation] = useState("");

  const [loading, setLoading] = useState(false);

  const userDetails = {
    basicDetails: {
      name: obj?.basicDetails?.name,
      email: obj?.basicDetails?.email,
      skills: obj?.basicDetails.skills
    },
    collegeDetails: obj?.collegeDetails,
    educationDetails: obj?.educationDetails
  };

  const callGraqApi = async (prompt) => {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GRQO_API_KEY}`
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b",
            messages: [
              {
                role: "system",
                content: "You are an experienced technical interviewer"
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.7
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      return data.choices[0].message.content;

    } catch (error) {
      console.error("Groq API Error:", error);
    }
  };

  const startInterview = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `
      Candidate Details:-
      ${JSON.stringify(userDetails)}

      Additional Details:- 
      Company Type: ${companyType}
      Additional Skills: ${additionalSkills}
      Experiance: ${exp}

      Genarate exactly 10 technical interview questions
      Take a candidate name in between some questions.
      Candidate name: ${userDetails.basicDetails.name}
      Consider:
      1) Candidate education and skills
      2) Company type
      3) Candidate Experiance
      4) Practical coding knowledge
      5) Real time project scenarios
    
      Start from basic and increase difficulty
      return only json in below format
      {
        "questions": [
          {
              "questionNo": 1,
              "question": "Question here"
          }
        ]
      }

      `;

      const result = await callGraqApi(prompt);

      const parsedResult = JSON.parse(result);
      setQuestions(parsedResult.questions);
      setCurrentIndex(0);
      setInterviewdata([]);
      setCurrentAnswer("");
      setEvaulation("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleNextQuestion = async () => {
    const updateData = [
      ...interviewData,
      {
        questionNo: currentIndex + 1,
        question: questions[currentIndex].question,
        andswer: currentAnswer.trim()
      }
    ];

    setInterviewdata(updateData);
    setCurrentAnswer("");

    if(currentIndex === 9){
      const pastInterviews = JSON.parse(localStorage.getItem("past interviews") || "[]");
      pastInterviews.push(updateData);
      localStorage.setItem("past interviews", JSON.stringify(pastInterviews));
      await evaulateInterview(updateData);
    }else {
      setCurrentIndex(prev => prev + 1);
    }
  }

  const evaulateInterview = async (finalData) => {
    try {
      setLoading(true);

      const prompt = `
      You are a professional technical interviwer.

      Candidate Details:
      ${JSON.stringify(userDetails)}

      Additional Details:
      Company Type: ${companyType}
      Additional Skills: ${additionalSkills}
      Experiance: ${exp}

      Interview Questions and Candidate Answers:
      ${JSON.stringify(finalData)}

      Evaulate the candidate:

      Provide:
      1) Overall score out of 100
      2) Individual question wise feedback
      3) correct answer or missing concepts
      4) Technical strengts
      5) Area of improvements
      6) Final interview recommendation.

      Give a professional and constructive evaulation including candidate name.
      Candidate name: ${userDetails.basicDetails.name}
      `;

      const result = await callGraqApi(prompt);
      setEvaulation(result);
    }catch(err){
      console.log(err);
    }finally {
      setLoading(false);
    }
  }

  return (
    <div>

      {questions.length === 0 && (
        <form>
          <h2>Enter Additional Details</h2>

          <div>
            <input
              type="text"
              placeholder="Enter Additional Skills"
              value={additionalSkills}
              onChange={(e) => setAdditionalSkills(e.target.value)}
            />
          </div>

          <div>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            >
              <option value="">Select Company Type</option>
              <option value="MNC">MNC</option>
              <option value="Small Cap">Small Cap</option>
              <option value="Mid Cap">Mid Cap</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              placeholder="Enter your experience"
            />
          </div>

          <button type="button" onClick={startInterview}>Start Interview</button>
        </form>
      )}

      {loading && <h3>AI is processing...</h3>}

      {/* Interview Questions */}
      {questions.length > 0 && !evaulation && (
        <div className='interview-question'>
          <h2>AI Technical Interview</h2>
          <h3>Question {currentIndex + 1} / 10</h3>

          <h3>Question: {questions[currentIndex].question}</h3>

          <textarea rows="5" placeholder='Enter Your Answer...' value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)}></textarea>

          <button onClick={handleNextQuestion}>{currentIndex === 9 ? "Submit Interview" : "Next"}</button>
        </div>
      )}

      {evaulation && (
        <div className='evaulation'>
          <h2>Interview Completed</h2>
          <h3>AI Evaulation</h3>

          <pre>
            {evaulation}
          </pre>

          <h3>Interview question and answers</h3>
          {interviewData.map((item) => (
            <div key={item.questionNo} className='interview-data'>
              <h4>
                Q{item.questionNo}: {item.question}
              </h4>
              <p>Your Answer: {item.andswer}</p>
               <hr />
            </div>
           
          ))}
        </div>
      )}

      

    </div>
  );
};

export default MainForm;
