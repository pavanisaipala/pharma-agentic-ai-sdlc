import asyncio
from base_agent import BaseAgent
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY", "")

class RequirementsAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="RequirementsAgent",
                         listen_channel="requirements_channel",
                         publish_channel="design_channel")

    async def handle(self, payload):
        description = payload.get("description", "")
        reg = payload.get("regulatory_context", "")
        prompt = f"""You are a requirements writer for pharma software. Given the description:
{description}
and regulatory context: {reg}
Return JSON with 'user_stories': [{{"id":1,"title":"...","acceptance_criteria":"..."}}]
"""
        stories = await self.call_llm(prompt)
        result = {"job_id": payload["job_id"], "user_stories": stories}
        await self.publish(self.publish_channel, result)
        await self.redis.hset("jobs", payload["job_id"], "requirements_done")

    async def call_llm(self, prompt):
        if not openai.api_key:
            return [{"id":1, "title":"Implement secure login", "acceptance_criteria":"OAuth2, MFA"}]
        resp = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role":"system","content":"You are helpful."},{"role":"user","content":prompt}],
            max_tokens=500
        )
        text = resp.choices[0].message.content
        try:
            import json
            return json.loads(text)
        except Exception:
            return [{"id":1, "title":"Implement secure login", "acceptance_criteria":"OAuth2, MFA"}]

if __name__ == "__main__":
    import asyncio, logging
    logging.basicConfig(level=logging.INFO)
    a = RequirementsAgent()
    asyncio.run(a.start())
