package recrutamento;

import usuarios.Candidato;

public class Candidatura {
    private int id;
    private Candidato candidato;
    private Vaga vaga;
    private String status;

    public Candidatura(int id, Candidato candidato, Vaga vaga) {
        this.id = id;
        this.candidato = candidato;
        this.vaga = vaga;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public Vaga getVaga() {
        return vaga;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public void dadosCandidatura() {
        System.out.println("----------- DADOS DA CANDIDATURA ----------- ");
        System.out.println("Código da candidatura: " + id);
        System.out.println("Candidato: " + candidato.getNome());
        System.out.println("Idade: " + candidato.getIdade());
        System.out.println("E-mail: " + candidato.getEmail());
        System.out.println("Curso: " + candidato.getCurso());
        System.out.println("Vaga: " + vaga.getCargo());
        System.out.println("Status: " + status);
        System.out.println("-------------------------------------------- ");
    }
}