import 'package:mobile/service/IService.dart';

class linkedin extends IService {
  @override
  List<String> getAction() {
    return ['None'];
  }

  @override
  String getIcon() {
    return "assets/linkedin.png";
  }

  @override
  String getName() {
    return "linkedin";
  }

  @override
  List<String> getReaction() {
    return [
      'Publish post',
      'None'
    ];
  }

  @override
  String getUrl() {
    return "/auth/linkedin";
  }

  @override
  bool getConnexionState() {
    // TODO: implement getConnexionState
    return false;
  }
}