import 'package:mobile/api/model/area/ActionType.dart';
import 'package:mobile/api/model/area/Parameter.dart';

class Action {
  ActionType type;
  List<Parameter> parameters;

  Action(this.type, this.parameters);

  Action.fromJson(dynamic json)
      : type = json['type'],
        parameters = json['parameters'];

  Map<String, dynamic> toJson() {
    return {
      'type': enumToString(type),
      'parameters': parameters,
    };
  }
}