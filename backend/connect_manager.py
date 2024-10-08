from uuid import UUID, uuid4
from fastapi import WebSocket
from .models import ActiveGameModel, ClientModel

class ConnectionManager:
    def __init__(self):
        self.random_queue: list[ClientModel] = []
        self.active_game_map: dict[UUID, ActiveGameModel] = {}

    async def connect(self, websocket: WebSocket) -> UUID:
        await websocket.accept()
        client_model = ClientModel(websocket, str(uuid4()))
        self.random_queue.append(client_model)
        print('User created ' + client_model.uuid.__str__() + '\n')
        if len(self.random_queue) > 1:
            await self.createGame(self.random_queue.pop(), self.random_queue.pop())
        return client_model.uuid

    async def createGame(self, playerO: ClientModel, playerX: ClientModel):
        new_game = ActiveGameModel(
                playerO,
                playerX,
                str(uuid4())
            )
        self.active_game_map[new_game.uuid] = new_game
        print('Game created' + new_game.uuid.__str__() + '\n' + playerO.uuid.__str__() + '\n' + playerX.uuid.__str__() + '\n')
        await self.sendGameInfo(new_game.uuid)

    def endGame(self, gameUUID: UUID):
        self.active_game_map.pop(gameUUID)

    async def sendGameInfo(self, gameUUID: str):
        game = self.active_game_map.get(gameUUID)
        if game is None:
            return
        await game.playerO.websocket.send_json({ 'gameUUID': gameUUID, 'player': 'O' })
        await game.playerX.websocket.send_json({ 'gameUUID': gameUUID, 'player': 'X' })

    async def sendGameState(self, message: any, gameUUID: str):
        game = self.active_game_map.get(gameUUID)
        print('sending game state')
        if game is None:
            return
        await game.playerO.websocket.send_json(message)
        await game.playerX.websocket.send_json(message)

    