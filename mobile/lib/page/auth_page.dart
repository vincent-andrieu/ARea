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
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        const Padding(
            padding: EdgeInsets.only(top: 40.0)
        ),
        const Text(
          'Sign in',
          style: TextStyle(
              fontWeight: FontWeight.bold,
              color: color_list.fourth,
              fontSize: 50
          ),
          textAlign: TextAlign.center,
        ),
        Container(
          padding: const EdgeInsets.only(
              left: 40.0,
              right: 40.0
          ),
          child: TextField(
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
        ),
        Container(
          padding: const EdgeInsets.only(
              left: 40.0,
              right: 40.0
          ),
          child: TextField(
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
        padding: const EdgeInsets.all(40.0),
        child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          button_image_widget(context, 'Connection with', 'assets/discord.png', () {}),
          const Padding(
            padding: EdgeInsets.all(10.0),
          ),
          button_image_widget(context, 'Connection with', 'assets/youtube.png', () {}),
          const Padding(
            padding: EdgeInsets.all(10.0),
          ),
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
            borderRadius: BorderRadius.circular(20.0),
          )
      ),
      child: Container(
        padding: const EdgeInsets.all(5.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text(
              desc,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.third,
                  fontSize: 10
              ),
            ),
            const Padding(
                padding: EdgeInsets.all(10.0),
            ),
            Container(
              width: 80,
              height: 50,
              decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage(asset),
                      fit: BoxFit.fill
                  )
              ),
            )
          ],
        ),
      )
    );
  }
}