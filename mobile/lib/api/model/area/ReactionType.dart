enum ReactionType {
  TWITTER_MSG,
  TWITTER_BANNER,
  TWITTER_PP,
  LINKEDIN_MSG,
  DISCORD_MSG,
  GITHUB_ISSUE,
  NOTION_MSG,
  DROPBOX_UPLOAD,
  UNSPLASH,
}

String enumToString(ReactionType type) {
  Map<ReactionType, String> map = {
    ReactionType.TWITTER_MSG: "TWITTER_MSG",
    ReactionType.TWITTER_BANNER: "TWITTER_BANNER",
    ReactionType.TWITTER_PP: "TWITTER_PP",
    ReactionType.LINKEDIN_MSG: "LINKEDIN_MSG",
    ReactionType.DISCORD_MSG: "DISCORD_MSG",
    ReactionType.GITHUB_ISSUE: "GITHUB_ISSUE",
    ReactionType.NOTION_MSG: "NOTION_MSG",
    ReactionType.DROPBOX_UPLOAD: "DROPBOX_UPLOAD",
    ReactionType.UNSPLASH: "UNSPLASH"
  };
  return map[type]!;
}

ReactionType stringToEnum(String token) {
  Map<String, ReactionType> map = {
    "TWITTER_MSG": ReactionType.TWITTER_MSG,
    "TWITTER_BANNER": ReactionType.TWITTER_BANNER,
    "TWITTER_PP": ReactionType.TWITTER_PP,
    "LINKEDIN_MSG": ReactionType.LINKEDIN_MSG,
    "DISCORD_MSG": ReactionType.DISCORD_MSG,
    "GITHUB_ISSUE": ReactionType.GITHUB_ISSUE,
    "NOTION_MSG": ReactionType.NOTION_MSG,
    "DROPBOX_UPLOAD": ReactionType.DROPBOX_UPLOAD,
    "UNSPLASH": ReactionType.UNSPLASH,
  };
  return map[token]!;
}