import jwt, { JwtPayload } from 'jsonwebtoken';
import { WebSocketServer, WebSocket } from 'ws';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prisma } from '@repo/db/prisma';

interface Client extends WebSocket {
  userId?: string,
  name: string,
  currentRoom?: string,
}

interface Room {
  id: string;
  members: Set<Client>;
}

const wss = new WebSocketServer({ port: 8080 });

const rooms: Record<string, Room> = {};

wss.on('connection', (ws: Client, req) => {
  ws.on('error', console.error);
  console.log('Client connected');

  const url = req.url;
  if (!url) {
    ws.close();
    return
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded.userId) {
      ws.close();
      return
    }

    ws.userId = decoded.userId;
    ws.name = decoded.name;
  } catch (error) {
    ws.close();
    return
  }

  ws.on('message', async (data) => {
    try {
      const parsedData = JSON.parse(data.toString());
      const { type, payload } = parsedData;

      switch (type) {
        case 'JOIN_ROOM': {
          const { roomId } = payload;
          joinRoom(ws, roomId);
          const shapes = await getShapesByRoomId(roomId);

          ws.send(JSON.stringify({
            type: "SYNC_SHAPES",
            shapes
          }))
          break;
        }

        case
          'LEAVE_ROOM': {
            leaveRoom(ws);
            break;
          }

        case 'SEND_MESSAGE': {
          const { message, roomId } = payload;
          broadcastMessage(ws, message, roomId);
          break;
        }

        case 'CREATE_SHAPE': {
          const { roomId, shape } = payload;
          const savedShape = await createShape(ws, roomId, shape);
          broadcastShape(ws, roomId, {
            type: "NEW_Shape",
            shape: savedShape
          });
          break;
        }

        case "UPDATE_SHAPE": {
          const { roomId, shape } = payload;

          await prisma.shape.update({
            where: {
              id: shape.id
            },
            data: shape
          })

          broadcastShape(ws, roomId, {
            type: "UPDATE_SHAPE",
            shape
          })
          break
        }


        case "DELETE_SHAPE": {
          const { roomId, shapeId } = payload;

          await prisma.shape.delete({
            where: {
              id: shapeId
            }
          })

          broadcastShape(ws, roomId, {
            type: "DELETE_SHAPE",
            shapeId
          })
          break
        }

        case "GET_SHAPES": {
          const { roomId } = payload;
          const shapes = await getShapesByRoomId(roomId);
          ws.send(JSON.stringify({
            type: "SYNC_SHAPES",
            payload: {
              roomId,
              shapes
            }
          }))
          break;
        }

        default:
          console.log("Unknown message type received", type);
          break;

      }
    } catch (error) {
      console.log(error, "Invalid message format received", error);
    }
  });

  ws.on('close', (error) => {
    console.log('Connection closed', error);
  });

});


function joinRoom(ws: Client, roomId: string) {
  if (!rooms[roomId]) {
    rooms[roomId] = { id: roomId, members: new Set() };
  };

  rooms[roomId].members.add(ws);
  ws.currentRoom = roomId;
  broadcastMessage(ws, `${ws.name} joined the room`, roomId);
}

function leaveRoom(ws: Client) {
  if (!ws.currentRoom || !rooms[ws.currentRoom]) return;

  const room = rooms[ws.currentRoom];
  room?.members.delete(ws);

  if (room?.members.size === 0) {
    delete rooms[ws.currentRoom];
  } else {
    broadcastMessage(ws, `${ws.name} left the room`, ws.currentRoom);
  }

  ws.currentRoom = undefined;
}


function broadcastMessage(ws: Client, message: string, roomId: string) {
  if (!rooms[roomId] || !ws.currentRoom) return;

  const room = rooms[roomId];
  room.members.forEach((member) => {
    if (member.readyState === WebSocket.OPEN && member.userId !== ws.userId) {
      member.send(JSON.stringify({
        type: 'NEW_MESSAGE',
        roomId,
        message,
        senderId: ws.name,
      }))
    }
  })
}

const broadcastShape = (ws: Client, roomId: string, message: any) => {
  if (!rooms[roomId] || !ws.currentRoom) return;

  const room = rooms[roomId];
  room.members.forEach((member) => {
    if (member.readyState === WebSocket.OPEN && member.userId !== ws.userId) {
      member.send(JSON.stringify(message))
    }
  })
}

const createShape = async (ws: Client, roomId: string, shape: any) => {
  const savedShape = await prisma.shape.create({
    data: {
      ...shape,
      roomId,
      createdBy: ws.userId
    }
  })
  return savedShape
}

const getShapesByRoomId = async (roomId: string) => {
  return await prisma.shape.findMany({
    where: {
      roomId: roomId
    }
  })
}