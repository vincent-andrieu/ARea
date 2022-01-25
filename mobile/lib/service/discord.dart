import 'package:mobile/service/IService.dart';

class discord extends IService {
  @override
  List<String> getAction() {
    // TODO: implement getAction
    throw UnimplementedError();
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
    // TODO: implement getReaction
    throw UnimplementedError();
  }

  @override
  String getUrl() {
    return "/auth/discord";
  }

  @override
  bool getConnexionState() {
    // TODO: implement getConnexionState
    return false;
  }
}