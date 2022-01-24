import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/enum/authentication_e.dart';
import 'package:mobile/page/auth_page.dart';
import 'package:mobile/page/create_ifttt.dart';
import 'package:mobile/page/list_ifttt.dart';
import 'package:mobile/page/settings_page.dart';
import 'package:mobile/page/start_area.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    areaService api;
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: <String, WidgetBuilder>{
        '/': (BuildContext context) => const start_area(),
        '/SignIn': (BuildContext context) => auth_page(authentication_e.SIGN_IN),
        '/SignUp': (BuildContext context) => auth_page(authentication_e.SIGN_UP),
        '/Settings': (BuildContext context) => const settings_page(),
        '/Create': (BuildContext context) => const create_ifttt(),
        '/List': (BuildContext context) => const list_ifttt(),
      }
    );
  }
}