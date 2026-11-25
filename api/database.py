"""Armazenamento em memória para testes da API.

Este módulo centraliza os dados enquanto não há conexão com um banco de dados real
(como SQLite/PostgreSQL) ou integração direta com o sistema Java.
"""

from typing import Any

VAGAS_INICIAIS: list[dict[str, Any]] = [
    {"id": 1, "cargo": "Analista de Dados", "empresa": "Microsoft", "area": "Dados"},
    {"id": 2, "cargo": "Engenheiro de Software", "empresa": "Amazon", "area": "Tecnologia da Informação"},
    {"id": 3, "cargo": "Desenvolvedor Full-Stack", "empresa": "Bradesco", "area": "Tecnologia da Informação"},
]

vagas: list[dict[str, Any]] = [vaga.copy() for vaga in VAGAS_INICIAIS]
candidaturas: list[dict[str, Any]] = []
_cont_id: int = 1


def gerar_id_candidatura() -> int:
    """Retorna o próximo ID sequencial para uma nova candidatura."""
    global _cont_id
    novo_id = _cont_id
    _cont_id += 1
    return novo_id


def buscar_vaga_por_id(vaga_id: int) -> dict[str, Any] | None:
    """Busca uma vaga pelo ID ou retorna None se não existir."""
    return next((v for v in vagas if v["id"] == vaga_id), None)


def buscar_candidatura_por_id(candidatura_id: int) -> tuple[int, dict[str, Any]] | None:
    """Busca uma candidatura pelo ID e retorna (índice, registro), ou None."""
    for indice, candidatura in enumerate(candidaturas):
        if candidatura["id"] == candidatura_id:
            return indice, candidatura
    return None


def resetar_banco() -> None:
    """Restaura os dados em memória para o estado inicial (útil em testes)."""
    global _cont_id
    vagas.clear()
    vagas.extend(vaga.copy() for vaga in VAGAS_INICIAIS)
    candidaturas.clear()
    _cont_id = 1
