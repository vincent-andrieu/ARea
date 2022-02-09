import 'package:mobile/service/IService.dart';

class date extends IService {
  date(bool src) : super(src);

  @override
  List<String> getAction() {
    return [
      'Date',
      'Date time',
      'None'
    ];
  }

  @override
  String getIcon() {
    return "assets/date.png";
  }

  @override
  String getName() {
    return "date";
  }

  @override
  List<String> getReaction() {
    return [
      'None'
    ];
  }

  @override
  String getUrl() {
    return "";
  }
}