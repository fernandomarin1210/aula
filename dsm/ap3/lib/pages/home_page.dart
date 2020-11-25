import 'dart:io';
import 'dart:ui';
import 'package:banco_dados/helpers/database_helper.dart';
import 'package:banco_dados/models/contato.dart';
import 'package:banco_dados/pages/contato_page.dart';
import 'package:flutter/material.dart';
import 'package:sqflite/sqflite.dart';
import 'package:dio/dio.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  DatabaseHelper db = DatabaseHelper();
  List<Contato> contatos = List<Contato>();
  var cotacao;

  @override
  void initState(){
    super.initState();

    _exibeTodosContatos();
    _buscaCotacao();

  }

  void _exibeTodosContatos(){
    db.getContatos().then((lista){
      setState(() {
        contatos = lista;
      });
    });
  }

  void _buscaCotacao() {

      _getCotacao().then((_cotacao){
        setState(() {        
          cotacao = _cotacao;
        });
      });

  }

  Uri url;

  Future<String> _getCotacao() async{

    url = Uri.parse('https://economia.awesomeapi.com.br/all/BTC-BRL');

    Response response = await Dio().request(this.url.toString(),
                                    options: Options(headers: {"Accept": "application/json"}));


      var _cotacao = response.data['BTC']['ask'];      

      return _cotacao;

  } 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Agenda"),
        backgroundColor: Colors.indigo,
        centerTitle: true,
        actions: <Widget>[],
      ),
      backgroundColor: Colors.white,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _exibeContatoPage();
        },
        child: Icon(Icons.add),
      ),
      body: Padding(
                padding: const EdgeInsets.only(
                  left: 2,
                  bottom: 2,
                  top: 2
                ),
              child: Column(
                children: <Widget>[
                  SizedBox(height: 10),
                    Expanded(
                      child:ListView.builder(
                        scrollDirection: Axis.vertical,
                        padding: EdgeInsets.all(10.0),
                        itemCount: contatos.length,
                        itemBuilder: (context,index) {
                          return _listaContatos(context, index);
                        },
                      ),
                    ),
                    SizedBox(height: 20,),
                    Container(
      height: 50,
                  color: Colors.yellow[900],
            padding: EdgeInsets.all(16),
            width: 600,
      child:  Text('BTC: RS ' + (cotacao != null ? cotacao : ''),
                     style: TextStyle(color: Colors.white, 
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                            ),
                ),
    ),
                ],
              ),     
      ),
      
    );
  }

  _listaContatos(BuildContext context, int index){
    return GestureDetector(
      child: Card(
        child: Padding(padding: EdgeInsets.all(10.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Container(
                width: 70.0,
                height: 70.0,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  image: DecorationImage(
                    image: contatos[index].imagem != null ?
                      FileImage(File(contatos[index].imagem)) :
                      AssetImage("images/pessoa_sem_foto.jpg"),
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(left: 10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(contatos[index].nome ?? "",
                    style: TextStyle(fontSize: 20),),
                    Text(contatos[index].email ?? "",
                    style: TextStyle(fontSize: 15),),
                  ],
                ),
              ),
              IconButton(
                icon: Icon(Icons.delete,
                           color: Colors.red),
                onPressed: (){
                  _mensagemConfirma(context, contatos[index].id, index, "Exclusão!","Confirma exclusão do contato?");
                }
              ),
            ],
          )
        ),
      ),
      onTap: (){
        _exibeContatoPage(contato: contatos[index]);
      },
    );
  }

  void _exibeContatoPage({Contato contato}) async{
    final contatoRecebido = await Navigator.push(context, 
                   MaterialPageRoute(builder: (context)=> ContatoPage(contato:contato)
                   ),
    );

    if(contatoRecebido != null){
      if(contato != null){
        await db.updateContato(contatoRecebido);
      }else{
        await db.insertContato(contatoRecebido);
      }
      _exibeTodosContatos();
    }

  }

  void _mensagemConfirma(BuildContext context, int contatoid, index, String titulo, String mensagem){
    showDialog(
      context: context,
      builder: (BuildContext context){
        return AlertDialog(
          title: Text(titulo),
          content: Text(mensagem),
          actions: <Widget>[
            FlatButton(
              child: Text("Cancelar"),
              onPressed: (){
                Navigator.of(context).pop();
              }, 
            ),
            FlatButton(
              child: Text("Excluir"),
              onPressed: (){
                setState(() {
                  contatos.removeAt(index);
                  db.deleteContato(contatoid);
                });
                Navigator.of(context).pop();
              }, 
            ),
          ],
        );
      }
    );
  }

}

