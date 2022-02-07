import 'dart:developer';

import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/areaService.dart';

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

  Future<bool> getToken(String srv, areaService api) async {
    try {
      final result = await FlutterWebAuth.authenticate(url: srv + getUrl(), callbackUrlScheme: "area");

      final token = Uri.parse(result).queryParameters['code'];

      return await api.updateServiceToken(token!, "{$getUrl()}/setService"); // TODO EDIT ROUTE
    } catch(e) {
      log(e.toString());
      return false;
    }
  }
}