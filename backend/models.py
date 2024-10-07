from uuid import UUID
from fastapi import WebSocket
from pydantic import BaseModel


class ClientModel(BaseModel):
    websocket: WebSocket
    uuid: UUID

class ActiveGameModel(BaseModel):
    player1: ClientModel
    player2: ClientModel
    uuid: UUID
