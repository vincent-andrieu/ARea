import 'package:mobile/service/IService.dart';

class twitch extends IService {
  bool connected;
  twitch(this.connected);

  @override
  List<String> getAction() {
    return [
      'New stream started',
      'None'
    ];
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
    return ['None'];
  }

  @override
  String getUrl() {
    return "/auth/twitch";
  }

  @override
  bool getConnexionState() {
    return connected;
  }
}