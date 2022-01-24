import 'package:mobile/service/IService.dart';

class github implements IService {
  @override
  Map<String, String> getAction() {
    // TODO: implement getAction
    throw UnimplementedError();
  }

  @override
  String getIcon() {
    // TODO: implement getIcon
    throw UnimplementedError();
  }

  @override
  String getName() {
    return "github";
  }

  @override
  Map<String, String> getReaction() {
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
    throw UnimplementedError();
  }
}