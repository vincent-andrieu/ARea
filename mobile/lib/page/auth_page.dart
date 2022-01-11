import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

void callbackSignIn() {
  // TODO FILL THIS
}

class auth_page extends StatefulWidget {
  const auth_page() : super();

  @override
  State<auth_page> createState() => _auth_pageState();
}

class _auth_pageState extends State<auth_page> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        const Text(
          'Sign in',
          style: TextStyle(
              fontWeight: FontWeight.bold,
              color: color_list.fourth,
              fontSize: 30
          ),
          textAlign: TextAlign.center,
        ),
        TextField(
          decoration: InputDecoration(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.0)
            ),
            hintText: 'Enter your Email address',
            labelText: "Email",
            labelStyle: const TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.fourth,
            )
          ),
        ),
        TextField(
          decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0)
              ),
              hintText: 'Enter your password',
              labelText: "Password",
              labelStyle: const TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.fourth,
              )
          ),
        ),
        ElevatedButton(
          onPressed: callbackSignIn,
          style: ElevatedButton.styleFrom(
            primary: color_list.primary,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            )
          ),
          child: const Text(
              'Sign in',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 20
              ),
          ),
        ),
      ],
    );
  }
}