import 'package:mobile/service/IService.dart';

class notion extends IService {
  notion(bool src) : super(src);

  @override
  List<String> getAction() {
    return ['None'];
  }

  @override
  String getIcon() {
    return "assets/notion.png";
  }

  @override
  String getName() {
    return "notion";
  }

  @override
  List<String> getReaction() {
    return ['Update Notion Database', 'None'];
  }

  @override
  String getUrl() {
    return "/auth/notion?mobile=true";
  }
}
