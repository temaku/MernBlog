import React from "react"
import {  useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import ArticleContent from "./article-content";

import NotFound from "./NotFound"


import Articles from "../components/article"
import CommentList  from "../components/CommentList";
import AddCommentForm from "../components/addCommentForm";

const Article = ()=>{
    const { name } = useParams();
    const article = ArticleContent.find((article)=>article.name === name);
    const [articleInfo,setArticleInfo] = useState({ comments:[] })
    
    useEffect(()=>{
      const fetchData = async ()=>{
        const result = await fetch(`/api/articles/${name}`)
        
        
        const body = await result.json();
        console.log(body);
        setArticleInfo(body)
      }
      fetchData();
    },[name])
    if(!article) return <NotFound/>
    const otherArticles = ArticleContent.filter((article)=>article.name !== name);
    return (
        <>
          <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
            {article.name}
          </h1>
          {article.content.map((paragraph,index)=>(
            <p className='mx-auto leading-relaxed text-base mb-4' key={index}>
            {paragraph}
          </p>

          ))}
           <CommentList comments={articleInfo.comments}/>
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
           <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>
        Other Articles
      </h1>
      <div className='flex flex-wrap -m-4'>
        <Articles articles={otherArticles} />
      </div>
        </>
    )
}
export default Article;