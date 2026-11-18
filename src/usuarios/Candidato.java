package usuarios;

public class Candidato extends Usuario {
    private String curso;

    public Candidato(String nome, String email, int idade, String curso){
        super(nome, idade, email);
        this.curso = curso;
    }

    public String getCurso(){
        return curso;
    }

    public void setCurso(){
        this.curso = curso; 
    }
    
}
