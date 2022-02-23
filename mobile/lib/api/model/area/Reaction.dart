import 'package:mobile/api/model/area/Parameter.dart';
import 'ReactionType.dart';

class Reaction {
  String type;
  List<Parameter> parameters;

  Reaction(this.type, this.parameters);

  Reaction.fromJson(dynamic json)
      : type = json['type'],
        parameters = json['parameters'];

  Map<String, dynamic> toJson() {
    return {
      'type': type,
      'parameters': parameters,
    };
  }
}
