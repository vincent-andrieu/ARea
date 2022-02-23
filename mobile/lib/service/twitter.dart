import 'package:mobile/service/IService.dart';

class twitter extends IService {
  twitter(bool src) : super(src);

  @override
  List<String> getAction() {
    return ['On new tweet', 'None'];
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
    return ['Make a tweet', 'Change Banner', 'Update profile image', 'None'];
  }

  @override
  String getUrl() {
    return "/auth/twitter/mobile";
  }
}
