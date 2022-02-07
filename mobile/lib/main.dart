import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/enum/authentication_e.dart';
import 'package:mobile/page/auth_page.dart';
import 'package:mobile/page/create_ifttt.dart';
import 'package:mobile/page/edit_ifttt.dart';
import 'package:mobile/page/list_ifttt.dart';
import 'package:mobile/page/settings_page.dart';
import 'package:mobile/page/start_area.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/service/undefined.dart';

Map<String, WidgetBuilder> buildRouteApp() {
  areaService api = areaService("");

  Map<String, WidgetBuilder> route = {
    '/': (BuildContext context) => start_area(api),
    '/SignIn': (BuildContext context) => auth_page(authentication_e.SIGN_IN, api),
    '/SignUp': (BuildContext context) => auth_page(authentication_e.SIGN_UP, api),
    '/Settings': (BuildContext context) => settings_page(api),
    '/List': (BuildContext context) => list_ifttt(api),
    '/Create': (BuildContext context) => create_ifttt(api, undefined(false), undefined(false)),
    '/area': (BuildContext context) => edit_ifttt(api),
  };

  return route;
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: buildRouteApp()
    );
  }
}