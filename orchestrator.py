import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import redis.asyncio as aioredis
import uuid
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://127.0.0.1:6379")

app = FastAPI(title="Pharma SDLC Agentic Orchestrator")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis = aioredis.from_url(REDIS_URL, decode_responses=True)

class JobRequest(BaseModel):
    title: str
    description: str
    regulatory_context: str  

@app.on_event("startup")
async def startup():
    await redis.ping()

@app.post("/start_workflow")
async def start_workflow(req: JobRequest):
    job_id = str(uuid.uuid4())
    payload = {"job_id": job_id, "title": req.title, "description": req.description, "regulatory_context": req.regulatory_context}
    await redis.publish("requirements_channel", str(payload))
    await redis.hset("jobs", job_id, "started")
    return {"job_id": job_id, "status": "started"}

@app.get("/job_status/{job_id}")
async def job_status(job_id: str):
    s = await redis.hget("jobs", job_id)
    if not s:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"job_id": job_id, "state": s}
