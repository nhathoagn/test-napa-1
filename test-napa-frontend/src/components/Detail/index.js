import React, {useEffect, useState} from "react";
import './index.css'
import heartImg from "../../access/heart-solid.png"
import messageImg from "../../access/message-solid.png"
import FormComment from "../Comment";
import {useDispatch, useSelector} from "react-redux";
import PostService from "../../services/PostService";
import {likePosts, retrievePosts} from "../../slices/posts";

const PageDetail = () => {
    const dispatch = useDispatch();
    const [currentTutorial, setCurrentTutorial] = useState();
    const id = window.location.pathname.slice(6, 30);

    useEffect( () => {
            if (id) {
                PostService.get(id)
                    .then(response => {
                        setCurrentTutorial({...currentTutorial,...response.data});
                    })
                    .catch(e => {
                        console.log(e);
                    });

            }
    }, [id]);



    const Like =  (postID) =>{
        dispatch(likePosts({id: postID}))
            .then( response => {
                console.log(response)
                setCurrentTutorial({...currentTutorial, ...response.payload})
            })
        // refresh()

    }

    const resetData = async (data) => {
    await setCurrentTutorial({...currentTutorial, ...data})
    }
    return (

        <>
            {currentTutorial ? (<>
                <div className="page-detail-container">
                    <div className="page-detail-title">
                        <p>SOCIAL CARD DETAIL</p>
                    </div>
                    <div className="page-detail-info">
                        <div className="page-detail-info-avatar">
                            <img src={currentTutorial.avatar}/>
                        </div>
                        <div className="page-detail-info-name-date">
                            <h3 className="page-detail-info-name">{currentTutorial.name}</h3>
                            <p className="page-detail-info-date">{new Date(currentTutorial.createdAt).toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>
                    <div className="page-detail-content">
                        <div className="page-detail-content-tex">
                            <p>{currentTutorial.description}</p>
                        </div>
                        <div className="page-detail-content-image">
                            <img id="page-detail-content-image" src={currentTutorial.image}/>
                        </div>
                    </div>

                    <div className="page-detail-react-cmt">
                        <div className="page-detail-react">
                            <img src={heartImg} onClick={(postID) => Like(currentTutorial.id)}/>
                            <span>{currentTutorial.likesCount}</span>
                        </div>
                        <div className="page-detail-cmt">
                            <img src={messageImg}/>
                            <span>{currentTutorial.commentsCount}</span>
                        </div>
                    </div>
                    <hr className="tag-hr-detail"/>
                    <div className="page-detail-comment-data">
                        <ul>

                                    {
                                        [...currentTutorial.comments].reverse().map((value, index) => {
                                            return (
                                                <li key={index}>
                                                <div className="page-detail-comment-data-date" key={index}>
                                                    <span>{new Date(currentTutorial.updatedAt).toLocaleDateString('en-GB')}</span>
                                                </div>
                                                <div className="page-detail-comment-data-text">
                                                    <p key={index}>{value}</p>
                                                </div>
                                                </li>
                                            )
                                        })
                                    }



                        </ul>
                    </div>
                    <hr className="tag-hr-detail-final "/>
                    <FormComment data={currentTutorial} reset={resetData}/>
                </div>
            </>) : null}
        </>
    )
}
export default PageDetail