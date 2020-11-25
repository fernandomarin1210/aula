import 'dart:io';

import 'package:banco_dados/models/contato.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ContatoPage extends StatefulWidget {

  final Contato contato;
  ContatoPage({this.contato});

  @override
  _ContatoPageState createState() => _ContatoPageState();
}

class _ContatoPageState extends State<ContatoPage> {

  final _nomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _nomeFocus = FocusNode();
  final _emailFocus = FocusNode();

  bool editado = false;
  Contato _editaContato;

  @override
  void initState(){
    super.initState();

    if (widget.contato == null){
      _editaContato = Contato(null,'','',null); 
    }else{
      _editaContato = Contato.fromMap(widget.contato.toMap());

      _nomeController.text = _editaContato.nome;
      _emailController.text = _editaContato.email;
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
                      //AssetImage("images/" + _editaContato.imagem) :
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
            TextField(
              controller: _nomeController,
              focusNode: _nomeFocus,
              decoration: InputDecoration(labelText: "Nome"),
              onChanged: (text){
                editado = true;
                setState(() {
                  _editaContato.nome = text;
                });
              },
            ),
            TextField(
              controller: _emailController,
              focusNode: _emailFocus,
              decoration: InputDecoration(labelText: "Email"),
              onChanged: (text){
                editado = true;
                _editaContato.email = text;
              }, // onChanged

              keyboardType: TextInputType.emailAddress,
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