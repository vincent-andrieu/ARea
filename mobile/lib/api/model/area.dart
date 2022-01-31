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
  Action action = Action("", false);
  Reaction reaction = Reaction("");

  Area(String actionLabel, String reactionLabel) {
    action = Action(actionLabel, false);
    reaction = Reaction(reactionLabel);
  }

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