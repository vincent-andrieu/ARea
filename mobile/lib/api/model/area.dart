class Action {
  String label = "";
  bool cron = true;

  Action(this.label, this.cron);

  Action.fromJson(dynamic json)
      : label = json['label'],
        cron = json['cron'];

  Map<String, dynamic> toJson() {
    return {
      'label': label,
      'cron': cron
    };
  }
}

class Reaction {
  String label = "";

  Reaction(this.label);

  Reaction.fromJson(dynamic json)
      : label = json['label'];

  Map<String, dynamic> toJson() {
    return {
      'label': label,
    };
  }
}

class Area {
  String id = "";
  String token = "";
  Action action = Action("", false);
  Reaction reaction = Reaction("");

  Area(this.id, String actionLabel, String reactionLabel, this.token) {
    action = Action(actionLabel, false);
    reaction = Reaction(reactionLabel);
  }

  Area.fromJson(dynamic json)
      : id = json['_id'],
        token = json['token'],
        action = Action.fromJson(json['action']),
        reaction = Reaction.fromJson(json['reaction']);

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'token': token,
      'action': action.toJson(),
      'reaction': reaction.toJson()
    };
  }
}