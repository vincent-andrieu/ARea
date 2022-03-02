import 'package:mobile/page/color_list.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shake/shake.dart';

class ShakeYourDevice {
  bool run = false;
  late ShakeDetector detector;

  ShakeYourDevice(BuildContext context) {
    detector = ShakeDetector.waitForStart(
        onPhoneShake: () {
          if (!run) {
            showDialog(
              context: context,
              builder: (BuildContext context) => buildPopupDialog(context),
            );
            run = true;
          }
        }
    );
    start();
  }

  Widget textBuilder(String txt) {
    return Text(
      txt,
      style: const TextStyle(
        fontWeight: FontWeight.bold,
        color: color_list.fourth,
        fontSize: 10
      ),
    );
  }

  Widget buildPopupDialog(BuildContext context) {
    return AlertDialog(
      title: const Text('ARea Epietch'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SizedBox(
            height: 150,
            child: ListView(
              children: <Widget>[
                textBuilder('Nombre de jours passés à réfléchir à une architecture propre: 0.05'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
                textBuilder('Pourcentage du projet où simon était sous l\'influence de cannabidiol: 80%'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
                textBuilder('Pourcentage du projet ou Sullivan avait une grosse flemme: 90%'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
                textBuilder('Jours travaillés par Sullivan et Vincent par semaines: 2'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
                textBuilder('Nombre de violation des droits d\'auteurs d\'apple sur Unsplash: 40'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
                textBuilder('Nombre de fois où Sullivan à rager sur flutter: 4294967295 (uint limit)'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
                textBuilder('Nombre de fois où on a recommencé l\'oauth: 8'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
                textBuilder('Nombre de Master Class le 28 février: ?'),
                const Padding(padding: EdgeInsets.only(top: 5.0)),
              ],
            ),
          )
        ],
      ),
      actions: <Widget>[
        ElevatedButton(
          onPressed: () {
            run = false;
            Navigator.of(context).pop();
          },
          style: ElevatedButton.styleFrom(
              primary: color_list.primary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              )),
          child: const FittedBox(
            fit: BoxFit.fitHeight,
            child: Text(
              'Close',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.third
              ),
            ),
          ),
        )
      ],
    );
  }

  void start() {
    detector.startListening();
  }

  void stop() {
    detector.stopListening();
  }
}
