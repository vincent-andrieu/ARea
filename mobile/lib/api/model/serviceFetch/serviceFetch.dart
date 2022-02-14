import 'package:mobile/api/model/serviceFetch/configFecth.dart';

class serviceFecth {
  String label = "";
  bool haveAction = false;
  bool haveReaction = false;
  configFetch action = configFetch();
  configFetch reaction = configFetch();

  serviceFecth();

  serviceFecth.fromJson(dynamic json)
      : label = json['label'],
        haveAction = json['haveAction'],
        haveReaction = json['haveReaction'],
        action = configFetch(),
        reaction = configFetch();
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