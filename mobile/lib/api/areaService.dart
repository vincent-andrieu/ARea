import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/model/loginResponse.dart';

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

  bool tryConnexion(String user, String pass) {
    try {
      api.makeRequestGet<loginResponse>("/auth/login", {
        "username": user,
        "password": pass
      });
      // TODO remember user
      return true;
    } catch (e) {
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
}