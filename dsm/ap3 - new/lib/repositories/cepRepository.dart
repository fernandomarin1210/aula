import 'package:dio/dio.dart';
import 'package:banco_dados/models/cepModel.dart';
import 'package:dio/dio.dart';

class CepRepository {

  Uri url;

  getCep(String cep_param) async{

    url = Uri.parse('https://viacep.com.br/ws/' + cep_param + '/json/');

    Response response = await Dio().request(this.url.toString(),
                                    options: Options(headers: {"Accept": "application/json"}));

    var cep = CEP.fromJson(response.data);

    return cep;

  } 

}
