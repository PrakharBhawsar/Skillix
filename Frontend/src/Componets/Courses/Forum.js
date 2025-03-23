import React, { useState } from 'react';

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleAskQuestion = () => {
    console.log('Asked Question:', currentQuestion);
    const newQuestion = { question: currentQuestion, replies: [] };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
  };

  const handleReply = (index) => {
    console.log('Replied:', replyText);
    const updatedQuestions = [...questions];
    updatedQuestions[index].replies.push(replyText);
    setQuestions(updatedQuestions);
    setReplyText('');
  };

  return (
    <>
    <div className="p-4 bg-gray-900 text-white mb-6 border mt-6 rounded-lg" style={{width:'60%'}}>
      <div className=" p-6 rounded-lg shadow-md mb-4 bg-gray-900 text-white" >
        <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
        <textarea
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Type your question here..."
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          style={{color:'#000'}}
        ></textarea>
        <button
          className="mt-4 text-white py-2 px-4 rounded-md"
          onClick={handleAskQuestion}
          style={{
            background: '#9135db',
            transition: 'background 0.3s', // Adding a transition for smooth effect
          }}
          onMouseEnter={(e) => e.target.style.background = '#ad75da'} // Change color on hover
          onMouseLeave={(e) => e.target.style.background = '#9135db'}
          >
          Ask Question
        </button>
      </div>

      {questions.map((q, index) => (
        <div key={index} className="bg-grey-700 p-6 mt-5 border rounded-lg shadow-md mb-4 w-full">
          <h2 className="text-2xl font-semibold mb-4">Question</h2>
          <p>{q.question}</p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Replies</h3>
            {q.replies.map((reply, replyIndex) => (
              <div key={replyIndex} className="mb-2">
                {reply}
              </div>
            ))}
            <textarea
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{color:'#000'}}
            ></textarea>
            <button
              className="mt-4 text-white py-2 px-4 rounded-md"
              onClick={() => handleReply(index)}
              style={{
                background: '#9135db',
                transition: 'background 0.3s', // Adding a transition for smooth effect
              }}
              onMouseEnter={(e) => e.target.style.background = '#ad75da'} // Change color on hover
              onMouseLeave={(e) => e.target.style.background = '#9135db'}
                >
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Forum;
