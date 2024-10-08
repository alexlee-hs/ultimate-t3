from fastapi import WebSocket

class ClientModel():
    websocket: WebSocket
    uuid: str

    def __init__(self, w, u):
        self.websocket = w
        self.uuid = u

class ActiveGameModel():
    playerO: ClientModel
    playerX: ClientModel
    uuid: str

    def __init__(self, playerO, playerX, u):
        self.playerO = playerO
        self.playerX = playerX
        self.uuid = u
