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
      final result = await FlutterWebAuth.authenticate(
          url: srv + getUrl(), callbackUrlScheme: "area");

      var token = Uri.parse(result).queryParameters['code'];

      bool value = false;
      if (token != null) {
        value = await api.updateServiceToken(token, "/auth/${getName()}/redirect/mobile");
      } else {
        token = Uri.parse(result).queryParameters['oauth_token'];
        var verifier = Uri.parse(result).queryParameters['oauth_verifier'];

        value = await api.updateServiceTokenAndVerifier(token!, verifier!, "/auth/${getName()}/redirect/mobile");
      }

      if (value) {
        nowConnected();
      }
      return value;
    } catch (e) {
      log(e.toString());
      return false;
    }
  }

  Future<bool> addUserService(String srv, areaService api) async {
    try {
      var value = false;
      /*log("addUserService  -> START");
      final result = await FlutterWebAuth.authenticate(
          url: srv + getUrl(), callbackUrlScheme: "area");

      var token = Uri.parse(result).queryParameters['code'];

      bool value = false;
      if (token != null) {
        value = await api.addNewService(token, "/auth/${getName()}/mobile?token=$token"); // TODO
      } else {
        token = Uri.parse(result).queryParameters['oauth_token'];
        var verifier = Uri.parse(result).queryParameters['oauth_verifier'];

        value = await api.addNewServiceTokenAndVerifier(token!, verifier!, "/auth/${getName()}/redirect/mobile"); // TODO
      }*/

      if (value) {
        nowConnected();
      }
      return value;
    } catch (e) {
      log("addUserService -> ${e.toString()}");
      return false;
    }
  }

  Future<bool> disconnectService(String srv, areaService api) async {
    try {
      bool value = await api.disconnectService("/auth/disconnect/${getName()}");

      if (value) {
        connected = false;
      }
      return value;
    } catch (e) {
      log(e.toString());
      return false;
    }
  }

  void nowConnected() {
    connected = true;
  }

  Future<bool> none() async {
    return true;
  }
}
