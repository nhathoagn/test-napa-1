import "./index.css"
import {Avatar, Col, Form, Image, Input, Row} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import {Button, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import imageUploadicon from "../../access/upload-solid.svg"
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useLocation, useParams} from "react-router-dom"
import imageEdit from "../../access/pencil-alt-solid.svg";
import imageTrash from "../../access/trash-alt-regular.svg";
import searchIcon from "../../access/search-solid.svg"
import trash_can from "../../access/trash-can-regular.svg"
import posts, {
    createPosts, deletePosts, disablePosts, enablePost, enablePosts,
    findPostsByName,
    findPostsByTitle, restorePosts,
    retrievePosts,
    updatePosts
} from "../../slices/posts";
import {Link, Redirect, useNavigate} from "react-router-dom"
import Notfound from "../Notfound";
import Detail from "../Detail";


const AppButton = (props) => {
    const post = useSelector(state => state.posts);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    useEffect(() => {
        dispatch(retrievePosts());
    }, []);

    // console.log("state", post)

    const dispatch = useDispatch();
    let navigate = useNavigate()
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [objPost, setObjpost] = useState({
        name: "",
        description: "",
    });
    const [isEdit, setIsedit] = useState(true);
    console.log("status", isEdit)
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [submitted, setSubmitted] = useState(false);
    const [validate, setValidate] = useState(true);


    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onEdit = async () => {
        setIsedit(true)
        showModalAdd()

    }

    const showModalAdd = () => {
        setIsModalAddVisible(true);
        setAvatarUpdate("")
        setimageUpload("")
    };
    const showModalDelete = () => {
        setIsModalDeleteVisible(true);
    };
    let location = useLocation();
    const setActivePost = (posts, index) => {
        setCurrentTutorial(posts);
        setCurrentIndex(index);
        // <Link to={"/page/" + currentTutorial.id}/>
        // navigate('/page/' + currentTutorial.id)


    };


    const  handleDeleteOk = () => {
        setIsModalDeleteVisible(false);
    };


    // const handleAddCancel = () => {
    //     if (validate == true){
    //         setIsModalAddVisible(true)
    //     }else{
    //         setIsModalAddVisible(false);
    //     }
    //
    // };
    const handleCancel = async () => {

        setAvatar("")
        setImage("")
        setCurrentTutorial("")
        await setObjpost({
            avatar: '',
            name: '',
            description: '',
            image: ''
        })
        setValidate(false)
        setValiAvatar(false)
        setValiName(false)
        setValidescript(false)
        setValiNameEDit(false)
        setValiAvatarEDit(false)
        setValidescriptEDit(false)
        await setIsModalAddVisible(false)
    }
    // const handleEeitCancel = () => {
    //     setIsedit(false)
    //     setIsModalAddVisible(false);
    //     setCurentPost("")
    // };
    // const handleDeleteCancel = () => {
    //     navigation('/')
    // };

    //Upload Image avatar start


    const [avatarr, setAvatar] = useState("");

    const uploadAvatar = async (e) => {
        const files = e.target.files;
        const data = new FormData
        data.append('file', files[0])
        data.append('upload_preset', 'uploads')
       try {
           const res = await fetch('https://api.cloudinary.com/v1_1/ddnv4r9pb/image/upload', {
               method: 'POST',
               body: data

           })
           const file = await res.json()
           if (currentTutorial) {
               setAvatarUpdate(file.secure_url)
           } else {
               setAvatar(file.secure_url)
           }
       }catch (e) {
           console.log(e.messages)
       }

        // console.log("path", file)


        // console.log("ssss",objPost)
        // setLoading(false)
    }

    //Upload Image end
    //Upload Image start

    const [imageUpload, setimageUpload] = useState();
    const [imagee, setImage] = useState("");
    const [avatarUpdate, setAvatarUpdate] = useState("");
    const [valiAvatar, setValiAvatar] = useState(false);
    const [valiName, setValiName] = useState(false);
    const [valiDescript, setValidescript] = useState(false);
    const [valiAvatarEdit, setValiAvatarEDit] = useState(false);
    const [valiNameEdit, setValiNameEDit] = useState(false);
    const [valiDescriptEdit, setValidescriptEDit] = useState(false);
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData
        data.append('file', files[0])
        data.append('upload_preset', 'uploads')
        const res = await fetch('https://api.cloudinary.com/v1_1/ddnv4r9pb/image/upload', {
            method: 'POST',
            body: data

        })
        const file = await res.json()
        console.log("path", file)

        if (currentTutorial) {
            setimageUpload(file.secure_url)
        } else {
            setImage(file.secure_url)
        }
    }


    //Upload Image end

    //Handle onchange name - description - start


    const handleOnchane = async (e) => {
        e.preventDefault()
        const value = e.target.value
        if (currentTutorial) {
            setCurrentTutorial({...currentTutorial, [e.target.name]: value})
        } else {
            setObjpost({...objPost, [e.target.name]: value})
        }

        console.log("data", objPost)
    }
    // const validateInput = () => {
    //     if (!objPost.name.trim() && !objPost.description.trim() && !avatarr) {
    //         setValidate(false)
    //     } else {
    //         setValidate(true)
    //     }
    // }

    const validateAvatar = (status) => {
        setValiAvatar(status)
        // if (!avatarr.trim() ) {
        //     setValiAvatar(true)
        // } else {
        //     setValiAvatar(false)
        //
        // }
    }

    const validateNanme = (status) => {
        setValiName(status)
        // if (!objPost.name.trim() ) {
        //     setValiName(true)
        // } else {
        //     setValiName(false)
        //
        // }
    }
    const validateDescription = (status) => {
        setValidescript(status)
        // if (!objPost.description.trim() ) {
        //     setValidescript(true)
        // } else {
        //     setValidescript(false)
        //
        // }
    }




    // const validateAvatarEdit = () => {
    //
    //     if (!currentTutorial.avatar.trim() ) {
    //         setValiAvatarEDit(true)
    //     } else {
    //         setValiAvatarEDit(false)
    //
    //     }
    // }

    const validateNanmeEdit = () => {
            setValiNameEDit(true)
    }
    const validateDescriptionEdit = () => {
            setValidescriptEDit(true)
    }
    //Handle onchange name - description - end

    // add post start;


    // const clearState =  () => {
    //     setObjpost({ ...init });
    // };
    console.log("valiAvatarEdit",valiAvatarEdit)
    console.log("validateNameEdit",valiNameEdit)
    console.log("validateDescriptEdit",valiDescriptEdit)
    console.log("valiAvatar",valiAvatar)
    console.log("validateName",valiName)
    console.log("validateDescript",valiDescript)
    const addPost = (e) => {
        // const  inputTag = document.getElementsByClassName("input-tag")
        // console.log("111")
        const {name, description} = objPost
        if (!avatarr){
            validateAvatar(true)
        }
        if (avatarr){
            validateAvatar(false)
        }
        if (name.length == 0){
            validateNanme(true)
        }
        if (name.length > 0){
            validateNanme(false)
        }
        if (description.length == 0){
            validateDescription(true)
        }
        if (description.length > 0){
            validateDescription(false)
        }
        console.log("tatatatata",avatarr,name.length,description.length,imagee)
        if (avatarr && name.length > 0 && description.length > 0){
            console.log("5616516516")
            dispatch(createPosts({avatarr, name, description, imagee}))
                .then(data => {
                    setObjpost({
                        avatar: data.avatar,
                        name: data.name,
                        description: data.description,
                        image: data.image
                    });
                    setAvatar("")
                    setImage("")
                    // setObjpost({
                    //     avatar: '',
                    //     name: '',
                    //     description: '',
                    //     image: ''
                    // })
                        handleCancel()
                })
                .catch(e => {
                    console.log(e);
                });
        }else {
            console.log("errr")
        }




        // setAvatar("")
        //  setImage("")
        //  setObjpost({
        //     avatar: '',
        //     name:'',
        //     description: '',
        //     image:''
        // })
        // handleCancel()

        // console.log("new-state", objPost)

    }
    // const refreshData = () => {
    //     setCurrentTutorial(null);
    //     setCurrentIndex(-1);
    // };


    const EditPost = async () => {
        const data = {
            id: currentTutorial.id,
            avatar: avatarUpdate || currentTutorial.avatar,
            name: currentTutorial.name,
            description: currentTutorial.description,
            image: imageUpload || currentTutorial.image,
        }
        console.log("data",data.name.length)
        console.log("data1",data.description)
       if (data.name.length == 0){
          validateNanmeEdit()
       }
       if (data.description.length == 0){
           validateDescriptionEdit()
       }

       if (data.name.length !==0 && data.description.length !==0){
               dispatch(updatePosts({id: currentTutorial.id, data}))
                   .then(response => {
                       console.log("update done")
                       setCurrentTutorial(null)

                       setIsedit(false)
                       setObjpost({
                           avatar: '',
                           name: '',
                           description: '',
                           image: ''
                       })
                       dispatch(retrievePosts())
                       handleCancel()
                       setValidescriptEDit(false)
                       setValiNameEDit(false)

                       // handleCancel()


                   })
                   .catch(e => {
                       console.log(e)
                   })
           }




            //     dispatch(updatePosts({id: currentTutorial.id, data}))
            //         .then(response => {
            //             console.log("update done")
            //             setCurrentTutorial(null)
            //
            //             setIsedit(false)
            //             setObjpost({
            //                 avatar: '',
            //                 name: '',
            //                 description: '',
            //                 image: ''
            //             })
            //             dispatch(retrievePosts())
            //             handleCancel()
            //             setValidescriptEDit(false)
            //             setValiNameEDit(false)
            //
            //             // handleCancel()
            //
            //
            //         })
            //         .catch(e => {
            //             console.log(e)
            //         })
            // }


    }

    // add post end
    console.log("aaaaaaawdasdasd",post)
    // const [tampdata,setTampdata] =useState()
    const [click, setClick] = useState();
    const deletePort = () => {
        const idPost = currentTutorial.id
        setClick({...click,idPost})
        dispatch(disablePosts({id: currentTutorial.id}))
        // dispatch(retrievePosts())
        refreshData()
        handleDeleteOk()

     }
    console.log("qqqqqqqqqqqqqqqq", click)
    const Revert  =  () => {
            dispatch(enablePosts({id: click.idPost}))
        console.log("1")
            setClick('')
        console.log("2")
            dispatch(retrievePosts())
        console.log("3")
    }
    const [search, setSearch] = useState('');
    const handleSearch = e => {
        const searchText = e.target.value
        setSearch(searchText)

    }
    console.log("search", search)
    const refreshData = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };
    console.log("currr",currentTutorial)
    const Search = async () => {
        console.log("on")
        refreshData()
        dispatch(findPostsByName({name: search}))


    }



   const result = post.filter(value => value.deleteCheck == false  )
    console.log("mdmdmdmd",result)

    return (
        <>
            <div className="group-btn">
                <div className="btn-revert">
                    <Button className="btn-revert-ant" onClick={Revert}>Revert</Button>
                </div>
                <div className="btn-add-new">
                    <Button className="btn-add" onClick={showModalAdd}>
                        Add New
                    </Button>
                    <Modal className="post-modal" title={currentTutorial ? "Edit card" : "Add new card"}
                           visible={isModalAddVisible}>
                        <div className="post-modal-content">
                            <div className="post-modal-avatar">
                                { valiAvatar || valiAvatarEdit ? (<><p className={valiAvatar || valiNameEdit ? "text-err" : null } >Avatar</p></>) : (<><p >Avatar</p></>)}
                                <img src={imageUploadicon}/>
                                <div onChange={uploadAvatar} className="form-upload-img">

                                    {
                                        avatarr || avatarUpdate  ? (<span>{avatarr||avatarUpdate}</span>) : (<><label htmlFor="fileAvatar" className={valiAvatar || valiAvatarEdit ? "text-err" : "label-upload-image"  } >{currentTutorial && currentTutorial.avatar ? (currentTutorial.avatar) : ("Uploads")}</label>
                                            <input id="fileAvatar"  accept="image/*"  type={"file"} name="file"  style={{display: "none"}} /></>)
                                    }


                                    {/*<label htmlFor="fileAvatar"*/}
                                    {/*       className="label-upload-image">{currentTutorial  || avatarr || avatarUpdate ? ( {...currentTutorial.avatar} || avatarr || avatarUpdate) : ("Uploads")}</label>*/}
                                    {/*<input id="fileAvatar" type="file" name="file" style={{display: "none"}}/>*/}

                                    {/*{loading ? (<h3>Loading....</h3> ) : (<span>{image}</span>)}*/}
                                </div>

                            </div>

                            <div className="post-add-name">
                                {/*<p className={valiName || valiNameEdit ? null : "text-err"}>Name</p>*/}

                                { valiName || valiNameEdit ? (<><p className={valiName || valiNameEdit ? "text-err" : null}>Name</p></>) : (<><p >Name</p></>)}
                                <input name="name" value={currentTutorial ? (currentTutorial.name) : (objPost.name)}
                                       className={valiName || valiNameEdit ? "err-input" + " input-tag" : null } maxLength={8} required
                                       onChange={handleOnchane}/>
                            </div>
                            <div className="post-add-description">
                                <p className={valiDescript || valiDescriptEdit ? "text-err" : null}>Description</p>
                                <input name="description"
                                       value={currentTutorial ? (currentTutorial.description) : (objPost.description)}
                                       className={valiDescript || valiDescriptEdit ? "err-input" + " input-tag" : null } required
                                       onChange={handleOnchane}/>
                            </div>
                            <div className="post-modal-image">
                                <p>Image</p>
                                <img src={imageUploadicon}/>
                                <div onChange={uploadImage} className="form-upload-img">

                                    {
                                        imagee || imageUpload ? (<><label htmlFor="fileImage" className="label-upload-image" >{imagee || imageUpload}</label> <input id="fileImage" accept="image/*"  type={"file"} name="file"  style={{display: "none"}} /></> )
                                        : (<><label htmlFor="fileImage" className="label-upload-image" >{currentTutorial && currentTutorial.image ? (currentTutorial.image) : ("Uploads")}</label>
                                        <input id="fileImage"  accept="image/*"  type={"file"} name="file"  style={{display: "none"}} /></>)
                                    }
                                    {/*<label htmlFor="fileImage" f className="label-upload-image">{   imagee || imageUpload || currentTutorial ? ( {...currentTutorial.image} || imagee || imageUpload) : ("Uploads")}</label>*/}
                                    {/*<input id="fileImage" type="file" name="file" style={{display: "none"}}/>*/}

                                </div>
                            </div>
                            <hr className="tag-hr"></hr>
                        </div>
                        <div className="post-modal-footer">
                            {currentTutorial ? (<Button className="post-modal-footer-save"
                                                        onClick={() => {
                                                            EditPost()
                                                        }}>Update</Button>) : (
                                <Button className="post-modal-footer-save" onClick={() => {
                                    validateAvatar()
                                    validateNanme()
                                    validateDescription()
                                    addPost()
                                }}>Save</Button>)}

                            <Button className="post-modal-footer-cancel" onClick={handleCancel}>Cancel</Button>

                        </div>
                    </Modal>

                </div>
                <div className="input">
                    <input className="app-search" placeholder="Search name..." onChange={handleSearch}>

                    </input>

                    <img className="input-icon" onClick={Search} src={searchIcon}/>
                </div>
            </div>

            <div className="post-container">
                <ul style={{marginLeft: 100}}>

                    { result ? (<>{result  && result.map((value, index) => (

                            <li style={{display: "inline-block", marginRight: 28, width: 370}} key={index}
                                onClick={() => setActivePost(value, index)}>
                                {currentTutorial ? (<>
                                    {/*<Detail  data={currentTutorial}/>*/}
                                    <div className="post">

                                        <div className="post-top">
                                            <div className="post-avatar"><img src={value.avatar}/></div>
                                            <div className="post-info">
                                                <h3>{value.name}</h3>
                                                <p>{new Date(value.createdAt).toLocaleDateString('en-GB')}</p>
                                            </div>
                                            <div className="post-option">
                                                <Image preview={false} className="icon-edit"
                                                       onClick={(id) => onEdit(value.id)} width={18}
                                                       src={imageEdit}/>
                                                {/*<Image preview={false} onClick={() => removePost(currentPost)} className="icon-trash" width={18} height={18} src={imageTrash} />*/}

                                                <Image preview={false} onClick={showModalDelete} className="icon-trash"
                                                       width={18}  src={imageTrash}/>
                                                <Modal className="modal-delete" title="Your about to delete a item"
                                                       visible={isModalDeleteVisible}>
                                                    <div className="modal-delete-icon">
                                                        <img src={trash_can}/>
                                                    </div>
                                                    <div className="modal-delete-notice">
                                                        <p>This will delete your item form list <br/> Are you sure?</p>
                                                    </div>
                                                    <hr className="tag-hr"/>
                                                    <div className="modal-delete-footer">

                                                        <Button type={"primary"} className="modal-delete-btn-delete"
                                                                onClick={(id) => deletePort(value.id)}>Delete</Button>
                                                        <Button className="modal-delete-btn-cancel"
                                                                onClick={handleDeleteOk}>Cancel</Button>

                                                    </div>

                                                </Modal>


                                            </div>
                                        </div>
                                        <Link to={`page/${value.id}`}>

                                            <div className="post-mid">
                                                <p>{value.description}</p>
                                            </div>
                                            <div className="post-bottom">
                                                <img width={310} height={180} style={{paddingBottom: 22, objectFit: "cover"}}
                                                     src={value.image}/>
                                            </div>


                                        </Link>
                                    </div>
                                </>) : (<>

                                    <div className="post">
                                        <div className="post-top">
                                            <div className="post-avatar"><img src={value.avatar}/></div>
                                            <div className="post-info">
                                                <h3>{value.name}</h3>
                                                <p>{new Date(value.createdAt).toLocaleDateString('en-GB')}</p>
                                            </div>
                                            <div className="post-option">
                                                <Image preview={false} className="icon-edit"
                                                       onClick={(id) => onEdit(value.id)} width={18}
                                                       src={imageEdit}/>
                                                {/*<Image preview={false} onClick={() => removePost(currentPost)} className="icon-trash" width={18} height={18} src={imageTrash} />*/}

                                                <Image preview={false} onClick={showModalDelete} className="icon-trash"
                                                       width={18}  src={imageTrash}/>
                                                <Modal className="modal-delete" title="Your about to delete a item"
                                                       visible={isModalDeleteVisible}>
                                                    <div className="modal-delete-icon">
                                                        <img src={trash_can}/>
                                                    </div>
                                                    <div className="modal-delete-notice">
                                                        <p>This will delete your item form list <br/> Are you sure?</p>
                                                    </div>
                                                    <hr className="tag-hr"/>
                                                    <div className="modal-delete-footer">

                                                        <Button type={"primary"} className="modal-delete-btn-delete"
                                                                onClick={() => deletePort()}>Delete</Button>
                                                        <Button className="modal-delete-btn-cancel"
                                                                onClick={handleDeleteOk}>Cancel</Button>

                                                    </div>

                                                </Modal>


                                            </div>
                                        </div>
                                        <Link to={`page/${value.id}`}>
                                            <div className="post-mid">
                                                <p>{value.description}</p>
                                            </div>
                                            <div className="post-bottom">
                                                <img width={310} height={180} style={{paddingBottom: 22, objectFit: "cover"}}
                                                     src={value.image}/>
                                            </div>
                                        </Link>
                                    </div>

                                </>)}
                            </li>
                        ))}</>)
                        : (<><Notfound/></>)}

                </ul>
            </div>
        </>

    )
}
export default AppButton