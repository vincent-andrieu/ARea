import 'package:mobile/service/IService.dart';

class github extends IService {
  @override
  List<String> getAction() {
    // TODO: implement getAction
    throw UnimplementedError();
  }

  @override
  String getIcon() {
    return "assets/github.png";
  }

  @override
  String getName() {
    return "github";
  }

  @override
  List<String> getReaction() {
    // TODO: implement getReaction
    throw UnimplementedError();
  }

  @override
  String getUrl() {
    return "/auth/github";
  }

  @override
  bool getConnexionState() {
    // TODO: implement getConnexionState
    return false;
  }
}