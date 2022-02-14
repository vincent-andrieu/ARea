import 'package:mobile/api/model/serviceFetch/configFecth.dart';

class serviceFecth {
  String label = "";
  bool haveAction = false;
  bool haveReaction = false;
  configFetch action = configFetch();
  configFetch reaction = configFetch();

  serviceFecth.fromJson(dynamic json)
      : label = json['label'],
        haveAction = json['haveAction'],
        haveReaction = json['haveReaction'],
        action = configFetch(),
        reaction = configFetch();
}