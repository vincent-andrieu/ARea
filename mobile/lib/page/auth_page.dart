import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class auth_page extends StatefulWidget {
  const auth_page() : super();

  @override
  State<auth_page> createState() => _auth_pageState();
}

class _auth_pageState extends State<auth_page> {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
              'Sign in',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.fourth,
                fontSize: 30
              ),
              textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}