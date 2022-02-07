import 'package:mobile/service/IService.dart';

class dropbox extends IService {
  dropbox(bool src) : super(src);

  @override
  List<String> getAction() {
    return [];
  }

  @override
  String getIcon() {
    return "assets/dropbox.png";
  }

  @override
  String getName() {
    return "dropbox";
  }

  @override
  List<String> getReaction() {
    return [];
  }

  @override
  String getUrl() {
    return "/auth/dropbox";
  }
}