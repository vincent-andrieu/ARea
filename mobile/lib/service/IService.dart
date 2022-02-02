import 'dart:developer';

import 'package:flutter_web_auth/flutter_web_auth.dart';

class IService {
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
    return false;
  }

  Future<bool> getToken(String srv) async {
    try {
      log('getToken: Start');
      log(srv + getUrl());
      log("http://localhost:8080/auth/twitch/redirect");
      // final result = await FlutterWebAuth.authenticate(url: srv + getUrl(), callbackUrlScheme: "http://localhost:8080/auth/twitch/redirect");
      final result = await FlutterWebAuth.authenticate(url: srv + getUrl(), callbackUrlScheme: "area");
      log('getToken: Authenticate');
      log(result.toString());

      final token = Uri.parse(result).queryParameters['code'];
      log('getToken: END');

      log(token!);
      return token != null;
    } catch(e) {
      log(e.toString());
      return false;
    }
  }
}