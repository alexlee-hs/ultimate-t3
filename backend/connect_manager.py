from uuid import UUID, uuid4
from fastapi import WebSocket
import json
from backend.models import ActiveGameModel, ClientModel

class ConnectionManager:
    def __init__(self):
        self.random_queue: list[ClientModel] = []
        self.active_game_map: dict[UUID, ActiveGameModel] = {}

    async def connect(self, websocket: WebSocket) -> UUID:
        await websocket.accept()
        client_model = ClientModel(websocket, uuid4())
        self.random_queue.append(client_model)
        if len(self.random_queue) > 1:
            self.createGame(self.random_queue.pop(), self.random_queue.pop())
        return client_model.uuid

    def createGame(self, player1: ClientModel, player2: ClientModel):
        new_game = ActiveGameModel(
                player1,
                player2,
                uuid4()
            )
        self.active_game_map[new_game.uuid] = new_game

    def endGame(self, gameUUID: UUID):
        self.active_game_map.pop(gameUUID)

    async def sendGameState(self, message: json, gameUUID: UUID):
        game = self.active_game_map.get(gameUUID)
        if game is None:
            return
        await game.player1.websocket.send_json(message)
        await game.player2.websocket.send_json(message)

    