import 'package:mobile/api/model/serviceFetch/configFecth.dart';

class serviceFecth {
  String label = "";
  bool haveAction = false;
  bool haveReaction = false;
  List<configFetch> action = [];
  List<configFetch> reaction = [];

  serviceFecth();

  serviceFecth.fromJson(dynamic json)
      : label = json['label'],
        haveAction = json['haveAction'],
        haveReaction = json['haveReaction'],
        action = [],
        reaction = [];
}

serviceFecth getFromType(List<serviceFecth> list, String name) {
  String data = name.toUpperCase();

  for (var it in list) {
    if (it.label == data) {
      return it;
    }
  }
  throw "No service: $name was found";
}
