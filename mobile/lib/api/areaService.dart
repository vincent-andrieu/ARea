import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/model/loginResponse.dart';
import 'dart:developer' as developer;

class areaService {
  late apiService api;

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
      await api.makeRequestGet<loginResponse>("/auth/login", {
        "username": user,
        "password": pass
      });
      // TODO remember user
      return true;
    } catch (e) {
      developer.log('Server failed invalid response');
      return false;
    }
  }

  bool createUserAndConnexion(String user, String pass) {
    try {
      // TODO remember user
      return true;
    } catch (e) {
      return false;
    }
  }

  void createIfttt() {
    // TODO
  }

  void deleteIfttt() {
    // TODO
  }

  void updateIfttt() {
    // TODO
  }

  void getListIfttt() {
    // TODO
  }

  void callForOAuth2() {
    // TODO
  }
}