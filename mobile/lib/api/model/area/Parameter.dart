import 'package:mobile/api/model/area/ParameterType.dart';

class Parameter {
  String name;
  ParameterType type;

  Parameter(this.name, this.type);

  Parameter.fromJson(dynamic json)
      : name = json['name'],
        type = stringToEnum(json['type']);

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'type': enumToString(type),
    };
  }
}
