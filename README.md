# CareerTrack System — Gerenciamento de Candidaturas e Processos Seletivos

Aplicação desenvolvida originalmente em **Java** (Programação Orientada a Objetos) e expandida com uma **API REST em Python (FastAPI)** para simplificar e organizar o gerenciamento de candidaturas a vagas de emprego.

O sistema permite que candidatos acompanhem oportunidades disponíveis, registrem candidaturas e monitorem a etapa atual de cada processo seletivo em um único ambiente.

> [!NOTE]
> Atualmente, tanto o módulo Java quanto a API FastAPI operam de forma independente e armazenam os dados **em memória** (os registros de candidaturas são reiniciados quando o programa ou servidor é encerrado).

---

## Objetivos

- Centralizar o controle de vagas e candidaturas em processos seletivos.
- Aplicar conceitos de Programação Orientada a Objetos (POO) e modularização no projeto Java.
- Disponibilizar e validar operações CRUD via API REST com FastAPI, Pydantic e testes automatizados.

---

## Funcionalidades

- **Gerenciamento de vagas:** listagem e consulta por ID das oportunidades disponíveis.
- **Cadastro de candidaturas:** registro de novas candidaturas vinculadas a uma vaga existente, com validação de dados (e-mail válido, idade maior que zero e campos obrigatórios).
- **Listagem e consulta:** visualização de todas as candidaturas ou busca individual por ID.
- **Atualização de status:** alteração da etapa do processo seletivo de uma candidatura.
- **Exclusão:** remoção de candidaturas registradas.

---

## Tecnologias Utilizadas

### API REST (Python)
- **Python 3**
- **FastAPI:** criação das rotas REST e documentação automática (Swagger/OpenAPI).
- **Pydantic (`EmailStr`, `BaseModel`, `Field`):** validação de entrada e serialização de saída.
- **Uvicorn:** servidor ASGI para execução local da API.
- **Unittest + `TestClient` (`httpx`):** testes automatizados dos endpoints.

### Aplicação Console (Java)
- **Java:** implementação orientada a objetos com entidades e relacionamentos.
- **Java Collections Framework (`ArrayList`):** armazenamento e gerenciamento em memória.
- **Terminal / Console:** interface textual para interação com o usuário.

---

## Estrutura do Projeto

```text
OOC_project/
├── api/
│   ├── __init__.py
│   ├── main.py                  # Ponto de entrada da API FastAPI e registro dos routers
│   ├── schemas.py               # Modelos Pydantic (entrada e resposta)
│   ├── database.py              # Dados em memória e funções auxiliares de busca
│   └── routers/
│       ├── __init__.py
│       ├── vagas.py             # Rotas de /vagas
│       └── candidaturas.py      # Rotas de /candidaturas
├── src/
│   ├── usuarios/                # Entidades Usuario.java e Candidato.java
│   ├── recrutamento/            # Entidades Vaga.java e Candidatura.java
│   └── system/                  # Ponto de entrada console (Main.java)
├── tests/
│   └── test_api.py              # Testes automatizados da API
├── postman/                     # Workspace do Postman para testes manuais
├── requirements.txt             # Dependências Python do projeto
├── .gitignore
└── README.md
```

---

## Como Executar

### 1. API FastAPI (Python)

**Pré-requisito:** Python 3 instalado.

Na raiz do projeto (`OOC_project/`):

```bash
# 1. Criar e ativar o ambiente virtual
python3 -m venv .venv
source .venv/bin/activate

# 2. Instalar as dependências
pip install -r requirements.txt

# 3. Iniciar o servidor da API
uvicorn api.main:app --reload
```

Após iniciar, acesse:
- **Documentação interativa (Swagger UI):** `http://127.0.0.1:8000/docs`
- **Rota inicial de status:** `http://127.0.0.1:8000/`

### 2. Testes Automatizados da API

Com o ambiente virtual ativo na raiz do projeto:

```bash
python -m unittest discover -s tests -v
```

### 3. Aplicação Console (Java)

**Pré-requisito:** Java JDK instalado.

Compile os arquivos dentro de `src/` e execute a classe principal `Main` (localizada em `src/system/Main.java`) a partir do diretório de compilação configurado na sua máquina/IDE.

---

## Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Verifica se a API está ativa |
| `GET` | `/vagas` | Lista todas as vagas disponíveis |
| `GET` | `/vagas/{vaga_id}` | Busca uma vaga específica pelo ID |
| `POST` | `/candidaturas` | Cria uma nova candidatura vinculada a uma vaga |
| `GET` | `/candidaturas` | Lista todas as candidaturas registradas |
| `GET` | `/candidaturas/{candidatura_id}` | Busca uma candidatura específica pelo ID |
| `PATCH` | `/candidaturas/{candidatura_id}` | Atualiza o status de uma candidatura |
| `DELETE` | `/candidaturas/{candidatura_id}` | Remove uma candidatura pelo ID |

### Exemplo de requisição (`POST /candidaturas`)

```json
{
  "nome": "Beatriz",
  "email": "beatriz@exemplo.com",
  "idade": 21,
  "curso": "Ciência da Computação",
  "id_vaga": 1
}
```

### Exemplo de atualização (`PATCH /candidaturas/{candidatura_id}`)

```json
{
  "status": "Entrevista técnica"
}
```

---

## Próximos Passos

- [ ] Persistência de dados em banco de dados (ex.: SQLite com `sqlite3` ou `SQLModel`/`SQLAlchemy`).
- [ ] Integração entre o cliente Java (`src/`) e a API FastAPI (`api/`) via requisições HTTP (`java.net.http.HttpClient`).
- [ ] Criação e versionamento da collection de testes na pasta `postman/`.

---

**Projeto acadêmico | Programação Orientada a Objetos (POO) | Java & FastAPI**


