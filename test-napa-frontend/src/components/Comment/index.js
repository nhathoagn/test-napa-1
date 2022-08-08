import React, {useState} from "react";
import './index.css'
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {commentsPosts, retrievePosts} from "../../slices/posts";

const FormComment = (props) => {
    const [commentContext, setCommentcontext] = useState();
    const dispatch = useDispatch();
    const handelComment = e =>{
        const commentText = e.target.value
        setCommentcontext(commentText)
    }
    console.log("comments", commentContext)
    console.log("id",props.data.id)
    console.log("props",props.reset)
    const [validateComment, setValidateComment] = useState(false)
    const Comment = () => {
     let data = {
         comments: commentContext
     }
        console.log("data", commentContext)
        if (!validateComment){
            setValidateComment(true)
        }else{
            setValidateComment(false)
            dispatch(commentsPosts({id: props.data.id ,data}))
                .then( response =>{
                    // props.reset.(response.payload)
                    props.reset(response.payload)
                })
                .catch(e => {
                    console.log(e)
                })
            setCommentcontext("")
        }

    }
  return(

          <div className="form-comment-container">
              <div className="form-comment-title">
                  <p>Post a new coment</p>
              </div>
              <div className="form-comment-title-input">
                  <textarea value={commentContext} className={validateComment ? "err-input" +  " form-comment-title-input-placeholder" : "form-comment-title-input-placeholder" } onChange={handelComment} placeholder="Add comment...">

                  </textarea>
                  <div className="form-comment-btn">
                      <Button type={"primary"} className="form-comment-btn-post" onClick={Comment}>Post</Button>
                  </div>

              </div>

          </div>
  )
}
export default FormComment