import React, { useEffect, useState } from 'react'

const PastInterviews = () => {

  const[pastInterviews, setPastInterviews] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("past interviews"));
    setPastInterviews(data);
  }, [])


  return (
    <div>
      <h2>Past Interviews</h2>

      {pastInterviews.length === 0 ? (
        <div>
          <p>No past interviews found</p>
        </div>
      ) : (
        pastInterviews.map((interview, index) => (
          <div key={index}>
              <h3>Interview {index + 1}</h3>
              {interview.map((item) => (
                <div key={item.questionNo}>
                  <h4>Question {item.questionNo}: {item.question}</h4>
                  <p>
                    <strong>Your Answer: </strong> {item.andswer}
                  </p>
                  <hr />
                </div>
              ))}
              <br /><br />
          </div>
        ))
      )}
    </div>
  )
}

export default PastInterviews