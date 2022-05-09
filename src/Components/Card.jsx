import React from 'react';
import "../Container/HomePage.scss";

import like from "../assets/like.png";
import dislike from "../assets/dislike.png";

export default function Card(props) {
    const { data, handleVoting } = props;

    let cardList = [];
    data.map((el, index) => {
        cardList.push(<div className="card" key={el.title + index}>
            <div className="card-title">{el.title}</div>
            <div className="card-desc">{el.description}</div>
            <div className='vote'>
                <span>{el.likes}</span>
                <span onClick={() => { handleVoting("upvote", el.id) }}><img src={like} alt="Like" /></span>
                <span onClick={() => { handleVoting("downvote", el.id) }}><img src={dislike} alt="Dislike" /></span>
            </div>
        </div>)
    });

    return (
        <>
            {cardList}
        </>
    )

}