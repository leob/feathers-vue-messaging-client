import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const url = process.env.API_URL
const socket = io(url, {transports: ['websocket']})

const client = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))

client.service('/users')
client.service('/messages')

export default client
