import 'package:dio/dio.dart';

class CotacaoRepository {

  String cotacao;

  Uri url;

  Future<String> getCotacao() async{

    url = Uri.parse('https://economia.awesomeapi.com.br/all/BTC-BRL');

    Response response = await Dio().request(this.url.toString(),
                                    options: Options(headers: {"Accept": "application/json"}));

      var _cotacao = response.data['BTC']['ask'];      

      return _cotacao;

  } 

}