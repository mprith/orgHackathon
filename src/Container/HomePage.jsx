import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Card from "../Components/Card";
import AddForm from "../Components/AddForm";
import { challengeTag, data } from "../Constant";
import "./HomePage.scss";
import ActionBar from '../Components/ActionBar';


export default function HomePage(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tag, setTag] = useState("");
    const [sortOn, setSortOn] = useState("");

    const [challengeData, setChallengeData] = useState(data);
    let techData = challengeData.filter(el => el.tag === challengeTag[0]);
    let featureData = challengeData.filter(el => el.tag === challengeTag[1]);

    useEffect(() => {
        techData = challengeData.filter(el => el.tag === challengeTag[0]);
        featureData = challengeData.filter(el => el.tag === challengeTag[1]);
    }, [challengeData]);



    const handleClose = () => {
        setIsModalOpen(false);
        setTitle("");
        setDesc("");
        setTag("");
    }

    const handleTitleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescOnChange = (e) => {
        setDesc(e.target.value);
    }

    const handleSelect = (e) => {
        setTag(e);
    }

    const handleSortSelect = (e) => {
        setSortOn(e);
        challengeData.sort((a, b) => a[e.toLowerCase()] - b[e.toLowerCase()]);
        setChallengeData(challengeData);
    }

    const handleVoting = (action, id) => {
        const newData = challengeData.map((item) => {
            if (item.id === id) {
                const updatedItem = {
                    ...item,
                };
                if (action === "upvote") {
                    updatedItem.vote = item.vote + 1;
                } else {
                    if (updatedItem.vote === 0) {
                        updatedItem.vote = 0;
                    } else {
                        updatedItem.vote = item.vote - 1;
                    }
                }
                return updatedItem;
            }
            return item;
        });
        setChallengeData(newData);
    }

    const validateForm = () => {
        if (title !== "" && desc !== "" && tag !== "") {
            return true;
        } else {
            return false;
        }
    }

    const handleOnSubmit = () => {
        if (validateForm()) {
            const postData = {
                tag: tag,
                title: title,
                description: desc,
                date: "",
                vote: 0,
                id: Math.random(),
                date: new Date(),
            }
            challengeData.push(postData);
            setChallengeData(challengeData);
            handleClose();
        } else {
            alert("Please fill all the fields");
        }
    }


    return (
        <div className='homePage'>
            <ActionBar
                setIsModalOpen={setIsModalOpen}
                sortOn={sortOn}
                handleSortSelect={handleSortSelect}
            />
            <>
                <div className="column">
                    <div className="column-title">Tech</div>
                    <Card data={techData}
                        handleVoting={handleVoting}
                    />
                </div>
                <div className="column">
                    <div className="column-title">Feature</div>
                    <Card data={featureData}
                        handleVoting={handleVoting}
                    />
                </div>
            </>
            {isModalOpen && <AddForm
                isModalOpen={isModalOpen}
                handleClose={handleClose}
                handleTitleOnChange={handleTitleOnChange}
                handleDescOnChange={handleDescOnChange}
                handleOnSubmit={handleOnSubmit}
                handleSelect={handleSelect}
                tag={tag}
            />}

        </div>
    )

}