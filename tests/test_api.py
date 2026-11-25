"""Testes automatizados dos endpoints da API FastAPI."""

import unittest

from fastapi.testclient import TestClient

from api import database
from api.main import app


class TestAPI(unittest.TestCase):
    """Testa o fluxo completo de vagas e candidaturas."""

    def setUp(self) -> None:
        database.resetar_banco()
        self.client = TestClient(app)

    def test_raiz_e_listar_vagas(self) -> None:
        resp_raiz = self.client.get("/")
        self.assertEqual(resp_raiz.status_code, 200)
        self.assertIn("documentacao", resp_raiz.json())

        resp_vagas = self.client.get("/vagas")
        self.assertEqual(resp_vagas.status_code, 200)
        vagas = resp_vagas.json()
        self.assertEqual(len(vagas), 3)
        self.assertEqual(vagas[0]["id"], 1)

        resp_vaga = self.client.get("/vagas/2")
        self.assertEqual(resp_vaga.status_code, 200)
        self.assertEqual(resp_vaga.json()["empresa"], "Amazon")

        resp_404 = self.client.get("/vagas/999")
        self.assertEqual(resp_404.status_code, 404)

    def test_crud_candidaturas(self) -> None:
        payload_1 = {
            "nome": "Beatriz",
            "email": "beatriz@exemplo.com",
            "idade": 21,
            "curso": "Ciência da Computação",
            "id_vaga": 1,
        }
        payload_2 = {
            "nome": "Carlos",
            "email": "carlos@exemplo.com",
            "idade": 24,
            "curso": "Engenharia de Software",
            "id_vaga": 2,
        }

        r1 = self.client.post("/candidaturas", json=payload_1)
        self.assertEqual(r1.status_code, 201)
        self.assertEqual(r1.json()["id"], 1)
        self.assertEqual(r1.json()["status"], "Em análise")

        r2 = self.client.post("/candidaturas", json=payload_2)
        self.assertEqual(r2.status_code, 201)
        self.assertEqual(r2.json()["id"], 2)

        lista = self.client.get("/candidaturas")
        self.assertEqual(lista.status_code, 200)
        self.assertEqual(len(lista.json()), 2)

        # Atualiza a segunda candidatura (garante que o loop não falha antes de achar)
        patch = self.client.patch("/candidaturas/2", json={"status": "Entrevista técnica"})
        self.assertEqual(patch.status_code, 200)
        self.assertEqual(patch.json()["status"], "Entrevista técnica")

        # Remove a segunda candidatura e garante que a primeira permanece
        delete = self.client.delete("/candidaturas/2")
        self.assertEqual(delete.status_code, 200)
        self.assertEqual(delete.json(), {"ok": True})

        lista_apos = self.client.get("/candidaturas").json()
        self.assertEqual(len(lista_apos), 1)
        self.assertEqual(lista_apos[0]["id"], 1)

    def test_validacoes_e_erros(self) -> None:
        # Lista vazia: PATCH e DELETE devem retornar 404 (não None/200)
        self.assertEqual(
            self.client.patch("/candidaturas/1", json={"status": "Aprovado"}).status_code,
            404,
        )
        self.assertEqual(self.client.delete("/candidaturas/1").status_code, 404)

        # Vaga inexistente
        resp_vaga_invalida = self.client.post(
            "/candidaturas",
            json={
                "nome": "Ana",
                "email": "ana@exemplo.com",
                "idade": 20,
                "curso": "SI",
                "id_vaga": 99,
            },
        )
        self.assertEqual(resp_vaga_invalida.status_code, 404)

        # E-mail ou idade inválidos (validação Pydantic -> 422)
        resp_dados_invalidos = self.client.post(
            "/candidaturas",
            json={
                "nome": "Ana",
                "email": "email-invalido",
                "idade": -3,
                "curso": "SI",
                "id_vaga": 1,
            },
        )
        self.assertEqual(resp_dados_invalidos.status_code, 422)


if __name__ == "__main__":
    unittest.main()
