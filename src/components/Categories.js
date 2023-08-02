import React from 'react'
import { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';

export default function Catagories(props) {
  //to set the article received from api
  const [article, setArticle] = useState([])
  //for disabling the get more button
  const [totalResult, setTotalResult] = useState(0)
  //to increment the page count
  const [page, setPage] = useState(1)
  //to use spinner
  const [load, setLoad] = useState({
    spin: false,
    changeCatagory: false
  })
  useEffect(() => {
    async function fetchapi() {
      //spinner on
      setLoad({ spin: false, changeCatagory: true });
      //api declare
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=`//add api key
      //fetch the data from api
      let data = await fetch(url);
      //jsonify
      let parseData = await data.json();
      //set the article
      setArticle(parseData.articles);
      setTotalResult(parseData.totalResults);
      //spinner off
      setLoad({ spin: false, changeCatagory: false })
      //increment the page
      setPage(page + 1);
    }
    fetchapi()
  }, [props.category, props.loggedin]);

  const addArticle = () => {
    async function fetchapi1() {
      setLoad({ spin: true, changeCatagory: false });
      {/* 03e886219fc94e27a2d336fa7320bece */ }
      {/* e3e21440777145f293a0d36ae2970932 */ }
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=03e886219fc94e27a2d336fa7320bece&page=${page}&pageSize=18`
      let data = await fetch(url);
      let parseData = await data.json();
      setArticle(article.concat(parseData.articles));
      setLoad({ spin: false, changeCatagory: false })
      setPage(page + 1);

    }
    fetchapi1()
  }



  return (
    <div className="container-fluid">

      <div className="row overflow-auto px-4" style={{ height: "680px", width: '100%' }} >
        {load.changeCatagory === false ? article.map((element) => {
          return <div className="container px-4 py-2" style={{ overflow: "hidden" }}>
            <NewsItems key={element.url} title={element.title ? element.title.slice(0, 100) : ''} description={element.description ? element.description.slice(0, 170) : ""} image={element.urlToImage} url={element.url} author={element.author} time={element.publishedAt} loggedin={props.loggedin} />
          </div>
        }) : ''}
        <div>
          {/* Spinner during get more */}
          {load.spin === true ? <Spinner pdleft='100px' /> : ''}
          {/* Disabling get more button..... if change catagory.. show spinner */}
          {load.changeCatagory === false ? <button className='btn btn-primary' disabled={page > Math.ceil(totalResult / 18)} onClick={addArticle} style={{ width: '10%', marginLeft: '90%', marginBottom: '20px', boxShadow: '2px 2px 5px black' }}>Get More</button> : <Spinner pdleft='400px' />}
        </div>
      </div>

    </div>
  )
}

