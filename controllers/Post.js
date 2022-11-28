import Post from "../models/Post"

async function getAllPosts(request, response) {
    try {
        if (request.token?.id) {
            const messages = await Post.find({ user: request.token.id })
            response.json({
                message: "got all your messages",
                data: messages,
                success: true,
            })
        } else {
            response.status(401).send({
                message: "You must be logged in to get messages",
                success: false,
                data: null,
            })
        }
    } catch (error) {
        response.status(400).send({
            message: error.message,
            success: false,
            data: error,
        })
    }
}

async function createPost(request, response) {
    const postmsg = {
        from: request.token.id,
        to: request.body.to,
        message: request.body.message,
        user: request.token.id,
    }

    const res = await Post.create(postmsg)
    response.send(res)
}

async function getPost(request, response) {
    const message = await Post.find({ _id: request.params.id })
    response.json(message)
}

const PostController = {
    getAllPosts,
    createPost,
    getPost,
}

export default PostController