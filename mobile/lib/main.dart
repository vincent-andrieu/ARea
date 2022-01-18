import 'package:flutter/material.dart';
import 'package:mobile/enum/authentication_e.dart';
import 'package:mobile/page/auth_page.dart';
import 'package:mobile/page/create_ifttt.dart';
import 'package:mobile/page/settings_page.dart';
import 'package:mobile/page/start_area.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var authSignIn = auth_page(authentication_e.SIGN_IN);
    var authSignUp = auth_page(authentication_e.SIGN_UP);
    const settings = settings_page();
    const ifttt = create_ifttt();
    const area = start_area();

    return MaterialApp(
      home: Scaffold(
        body: Center(
          // child: area.createState().build(context)
          child: authSignUp.createState().build(context)
          // child: authSignIn.createState().build(context)
          // child: settings.createState().build(context)
          // child: ifttt.createState().build(context)
        ),
      ),
    );
  }
}