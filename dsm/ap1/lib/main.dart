import 'package:flutter/material.dart';

void main() => runApp(
      MaterialApp(
        home: Home(),
        debugShowCheckedModeBanner: false,
      ),
    );

class Home extends StatefulWidget {
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  TextEditingController _gasolinaController = TextEditingController();
  TextEditingController _alcoolController = TextEditingController();
  String _resultado;
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    resetFields();
  }

  void resetFields() {
    _gasolinaController.text = '';
    _alcoolController.text = '';
    setState(() {
      _resultado = '';
    });
  }

  void processa() {
    double gasolina = double.parse(_gasolinaController.text);
    double alcool = double.parse(_alcoolController.text);
    double fator = (alcool / gasolina);
    setState(() {
      _resultado = "Fator ${fator.toStringAsPrecision(2)}\n";
      if (fator < 0.7)
        _resultado += "Vantagem: Alcool";
      else
        _resultado += "Vantagem: Gasolina";
    });
  }

  Widget buildProcessButton() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 10.0),
      child: RaisedButton(
        onPressed: () {
          if (_formKey.currentState.validate()) {
            processa();
          }
        },
        child: Text("Processar", style: TextStyle(color: Colors.white)),
        color: Colors.orange,
      ),
    );
  }

    Widget buildLimparButton() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 0.0),
      child: RaisedButton(
        onPressed: () {
            resetFields();
        },
        child: Text("Limpar Formulário", style: TextStyle(color: Colors.white)),
        color: Colors.red,
      ),
    );
  }

  Widget buildTextResult() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 30.0),
      child: Text(
        _resultado,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 20.0,
          color: Colors.green,
        ),
      ),
    );
  }

  Widget imagem() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 30.0),
         child: 
              Image.asset(
                'img/combustivel.png',
              ),
    );
   } 

  Form buildForm() {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          imagem(),
          buildTextFormField(
              label: "Preço da Gasolina: ",
              error: "Informe p preço da gasolina",
              controller: _gasolinaController,
              focus: true),
          buildTextFormField(
              label: "Preço do Alcool:",
              error: "Informe o preço do alcool",
              controller: _alcoolController,
              focus: false),
          buildTextResult(),
          buildProcessButton(),
          buildLimparButton(),
        ],
      ),
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
        appBar: buildAppBar(),
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
            padding: EdgeInsets.all(20.0), child: buildForm()));
  }

  AppBar buildAppBar() {
    return AppBar(
      title: Text("Gasolina ou Alcool?"),
      backgroundColor: Colors.blue,
      actions: <Widget>[
        IconButton(
          icon: Icon(Icons.refresh),
          onPressed: () {
            resetFields(); //resetFields;
          },
        )
      ],
    );
  }

  TextFormField buildTextFormField(
      {TextEditingController controller, String error, String label, bool focus}) {
    return TextFormField(
      style: TextStyle(fontSize: 20.0,),
      keyboardType: TextInputType.number,
      decoration: InputDecoration(labelText: label),
      controller: controller,
      autofocus: focus,
      validator: (text) {
        return text.isEmpty ? error : null;
      },
    );
  }
} 