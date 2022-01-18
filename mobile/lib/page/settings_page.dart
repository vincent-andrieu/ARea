import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

void callbackSave() {
  // TODO FILL THIS
}

void callbackLogout() {
  // TODO FILL THIS
}

class settings_page extends StatefulWidget {
  const settings_page() : super();

  @override
  State<settings_page> createState() => _settings_pageState();
}

class _settings_pageState extends State<settings_page> {
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
            'Settings',
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
            onPressed: callbackSave,
            style: ElevatedButton.styleFrom(
                primary: color_list.primary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                )
            ),
            child: const Text(
              'Save',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.third,
                  fontSize: 20
              ),
            ),
          ),
          auth_connect_widget(context, false, 'assets/discord.png', () {}),
          auth_connect_widget(context, true, 'assets/youtube.png', () {}),
          auth_connect_widget(context, false, 'assets/google.png', () {}),
          ElevatedButton(
            onPressed: callbackLogout,
            style: ElevatedButton.styleFrom(
                primary: color_list.fifth,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                )
            ),
            child: const Text(
              'Logout',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.third,
                  fontSize: 20
              ),
            ),
          ),
          const Padding(
              padding: EdgeInsets.only(top: 20.0)
          ),
        ]
    );
  }

  Widget auth_connect_widget(BuildContext context, bool stat, String asset, void Function()? callback) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Container(
          width: 80,
          height: 50,
          decoration: BoxDecoration(
              image: DecorationImage(
                  image: AssetImage(asset),
                  fit: BoxFit.fill
              )
          ),
        ),
        const Padding(
          padding: EdgeInsets.all(10.0),
        ),
        ElevatedButton(
          onPressed: (!stat) ? null : callback,
          style: ElevatedButton.styleFrom(
            primary: color_list.primary,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            )
          ),
          child: Text(
            (!stat) ? "Connected" : "Connect",
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: color_list.third,
              fontSize: 10
            ),
          )
        )
      ]
    );
  }
}