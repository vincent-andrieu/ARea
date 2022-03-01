import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/enum/authentication_e.dart';
import 'package:mobile/page/auth_page.dart';
import 'package:mobile/page/create_ifttt.dart';
import 'package:mobile/page/edit_ifttt.dart';
import 'package:mobile/page/list_ifttt.dart';
import 'package:mobile/page/settings_page.dart';
import 'package:mobile/page/start_area.dart';

Map<String, WidgetBuilder> buildRouteApp() {
  areaService api = areaService("");

  Map<String, WidgetBuilder> route = {
    '/': (BuildContext context) => start_area(api),
    '/SignIn': (BuildContext context) =>
        auth_page(authentication_e.SIGN_IN, api),
    '/SignUp': (BuildContext context) =>
        auth_page(authentication_e.SIGN_UP, api),
    '/Settings': (BuildContext context) => settings_page(api),
    '/List': (BuildContext context) => list_ifttt(api),
    '/Create': (BuildContext context) => create_ifttt(api),
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
    // SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: [SystemUiOverlay.bottom]);
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
    return MaterialApp(
        debugShowCheckedModeBanner: false, routes: buildRouteApp());
  }
}
