import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/model/loginResponse.dart';

class areaService {
  late apiService api;

  areaService(String url) {
    api = apiService(url);
  }

  bool tryConnection(String user, String pass) {
    try {
      api.makeRequestGet<loginResponse>("/auth/login", {
        "username": user,
        "password": pass
      });
      return true;
    } catch (e) {
      return false;
    }
    return false;
  }
}