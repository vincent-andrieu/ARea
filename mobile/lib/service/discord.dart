import 'package:mobile/service/IService.dart';

class discord extends IService {
  bool connected;
  discord(this.connected);

  @override
  List<String> getAction() {
    return [
      'New message on group',
      'None'
    ];
  }

  @override
  String getIcon() {
    return "assets/discord.png";
  }

  @override
  String getName() {
    return "discord";
  }

  @override
  List<String> getReaction() {
    return [
      'Send message',
      'None'
    ];
  }

  @override
  String getUrl() {
    return "/auth/discord";
  }

  @override
  bool getConnexionState() {
    return connected;
  }
}