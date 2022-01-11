import 'package:flutter/material.dart';
import 'package:mobile/page/auth_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const tmp = auth_page();

    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: tmp.createState().build(context)
        ),
      ),
    );
  }
}