package recrutamento;

public class Vaga {
    private int id;
    private String cargo;
    private String empresa;
    private String area;

    public Vaga(int id, String cargo, String empresa, String area){
        this.id = id;
        this.cargo = cargo;
        this.empresa = empresa;
        this.area = area;
    }
    public int getId(){
        return id;
    }
    public String getCargo(){
        return cargo;
    }
    public String getEmpresa(){
        return empresa;
    }
    public String getArea(){
        return area;
    }
  //  public void setId(){
  //      this.id = id;
    //}
    //public void setCargo(){
      //  this.cargo = cargo;
    //}
    //public void setEmpresa(){
      //  this.empresa = empresa;
    //}
    //public void setArea(){
      //  this.area = area;
    //}
    
    public void exibirVaga(){
        System.out.println("---------- DADOS DA VAGA ----------");
        System.out.println("ID da vaga: " + id);
        System.out.println("Cargo: " + cargo);
        System.out.println("Empresa: " + empresa);
        System.out.println("Área: " + area);
        System.out.println("------------------------------------");
        
    }

    
}
