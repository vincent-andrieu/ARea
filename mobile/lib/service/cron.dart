import 'package:mobile/service/IService.dart';

class cron extends IService {
  cron(bool src) : super(src);

  @override
  List<String> getAction() {
    return ['Date', 'Date time', 'None'];
  }

  @override
  String getIcon() {
    return "assets/cron.png";
  }

  @override
  String getName() {
    return "cron";
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
