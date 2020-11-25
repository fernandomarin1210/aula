import 'package:dio/dio.dart';


class CustomDio{

  var _dio;

  CustomDio(){

    _dio = Dio();

  }

  CustomDio.withAuthentication(){

    _dio = Dio();
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: _onRequest, onResponse: _onResponse, onError: _onError));
  
  }

  Dio get instance => _dio;

  _onRequest(RequestOptions options){

    var token = "bf4486b1a2304d1fb93a91eb2a5d76f7";
    options.headers['Authorization'] = token;

  }

  _onError(DioError e){
    return e;
  }

  _onResponse(Response e){
    print('############# Response log');
    print(e.data);
    print('############# Response log');
  }

}