import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/dropbox.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/rss.dart';
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/service/unsplash.dart';
import 'package:mobile/service/date.dart' as areaDate;

bool getValue(String key, Map<String, bool> oauth) {
  bool? value = oauth[key];

  if (value == null) {
    return false;
  }
  return value;
}

List<IService> getListService(Map<String, bool> oauth) {
  List<IService> list = [
    github(getValue("github", oauth)),
    twitch(getValue("twitch", oauth)),
    twitter(getValue("twitter", oauth)),
    discord(getValue("discord", oauth)),
    linkedin(getValue("linkedin", oauth)),
    notion(getValue("notion", oauth)),
    unsplash(getValue("unsplash", oauth)),
    dropbox(getValue("dropbox", oauth)),
    rss(getValue("rss", oauth)),
    areaDate.date(getValue("rss", oauth)),
  ];
  return list;
}