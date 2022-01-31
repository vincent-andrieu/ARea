class Action {
  String label = "";
  bool cron = true;

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

  Reaction.fromJson(dynamic json)
      : label = json['label'];

  Map<String, dynamic> toJson() {
    return {
      'label': label,
    };
  }
}

class Area {
  Action action;
  Reaction reaction;

  Area.fromJson(dynamic json)
      : action = Action.fromJson(json['action']),
        reaction = Reaction.fromJson(json['reaction']);

  Map<String, dynamic> toJson() {
    return {
      'action': action.toJson(),
      'reaction': reaction.toJson()
    };
  }
}