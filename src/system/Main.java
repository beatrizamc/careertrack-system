package system;
import java.util.ArrayList;
import java.util.Scanner;
import recrutamento.Vaga;
import usuarios.Candidato;

import recrutamento.Candidatura;

public class Main {
   public static Scanner sc = new Scanner(System.in);
   public static ArrayList<Candidatura> candidaturas = new ArrayList<>();
   public static ArrayList<Vaga> vagas = new ArrayList<>();
   public static int contId = 1; 

   public static void main(String[] args){
    vagas.add(new Vaga(1, "Desenvolvedor Full-Stack", "Bradesco", "Tecnologia da Informação"));
    vagas.add(new Vaga(2, "Engenheiro de Software", "Amazon", "Tecnologia da Informação"));
    vagas.add(new Vaga(3, "Analista de Dados", "XP", "Dados"));

    int opcao;

    do{
        System.out.println("\n---------------------------------");
        System.out.println("xxxxxx - GERENCIADOR DE CANDIDATURAS");
        System.out.println("Escolha uma opção: ");
        System.out.println("1- Cadastrar candidato");
        System.out.println("2- Listar candidaturas: ");
        System.out.println("3- Atualizar candidatura: ");
        System.out.println("4- Excluir candidatura");
        System.out.println("0- Sair");
        System.out.println("\n---------------------------------");

        opcao = lerInteiro();
        switch(opcao){
            case 1:
                cadastrarCandidatura();
                break;

            case 2:
                listarCandidaturas();
                break;

            case 3: 
                atualizarCandidatura();
                break;
            case 4:
                excluirCandidatura();
                break;
            case 0:
                System.out.println("Encerrando o programa...");
                break;
            default:
                System.out.println("Opção inválida.");
        }

        }
        while(opcao !=0);

    sc.close();
}

public static int lerInteiro(){
    while(!sc.hasNextInt()){
        System.out.println("Digite uma opção válida.");
        sc.nextLine();
    }
        int numero = sc.nextInt();
        sc.nextLine();
        return numero; 
    }

  public static void cadastrarCandidatura() {
    System.out.println("\n----Nova Candidatura-----");
    System.out.println("Nome do candidato: ");
    String nome = sc.nextLine();

    System.out.println("Email: ");
    String email = sc.nextLine();

    System.out.println("Idade: ");
    int idade = lerInteiro();

    System.out.println("Curso: ");
    String curso = sc.nextLine();

    if (nome.trim().isEmpty() ||
            email.trim().isEmpty() ||
            idade <= 0 ||
            curso.trim().isEmpty() ||
            !email.contains("@")) {

        System.out.println("Por favor, insira os dados necessários em todos os campos.");
        return;
    }

    System.out.println("\n--- VAGAS DISPONÍVEIS ---");

    for (Vaga vaga : vagas) {
        vaga.exibirVaga();
    }

    System.out.print("Digite o ID da vaga desejada: ");
    int idVaga = lerInteiro();

    Vaga vagaEscolhida = null;

    for (Vaga vaga : vagas) {
        if (vaga.getId() == idVaga) {
            vagaEscolhida = vaga;
            break;
        }
    }

    if (vagaEscolhida == null) {
        System.out.println("Vaga não encontrada!");
        return;
    }

    Candidato candidato = new Candidato(nome, email, idade, curso);

    Candidatura candidatura = new Candidatura(contId, candidato, vagaEscolhida);

    candidaturas.add(candidatura);

    contId++;

    System.out.println("\nCandidatura cadastrada com sucesso!");
}

// LISTAR

public static void listarCandidaturas(){
    System.out.println("\n-------- Minhas Candidaturas ------");
    if(candidaturas.isEmpty()){
        System.out.println("\nNenhuma candidatura encontrada.");
        return;
    }

    for(Candidatura candidatura : candidaturas){
        candidatura.dadosCandidatura();
    }
}

// ATUALIZANDO

public static void atualizarCandidatura(){
    System.out.println("\n------- Atualizar candidatura ------");

    listarCandidaturas();
    if (candidaturas.isEmpty()){
        return;
    }
    System.out.print("Digite o ID da candidatura: ");
    int id = lerInteiro();
    for(Candidatura candidatura : candidaturas){
        if (candidatura.getId() == id){
            System.out.println("Escolha um novo status: ");
            System.out.println("1- Em análise");
            System.out.println("2- Candidato convocado para entrevista");
            System.out.println("3- Aprovada");
            System.out.println("4- Negada");
            System.out.println("Opção: ");
            int opcao = lerInteiro();
            
            switch (opcao){
                case 1: 
                candidatura.setStatus("Em análise");
                break; 

                case 2: 
                candidatura.setStatus("Candidato convocado para entrevista ");
                break;

                case 3: 
                candidatura.setStatus("Aprovada");
                break;

                case 4:
                candidatura.setStatus("Negada");
                break;

                default:
                    System.out.println("Opção inválida.");
                    return;
            }

            System.out.println("Candidatura atualizada com sucesso.");
            return;

        }
    }

    System.out.println("Candidatura não encontrada");
}

// EXCLUINDO
    public static void excluirCandidatura(){
        System.out.println("\n-------- Excluir Candidatura -------");
        listarCandidaturas();

        if(candidaturas.isEmpty()){
            return;
        }

        System.out.print("Digite o ID da candidatura: ");
        int id = lerInteiro();

        for(int i = 0; i < candidaturas.size(); i++) {
            if(candidaturas.get(i).getId() == id){
                candidaturas.remove(i);
            
        System.out.println("Candidatura excluída com sucesso.");
        return;
            }
        
        
        }
        System.out.println("Candidatura não encontrada.");
    }
    
}  
