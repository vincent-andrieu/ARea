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

  Future<String> getToken() async {
    final result = await FlutterWebAuth.authenticate(url: getUrl(), callbackUrlScheme: "http");
    final token = Uri.parse(result).queryParameters['token'];

    return (token == null) ? "" : token;
  }
}