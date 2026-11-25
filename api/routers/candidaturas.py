"""Rotas para criação, listagem, atualização e exclusão de candidaturas."""

from fastapi import APIRouter, HTTPException

from api import database
from api.schemas import AtualizarStatus, CandidaturaOut, NovaCandidatura

router = APIRouter(prefix="/candidaturas", tags=["Candidaturas"])


@router.post("", status_code=201, response_model=CandidaturaOut)
def criar_candidatura(dados: NovaCandidatura):
    """Registra uma nova candidatura vinculada a uma vaga existente."""
    vaga = database.buscar_vaga_por_id(dados.id_vaga)
    if vaga is None:
        raise HTTPException(status_code=404, detail="Vaga não encontrada")

    nova = {
        "id": database.gerar_id_candidatura(),
        "candidato": dados.model_dump(exclude={"id_vaga"}),
        "vaga": vaga,
        "status": "Em análise",
    }
    database.candidaturas.append(nova)
    return nova


@router.get("", response_model=list[CandidaturaOut])
def listar_candidaturas():
    """Retorna todas as candidaturas registradas."""
    return database.candidaturas


@router.get("/{candidatura_id}", response_model=CandidaturaOut)
def buscar_candidatura(candidatura_id: int):
    """Retorna uma candidatura específica pelo ID."""
    encontrada = database.buscar_candidatura_por_id(candidatura_id)
    if encontrada is None:
        raise HTTPException(status_code=404, detail="Candidatura não encontrada")
    _, candidatura = encontrada
    return candidatura


@router.patch("/{candidatura_id}", response_model=CandidaturaOut)
def atualizar_status(candidatura_id: int, dados: AtualizarStatus):
    """Atualiza o status de uma candidatura existente."""
    encontrada = database.buscar_candidatura_por_id(candidatura_id)
    if encontrada is None:
        raise HTTPException(status_code=404, detail="Candidatura não encontrada")
    _, candidatura = encontrada
    candidatura["status"] = dados.status
    return candidatura


@router.delete("/{candidatura_id}")
def excluir_candidatura(candidatura_id: int):
    """Remove uma candidatura existente pelo ID."""
    encontrada = database.buscar_candidatura_por_id(candidatura_id)
    if encontrada is None:
        raise HTTPException(status_code=404, detail="Candidatura não encontrada")
    indice, _ = encontrada
    database.candidaturas.pop(indice)
    return {"ok": True}
