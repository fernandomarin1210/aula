class Contato{
  int id;
  String nome;
  String email;
  String imagem;
  String rua;
  String bairro;
  String cep;

  Contato(this.id, this.nome, this.email, this.imagem, this.rua, this.bairro, this.cep);

  Map<String, dynamic> toMap(){
    var map = <String, dynamic>{
      'id':id,
      'nome':nome,
      'email':email,
      'imagem':imagem,
      'rua':rua,
      'bairro':bairro,
      'cep':cep
    };
    return map;
  }

  Contato.fromMap(Map<String,dynamic> map) {
    id = map['id'];
    nome = map['nome'];
    email = map['email'];
    imagem = map['imagem'];
    rua = map['rua'];
    bairro = map['bairro'];
    cep = map['cep'];
  }

  @override
  String toString(){
    return "Contato => (id: $id, nome: $nome, email: $email, imagem: $imagem, rua: $rua, bairro: $bairro, cep: $cep)";
  }

}