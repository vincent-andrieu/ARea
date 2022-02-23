class actionType {
  String label = "";
  bool cron = false;

  actionType(this.label, this.cron);
}

class reactionType {
  String label = "";

  reactionType(this.label);
}

class iftttRequest {
  late actionType action;
  late reactionType reaction;

  iftttRequest(String action, bool actionCron, String reaction) {
    this.action = actionType(action, actionCron);
    this.reaction = reactionType(reaction);
  }
}
