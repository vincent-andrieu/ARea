import 'package:mobile/service/IService.dart';

class twitch extends IService {
  @override
  List<String> getAction() {
    // TODO: implement getAction
    throw UnimplementedError();
  }

  @override
  String getIcon() {
    return "assets/twitch.png";
  }

  @override
  String getName() {
    return "twitch";
  }

  @override
  List<String> getReaction() {
    // TODO: implement getReaction
    throw UnimplementedError();
  }

  @override
  String getUrl() {
    return "/auth/twitch";
  }

  @override
  bool getConnexionState() {
    // TODO: implement getConnexionState
    return false;
  }
}