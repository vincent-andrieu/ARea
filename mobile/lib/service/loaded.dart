import 'package:mobile/api/model/serviceFetch/serviceFetch.dart';
import 'package:mobile/service/IService.dart';

class loaded extends IService {
  serviceFecth data;
  loaded(bool src, this.data) : super(src);

  @override
  List<String> getAction() {
    List<String> list = [
      'None'
    ];

    for (var it in data.action) {
      list.add(it.type);
    }
    return list;
  }

  @override
  String getIcon() {
    return "assets/${data.label.toLowerCase()}.png";
  }

  @override
  String getName() {
    return data.label.toLowerCase();
  }

  @override
  List<String> getReaction() {
    List<String> list = [
      'None'
    ];

    for (var it in data.reaction) {
      list.add(it.type);
    }
    return list;
  }

  @override
  String getUrl() {
    return "/auth/${data.label.toLowerCase()}/mobile";
  }
}