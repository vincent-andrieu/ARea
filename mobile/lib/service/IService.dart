import 'dart:developer';

import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:mobile/api/areaService.dart';

class IService {
  bool connected;
  IService(this.connected);

  String getName() {
    return "";
  }

  String getUrl() {
    return "";
  }

  String getIcon() {
    return "";
  }

  List<String> getParams() {
    return ['None'];
  }

  List<String> getAction() {
    return [];
  }

  List<String> getReaction() {
    return [];
  }

  bool getConnexionState() {
    return connected;
  }

  Future<bool> getToken(String srv, areaService api) async {
    try {
      final result = await FlutterWebAuth.authenticate(url: srv + getUrl(), callbackUrlScheme: "area");

      final token = Uri.parse(result).queryParameters['code'];

      bool value = await api.updateServiceToken(token!, "/auth/${getName()}/redirect/mobile");

      if (value) {
        nowConnected();
      }
      return value;
    } catch(e) {
      log(e.toString());
      return false;
    }
  }

  Future<bool> addUserService(String srv, areaService api) async {
    try {

      final result = await FlutterWebAuth.authenticate(url: srv + getUrl(), callbackUrlScheme: "area");

      final token = Uri.parse(result).queryParameters['code'];

      bool value = await api.addNewService(token!, "/auth/${getName()}/mobile?token=$token");

      if (value) {
        nowConnected();
      }
      return value;
    } catch(e) {
      log(e.toString());
      return false;
    }
  }

  void nowConnected() {
    connected = true;
  }
}