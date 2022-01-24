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

  Map<String, String> getAction() {
    return {};
  }

  Map<String, String> getReaction() {
    return {};
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