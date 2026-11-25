"""Esquemas Pydantic para validação de entrada e resposta da API."""

from pydantic import BaseModel, EmailStr, Field


class VagaOut(BaseModel):
    """Representação de uma vaga disponível."""

    id: int
    cargo: str
    empresa: str
    area: str


class CandidatoOut(BaseModel):
    """Dados do candidato retornados dentro de uma candidatura."""

    nome: str
    email: EmailStr
    idade: int
    curso: str


class NovaCandidatura(BaseModel):
    """Dados necessários para registrar uma nova candidatura."""

    nome: str = Field(..., min_length=1, description="Nome completo do candidato")
    email: EmailStr = Field(..., description="E-mail válido do candidato")
    idade: int = Field(..., gt=0, description="Idade do candidato (maior que zero)")
    curso: str = Field(..., min_length=1, description="Curso ou formação")
    id_vaga: int = Field(..., gt=0, description="ID da vaga desejada")


class AtualizarStatus(BaseModel):
    """Payload para atualização de status de uma candidatura."""

    status: str = Field(..., min_length=1, description="Novo status do processo seletivo")


class CandidaturaOut(BaseModel):
    """Representação completa de uma candidatura registrada."""

    id: int
    candidato: CandidatoOut
    vaga: VagaOut
    status: str
