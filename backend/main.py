from uuid import UUID
from fastapi import FastAPI, Response, WebSocket, WebSocketDisconnect
import json

from .connect_manager import ConnectionManager

app = FastAPI()

manager = ConnectionManager()

@app.get("/health")
async def healthCheck():
    return Response(status_code= 200)

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
    except Exception as e:
        print('error ocurred')
        print(e)

print('uppp')