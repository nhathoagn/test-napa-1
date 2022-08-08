import http from "../http.common";

const getAll = () => {
    return http.get("/posts");
};

const get = id => {
    return http.get(`/posts/${id}`);
};

const create = data => {
    return http.post("/posts", data);
};

const update = (id, data) => {
    return http.put(`/posts/${id}`, data);
};

const remove = id => {
    return http.delete(`/posts/${id}`);
};

const findByID = id => {
    return http.get(`/posts/${id}`);
};
const findByName = title => {
    return http.get(`/posts?name=${title}`);
};
const like = id => {
    return http.patch(`/posts/likePost/${id}`)
}
const comments = (id,data) => {
    return http.post(`/posts/comment/${id}`,data)}
const deleteRevert = (id) => {
    return http.patch(`/posts/deleteRever/${id}`)
}
const revert = (id) => {
    return http.patch(`/posts/revert/${id}`)
}
const PostService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByName,
    like,
    comments,
    deleteRevert,
    revert,
    findByID
};

export default PostService;