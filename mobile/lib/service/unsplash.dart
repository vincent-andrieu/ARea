import 'package:mobile/service/IService.dart';

class unsplash extends IService {
  unsplash(bool src) : super(src);

  @override
  List<String> getAction() {
    return ["None"];
  }

  @override
  String getIcon() {
    return "assets/unsplash.png";
  }

  @override
  String getName() {
    return "unsplash";
  }

  @override
  List<String> getReaction() {
    return ["None"];
  }

  @override
  String getUrl() {
    return "/auth/unsplash/mobile";
  }
}