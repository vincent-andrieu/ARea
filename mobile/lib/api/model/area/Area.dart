import 'Action.dart';
import 'Reaction.dart';

class Area {
  String id;
  String token;
  Action trigger;
  Reaction consequence;

  Area(this.id, this.token, this.trigger, this.consequence);

  Area.fromJson(dynamic json)
      : id = json['_id'],
        token = json['token'],
        trigger = Action.fromJson(json['trigger']),
        consequence = Reaction.fromJson(json['consequence']);

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'token': token,
      'trigger': trigger.toJson(),
      'consequence': consequence.toJson()
    };
  }
}
