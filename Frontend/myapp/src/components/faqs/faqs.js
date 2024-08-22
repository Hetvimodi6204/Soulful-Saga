import React, { useState } from 'react';
import { questions } from "./api.js";
import "./faqs.css";
import Myfaqs from "./myfaqs.js";

const Faqs = () => {
    const [data, setData] = useState(questions);

    // Split the FAQ data into two columns
    const leftColumn = data.filter((_, index) => index % 2 === 0); // Even-indexed items
    const rightColumn = data.filter((_, index) => index % 2 !== 0); // Odd-indexed items

    return (
      <>
          <h1 className="faqs">FAQs</h1>
      <section className="main-div">
            <div className="column">
                {leftColumn.map((curElem) => (
                    <Myfaqs key={curElem.id} {...curElem} />
                ))}
            </div>
            <div className="column">
                {rightColumn.map((curElem) => (
                    <Myfaqs key={curElem.id} {...curElem} />
                ))}
            </div>
        </section>
        </>
    );
}

export default Faqs;
