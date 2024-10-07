from uuid import UUID
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import json

from backend.connect_manager import ConnectionManager

app = FastAPI()

manager = ConnectionManager()

@app.websocket("/ws")
async def connection(websocket: WebSocket):
    await manager.connect(websocket)
    gameUUID: UUID = None

    try:
        while True:
            data = await websocket.receive_json()
            loadedData = json.loads(data)
            gameUUID = loadedData['gameUUID']
            await manager.sendGameState(data, gameUUID)
    except WebSocketDisconnect:
        if gameUUID is not None:
            manager.endGame(gameUUID)