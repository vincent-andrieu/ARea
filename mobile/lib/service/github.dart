import 'package:mobile/service/IService.dart';

class github extends IService {
  @override
  List<String> getAction() {
    return [
      'New Issue',
      'New Pull Request',
      'None'
    ];
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
    return [
      'Create new Issue',
      'None'
    ];
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