import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/widget/global_connexion_list.dart';

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
          const Text(
            'Connection aux services',
            style: TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.fourth,
                fontSize: 20
            ),
            textAlign: TextAlign.center,
          ),
          GlobalConnexionList(const [
            true,
            true,
            true,
            true,
            true,
            true,
          ]),
          FractionallySizedBox(
            widthFactor: 0.4,
            child: ElevatedButton(
              onPressed: callbackLogout,
              style: ElevatedButton.styleFrom(
                primary: color_list.fifth,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                )
              ),
              child: Container(
                padding: const EdgeInsets.all(20.0),
                child: const Text(
                  'Logout',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: color_list.third,
                      fontSize: 20
                  ),
                ),
              )
            ),
          ),
          const Padding(
              padding: EdgeInsets.only(top: 20.0)
          ),
        ]
    );
  }
}