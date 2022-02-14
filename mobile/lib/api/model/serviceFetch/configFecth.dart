import 'package:mobile/api/model/serviceFetch/parameterFetch.dart';

class configFetch {
  String type = "";
  String service = "";
  List<parameterFetch> parameters = [];

  configFetch();

  configFetch.fromJson(dynamic json)
      : type = json['type'],
        service = json['service'],
        parameters = List.from(json['parameters']);
}