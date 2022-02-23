import 'package:mobile/service/IService.dart';

class rss extends IService {
  rss(bool src) : super(src);

  @override
  List<String> getAction() {
    return ['Rss entry', 'None'];
  }

  @override
  String getIcon() {
    return "assets/rss.png";
  }

  @override
  String getName() {
    return "rss";
  }

  @override
  List<String> getReaction() {
    return ['None'];
  }

  @override
  String getUrl() {
    return "";
  }
}
