import 'package:mobile/service/IService.dart';

class twitch extends IService {
  twitch(bool src) : super(src);

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
}