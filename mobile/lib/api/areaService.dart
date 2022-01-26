import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/model/loginRequest.dart';
import 'package:mobile/api/model/loginResponse.dart';
import 'dart:developer' as developer;

import 'model/registerResponse.dart';

class areaService {
  late apiService api;
  String token = "";

  areaService(String url) {
    if (url.isNotEmpty) {
      api = apiService(url);
    }
  }

  void initConnexion(String url) {
    api = apiService(url);
  }

  Future<bool> tryConnexion(String user, String pass) async {
    try {
      loginResponse response = await api.makeRequestPost<loginResponse, loginRequest>("/auth/login", loginRequest(user, pass));
      token = response.token;
      return true;
    } catch (e) {
      developer.log('tryConnexion: Server failed invalid response');
      return false;
    }
  }

  Future<bool> createUserAndConnexion(String user, String pass) async {
    try {
      registerResponse response = await api.makeRequestPost<registerResponse, loginRequest>("/auth/register", loginRequest(user, pass));
      token = response.token;
      return true;
    } catch (e) {
      developer.log('createUserAndConnexion: Server failed invalid response');
      return false;
    }
  }

  Future<bool> createIfttt() async {
    // TODO
    return false;
  }

  Future<bool> deleteIfttt() async {
    // TODO
    return false;
  }

  Future<bool> updateIfttt() async {
    // TODO
    return false;
  }

  void getListIfttt() {
    // TODO
  }

  Future<String> callForOAuth2(String service) async {
    // TODO
    return "";
  }
}