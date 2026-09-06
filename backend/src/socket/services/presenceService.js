

const onlineUsers = new Map()

export const addSocket = (userId, socketId) => {
    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set())
    }
    onlineUsers.get(userId).add(socketId)
}

export const removeSocket = (userId, socketId) => {
    const sockets = onlineUsers.get(userId)
    if (!sockets) return
    socketId.delete(socketId)
    if (sockets.size === 0) {
        onlineUsers.delete(userId)
    }
}

export const getOnlineUsers = () => {
    return [...onlineUsers.keys()]
}

export const isOnline = (userId) => {
    return onlineUsers.has(userId)
}