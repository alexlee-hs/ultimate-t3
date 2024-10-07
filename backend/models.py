from uuid import UUID
from fastapi import WebSocket
from pydantic import BaseModel


class ClientModel():
    websocket: WebSocket
    uuid: UUID

    def __init__(self, w, u):
        self.websocket = w
        self.uuid = u

class ActiveGameModel():
    player1: ClientModel
    player2: ClientModel
    uuid: UUID

    def __init__(self, p1, p2, u):
        self.player1 = p1
        self.player2 = p2
        self.uuid = u
