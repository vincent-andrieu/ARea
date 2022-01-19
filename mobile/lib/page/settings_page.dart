import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/widget/global_connexion_list.dart';

void callbackClose() {
  // TODO FILL THIS
}

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
    return Container(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          buildTopPage(context),
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
      ),
    );
  }

  Widget buildTopPage(BuildContext context) {
    return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Expanded(
            child: Stack(
              children: const [
                Positioned(
                  left: 8,
                  child: IconButton(
                    icon: Icon(
                        Icons.arrow_back,
                        size: 40.0
                    ),
                    tooltip: 'Retour arrière',
                    onPressed: callbackClose,
                  ),
                ),
                Center(
                  child: Text(
                    'Settings',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.fourth,
                        fontSize: 50
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          )
        ]
    );
  }
}