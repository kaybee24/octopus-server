import Message from '../models/Message.mjs'

async function getAllMessages (request, response) {
  try {
    if (request.token?.id) {
      const messages = await Message.find({ user: request.token.id })
      response.json({
        message: 'got all your messages',
        data: messages,
        success: true
      })
    } else {
      response.status(401).send({
        message: 'You must be logged in to get messages',
        success: false,
        data: null
      })
    }
  } catch (error) {
    response.status(400).send({
      message: error.message,
      success: false,
      data: error
    })
  }
}

async function createMessage (request, response) {
  const msg = {
    from: request.token.id,
    to: request.body.to,
    message: request.body.message,
    user: request.token.id
  }

  const res = await Message.create(msg)
  response.send(res)
}

async function getMessage (request, response) {
  const message = await Message.find({ _id: request.params.id })
  response.json(message)
}

const MessageController = {
  getAllMessages,
  createMessage,
  getMessage
}

export default MessageController
