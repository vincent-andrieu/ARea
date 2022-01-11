import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

void callbackSignIn() {
  // TODO FILL THIS
}

void callbackSignUpMode() {
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
                  color: color_list.third,
                  fontSize: 20
              ),
          ),
        ),
        additionnal_connexion_widget(context),
        end_page_widget(context)
      ],
    );
  }

  Widget end_page_widget(BuildContext context) {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        height: 100,
        color: color_list.secondary,
        child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
                const Text(
                  'Don’t have an account yet?',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: color_list.fourth,
                      fontSize: 10
                  ),
                ),
                ElevatedButton(
                  onPressed: callbackSignUpMode,
                  style: ElevatedButton.styleFrom(
                      primary: color_list.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5.0),
                      )
                  ),
                  child: const Text(
                    'Sign up',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.third,
                        fontSize: 10
                    ),
                  ),
                ),
            ]
        ),
      ),
    );
  }

  Widget additionnal_connexion_widget(BuildContext context) {
    return Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          button_image_widget(context, 'Connection with', 'assets/discord.png', () {}),
          button_image_widget(context, 'Connection with', 'assets/youtube.png', () {}),
          button_image_widget(context, 'Connection with', 'assets/google.png', () {})
        ]
    );
  }

  Widget button_image_widget(BuildContext context, String desc, String asset, void Function()? callback) {
    return ElevatedButton(
      onPressed: callback,
      style: ElevatedButton.styleFrom(
          primary: color_list.primary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5.0),
          )
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(
            desc,
            style: const TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.third,
                fontSize: 10
            ),
          ),
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage(asset),
                    fit: BoxFit.fill
                )
            ),
          )
        ],
      )
    );
  }
}