import asyncio
import json
import logging
import redis.asyncio as aioredis
import os
from abc import ABC, abstractmethod

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
logger = logging.getLogger("agent")
logger.setLevel(logging.INFO)

class BaseAgent(ABC):
    def __init__(self, name, listen_channel, publish_channel=None):
        self.name = name
        self.listen_channel = listen_channel
        self.publish_channel = publish_channel
        self.redis = aioredis.from_url(REDIS_URL, decode_responses=True)

    async def start(self):
        pubsub = self.redis.pubsub()
        await pubsub.subscribe(self.listen_channel)
        logger.info(f"{self.name} subscribed to {self.listen_channel}")
        async for message in pubsub.listen():
            if message is None or message.get("type") != "message":
                continue
            data = message.get("data")
            logger.info(f"{self.name} received: {data}")
            try:
                payload = eval(data) if isinstance(data, str) else data
            except Exception:
                payload = data
            await self.handle(payload)

    @abstractmethod
    async def handle(self, payload):
        pass

    async def publish(self, channel, payload):
        await self.redis.publish(channel, str(payload))
        logger.info(f"{self.name} published to {channel}: {payload}")
