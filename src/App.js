import React, { Fragment, useState, useEffect } from 'react';
import Form from './components/Form';
import Quote from './components/Quote';
function App() {

  //Quotes in localstorage

  let quotesInit = JSON.parse(localStorage.getItem('quotes'));
  if (!quotesInit) {
    quotesInit = [];
  }

  //Array quotes
  const [quotes, saveQuotes] = useState(quotesInit);

  //Use Effect change state
  useEffect(() => {
    if (quotesInit) {
      localStorage.setItem('quotes', JSON.stringify(quotes))
    } else {
      localStorage.setItem('quotes', JSON.stringify([]))
    }
  }, [quotes, quotesInit]);

  // Function take quotes 
  const createQuote = quote => {
    saveQuotes([
      ...quotes,
      quote
    ])
  }

  const deleteQuote = id => {
    const newQuote = quotes.filter(quote => quote.id !== id);
    saveQuotes(newQuote);
  }

  const title = quotes.length === 0 ? 'No quote' : 'Manage your quote';


  return (
    <Fragment>
      <h1>Patient manager</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form
              createQuote={createQuote}
            />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {quotes.map(quote => (
              <Quote
                key={quote.id}
                quote={quote}
                deleteQuote={deleteQuote}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
