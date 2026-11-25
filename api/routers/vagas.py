"""Rotas relacionadas às vagas de emprego disponíveis."""

from fastapi import APIRouter, HTTPException

from api import database
from api.schemas import VagaOut

router = APIRouter(prefix="/vagas", tags=["Vagas"])


@router.get("", response_model=list[VagaOut])
def listar_vagas():
    """Retorna todas as vagas disponíveis."""
    return database.vagas


@router.get("/{vaga_id}", response_model=VagaOut)
def buscar_vaga(vaga_id: int):
    """Retorna uma vaga específica pelo ID."""
    vaga = database.buscar_vaga_por_id(vaga_id)
    if vaga is None:
        raise HTTPException(status_code=404, detail="Vaga não encontrada")
    return vaga
