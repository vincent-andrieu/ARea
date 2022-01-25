import 'package:mobile/service/IService.dart';

class twitter extends IService {
  @override
  List<String> getAction() {
    // TODO: implement getAction
    throw UnimplementedError();
  }

  @override
  String getIcon() {
    return "assets/twitter.png";
  }

  @override
  String getName() {
    return "twitter";
  }

  @override
  List<String> getReaction() {
    // TODO: implement getReaction
    throw UnimplementedError();
  }

  @override
  String getUrl() {
    return "/auth/twitter";
  }

  @override
  bool getConnexionState() {
    // TODO: implement getConnexionState
    return false;
  }
}