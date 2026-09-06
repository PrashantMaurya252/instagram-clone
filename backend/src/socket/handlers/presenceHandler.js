import { SOCKET_EVENTS } from "../../constants/socketEvent"
import { addSocket, isOnline, removeSocket } from "../services/presenceService"


export const presenceHandler = (socket, io) => {
    const userId = socket.userId
    const wasOnline = isOnline(userId)
    addSocket(userId, socket.id)
    if (!wasOnline) {
        io.emit(SOCKET_EVENTS.PRESENCE_ONLINE, { userId })
    }

    socket.on("disconnect", () => {
        removeSocket(userId, socket.id)
        const stillOnline = isOnline(userId)
        if (!stillOnline) {
            io.emit(SOCKET_EVENTS.PRESENCE_OFFLINE, { userId })
        }
    })
}

