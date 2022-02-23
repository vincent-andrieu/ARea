import 'package:mobile/service/IService.dart';

class undefined extends IService {
  undefined(bool src) : super(src);

  @override
  List<String> getAction() {
    return ['None'];
  }

  @override
  String getIcon() {
    return "";
  }

  @override
  String getName() {
    return "None";
  }

  @override
  List<String> getReaction() {
    return ['None'];
  }

  @override
  String getUrl() {
    return "";
  }

  @override
  List<String> getParams() {
    return ['None'];
  }
}
