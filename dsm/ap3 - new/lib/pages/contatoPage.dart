import 'dart:io';
import 'package:banco_dados/models/contatoModel.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:banco_dados/models/cepModel.dart';
import 'package:banco_dados/repositories/cepRepository.dart';

class ContatoPage extends StatefulWidget {

  final Contato contato;
  ContatoPage({this.contato});

  @override
  _ContatoPageState createState() => _ContatoPageState();
}

class _ContatoPageState extends State<ContatoPage> {

  final _nomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _ruaController = TextEditingController();
  final _bairroController = TextEditingController();
  final _cepController = TextEditingController();
  final _nomeFocus = FocusNode();
  final _emailFocus = FocusNode();
  final _ruaFocus = FocusNode();
  final _bairroFocus = FocusNode();
  final _cepFocus = FocusNode();

  CEP cep = CEP();

  Uri url;

  buscaCep() async{

    CepRepository().getCep(_editaContato.cep.toString()).then((_cep){
        setState(() {        
          cep = _cep;
          _ruaController.text = cep.logradouro;
          _bairroController.text = cep.bairro;
          _editaContato.rua = _ruaController.text;
          _editaContato.bairro = _bairroController.text;
        });
      });
  } 

  bool editado = false;
  Contato _editaContato;

  @override
  void initState(){
    super.initState();

    if (widget.contato == null){
      _editaContato = Contato(null,'','',null, null, null, null); 
    }else{
      _editaContato = Contato.fromMap(widget.contato.toMap());

      _nomeController.text = _editaContato.nome;
      _emailController.text = _editaContato.email;
      _ruaController.text = _editaContato.rua;
      _bairroController.text = _editaContato.bairro;
      _cepController.text = _editaContato.cep;
    }
  }

  @override
  Widget build(BuildContext context) {

    var container = Container(
                width: 70.0,
                height: 70.0,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  image: DecorationImage(
                    image: _editaContato.imagem != null ?
                      FileImage(File(_editaContato.imagem)) :  // imagem carregada no banco
                      AssetImage("images/pessoa_sem_foto.jpg"),
                  ),
                ),
              );
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.indigo,
        title: Text(_editaContato.nome == '' ? "Novo Contato" :
                    _editaContato.nome),
        centerTitle: true,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          if ((_editaContato.nome != null && _editaContato.nome.isNotEmpty)
              && (_editaContato.email != null && _editaContato.email.isNotEmpty)){
            Navigator.pop(context, _editaContato);
          }else{
            if (_editaContato.nome == null || _editaContato.nome.isEmpty){
              _exibeAviso("Atenção","Informe o nome do contato!");
              FocusScope.of(context).requestFocus(_nomeFocus);
            }else{
              if (_editaContato.email == null || _editaContato.email.isEmpty){
                _exibeAviso("Atenção","Informe o email do contato!");
                FocusScope.of(context).requestFocus(_emailFocus);
              }
            }
          }
        },
        child: Icon(Icons.save),
        backgroundColor: Colors.indigo,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(10.0),
        child: Column(
          children: <Widget>[
            GestureDetector(
              child: container,
              onTap: (){
                ImagePicker.pickImage(source:ImageSource.gallery).then((file){
                  if (file == null) return;
                    setState(() {
                      _editaContato.imagem = file.path;
                    });
                });
              },
            ),
            Text(_editaContato.nome == '' ? "Clique na imagem para adicionar" :
                 "Clique na imagem para alterar"),
            SizedBox(height: 20),
            TextField(
              controller: _nomeController,
              focusNode: _nomeFocus,
              decoration: 
                InputDecoration(
                  labelText: "Nome",
                  hintText: "Digite o nome",
                  border: OutlineInputBorder(),  
                ),
              onChanged: (text){
                editado = true;
                setState(() {
                  _editaContato.nome = text;
                });
              },
            ),
            SizedBox(height: 10),
            TextField(
              controller: _emailController,
              focusNode: _emailFocus,
              decoration: 
                InputDecoration(
                  labelText: "Email",
                  hintText: "Digite o email",
                  border: OutlineInputBorder(),  
                ),
              onChanged: (text){
                editado = true;
                _editaContato.email = text;
              }, // onChanged
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: 10),
            TextField(
              controller: _cepController,
              focusNode: _cepFocus,
              buildCounter: (BuildContext context, {int currentLength, int maxLength, bool isFocused}) => null,
              decoration: 
                InputDecoration(
                  labelText: "CEP",
                  hintText: "Digite o cep",
                  border: OutlineInputBorder(),
                  suffixIcon: IconButton(
                    icon: Icon(Icons.search),
                    onPressed: (){
                       editado = true;
                       buscaCep();
                       FocusScope.of(context).requestFocus(_ruaFocus);
                    },
                  )
                ),
              onEditingComplete: (){
                       editado = true;
                       buscaCep();
                       FocusScope.of(context).requestFocus(_ruaFocus);
                    },
              onChanged: (text){
                editado = true;
                setState(() {
                  _editaContato.cep = text;
                });
              },
              keyboardType: TextInputType.number,
              maxLength: 8,
            ),
            SizedBox(height: 10),
            TextField(
              controller: _ruaController,
              focusNode: _ruaFocus,
              decoration: 
                InputDecoration(
                  labelText: "Rua",
                  hintText: "Digite a rua",
                  border: OutlineInputBorder(),  
                ),
              onChanged: (text){
                editado = true;
                setState(() {
                  _editaContato.rua = text;
                });
              },
            ),
            SizedBox(height: 10),
            TextField(
              controller: _bairroController,
              focusNode: _bairroFocus,
              decoration: 
                InputDecoration(
                  labelText: "Bairro",
                  hintText: "Digite o bairro",
                  border: OutlineInputBorder(),  
                ),
              onChanged: (text){
                editado = true;
                setState(() {
                  _editaContato.bairro = text;
                });
              },
            ),
          ],)
      ),
    );
  }

  void _exibeAviso(String titulo, String mensagem){
    showDialog(
      context: context,
      builder: (BuildContext context){
        return AlertDialog(
          title: new Text(titulo),
          content: new Text(mensagem),
          actions: <Widget>[
            new FlatButton(
              child: new Text("Fechar"),
              onPressed: (){
                Navigator.of(context).pop();
              }, 
            ),
          ],
        );
      }
    );
  }

}