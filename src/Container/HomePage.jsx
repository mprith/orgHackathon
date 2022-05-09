import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Card from "../Components/Card";
import AddForm from "../Components/AddForm";
import { challengeTag, data } from "../Constant";
import "./HomePage.scss";


export default function HomePage(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tag, setTag] = useState("");

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

    const handleVoting = (action, id) => {
        const newData = challengeData.map((item) => {
            if (item.id === id) {
                const updatedItem = {
                    ...item,
                };
                if(action === "upvote") {
                    updatedItem.likes = item.likes + 1;
                } else {
                    if(updatedItem.likes === 0){
                        updatedItem.likes = 0; 
                    } else {
                        updatedItem.likes = item.likes -1;
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
                likes: 0,
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

            {isModalOpen && <AddForm
                isModalOpen={isModalOpen}
                handleClose={handleClose}
                handleTitleOnChange={handleTitleOnChange}
                handleDescOnChange={handleDescOnChange}
                handleOnSubmit={handleOnSubmit}
                handleSelect={handleSelect}
                tag={tag}
            />}
            <Button variant="secondary" className="addBtn" onClick={() => { setIsModalOpen(true) }} size="lg">
                Add Challenge
            </Button>
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
        </div>
    )

}