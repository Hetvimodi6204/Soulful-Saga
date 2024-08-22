import React, { useState } from 'react';

const Myfaqs = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="faq-item">
            <div className="main-heading" onClick={() => setShowAnswer(!showAnswer)}>
                <h3>{question}</h3>
            </div>
            {showAnswer && <div className="answers">{answer}</div>}
        </div>
    );
};

export default Myfaqs;
