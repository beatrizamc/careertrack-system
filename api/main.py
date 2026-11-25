"""Ponto de entrada da API FastAPI.

Para executar a partir da raiz do projeto:
    .venv/bin/uvicorn api.main:app --reload
"""

from fastapi import FastAPI

from api.routers import candidaturas, vagas

app = FastAPI(
    title="API de Gerenciamento de Candidaturas",
    description="API REST em FastAPI para cadastro e acompanhamento de vagas e candidaturas.",
    version="0.1.0",
)

app.include_router(vagas.router)
app.include_router(candidaturas.router)


@app.get("/", tags=["Status"])
def raiz():
    """Rota inicial para verificar se a API está ativa."""
    return {
        "mensagem": "API de Gerenciamento de Candidaturas ativa",
        "documentacao": "/docs",
    }
