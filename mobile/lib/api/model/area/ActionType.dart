import 'dart:developer';

enum ActionType {
  CRON,
  DATETIME,
  TWITCH_STREAM,
  TWITTER_MSG,
  RSS_ENTRY,
  GITHUB_ISSUE,
  GITHUB_PULL_REQ,
  DISCORD_MSG,
  UNSPLASH_POST,
  UNSPLASH_RANDOM_POST,
}

String enumToString(ActionType type) {
  Map<ActionType, String> map = {
    ActionType.CRON: "CRON",
    ActionType.DATETIME: "DATETIME",
    ActionType.TWITCH_STREAM: "TWITCH_STREAM",
    ActionType.TWITTER_MSG: "TWITTER_MSG",
    ActionType.RSS_ENTRY: "RSS_ENTRY",
    ActionType.GITHUB_ISSUE: "GITHUB_ISSUE",
    ActionType.GITHUB_PULL_REQ: "GITHUB_PULL_REQ",
    ActionType.DISCORD_MSG: "DISCORD_MSG",
    ActionType.UNSPLASH_POST: "UNSPLASH_POST",
    ActionType.UNSPLASH_RANDOM_POST: "UNSPLASH_RANDOM_POST",
  };
  return map[type]!;
}

ActionType stringToEnum(String token) {
  Map<String, ActionType> map = {
    "CRON": ActionType.CRON,
    "DATETIME": ActionType.DATETIME,
    "TWITCH_STREAM": ActionType.TWITCH_STREAM,
    "TWITTER_MSG": ActionType.TWITTER_MSG,
    "RSS_ENTRY": ActionType.RSS_ENTRY,
    "GITHUB_ISSUE": ActionType.GITHUB_ISSUE,
    "GITHUB_PULL_REQ": ActionType.GITHUB_PULL_REQ,
    "DISCORD_MSG": ActionType.DISCORD_MSG,
    "UNSPLASH_POST": ActionType.UNSPLASH_POST,
    "UNSPLASH_RANDOM_POST": ActionType.UNSPLASH_RANDOM_POST,
  };
  return map[token]!;
}