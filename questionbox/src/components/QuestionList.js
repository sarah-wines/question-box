import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionForm } from './QuestionForm';
import { Link } from 'react-router-dom';
import { Question } from './Question';

export const QuestionList = ({ token, username }) => {
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (token || submitted) {
      axios
        .get(
          `https://questionbox-team-skywalker.herokuapp.com/api/questions/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${token}`,
            },
          }
        )
        .then((res) => setQuestions(res.data));
          setSubmitted(false)

    } else {
      axios
        .get(`https://questionbox-team-skywalker.herokuapp.com/api/questions/`)
        .then((res) => setQuestions(res.data));
    }
  }, [token, submitted]);
  const handleSubmit=() => {
    axios.get(
      `https://questionbox-team-skywalker.herokuapp.com/api/questions/?search=${search}` 

    )
    .then((res) => setQuestions(res.data))
  }


  return (
    <>
      <div className="questions">
        <input 
          type='text'
          placeholder='search questions by title'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="button">
          <button className="uk-button" onClick={handleSubmit}>Search</button>
        </div>
        <div className="questionTitleCont">
          <h1 className="questionTitle">Seeds of Knowledge</h1>
        </div>
        {questions &&
          questions.map((question, index) => {
            return (
              <Question
                question={question}
                username={username}
                token={token}
                setSubmitted={setSubmitted}
            />
                );
          })}
          {token && <QuestionForm token={token} setSubmitted={setSubmitted} />}
      </div>
    </>
  );
};
