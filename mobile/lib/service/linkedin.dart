import 'package:mobile/service/IService.dart';

class linkedin extends IService {
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
    return "linkedin";
  }

  @override
  Map<String, String> getReaction() {
    // TODO: implement getReaction
    throw UnimplementedError();
  }

  @override
  String getUrl() {
    return "/auth/linkedin";
  }

  @override
  bool getConnexionState() {
    // TODO: implement getConnexionState
    throw UnimplementedError();
  }
}