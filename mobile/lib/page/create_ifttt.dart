import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/widget/list_custom.dart';

void callbackClose(BuildContext context) {
  Navigator.of(context).pop();
}

void callbackSaveIfttt(BuildContext context) {
  // TODO FILL THIS
  Navigator.of(context).pushNamed('/List');
}

class create_ifttt extends StatefulWidget {
  const create_ifttt() : super();

  @override
  State<create_ifttt> createState() => _create_iftttState();
}

class _create_iftttState extends State<create_ifttt> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          buildTopPage(context),
          Container(
            padding: const EdgeInsets.only(
              left: 100.0,
              right: 100.0,
            ),
            child: Column(
              children: <Widget>[
                ListCustom("Service", const <String>['Twitch', 'Discord', 'Google', 'Twitter', 'None'], 'None'),
                const Padding(padding: EdgeInsets.only(
                    top: 10.0,
                    bottom: 10.0
                )),
                ListCustom("Condition", const <String>['New message on channel ', 'None'], 'None'),
                const Padding(padding: EdgeInsets.only(
                    top: 10.0,
                    bottom: 10.0
                )),
                ListCustom("Parameter", const <String>['\$MSG', '\$NAME', 'None'], 'None'),
                const Padding(padding: EdgeInsets.only(
                    top: 20.0,
                    bottom: 20.0
                )),
                // TODO ADD SEPARATION
                const Icon(
                  Icons.arrow_downward_rounded,
                  color: color_list.primary,
                  size: 100.0,
                ),
                // TODO
                const Padding(padding: EdgeInsets.only(
                    top: 20.0,
                    bottom: 20.0
                )),
                ListCustom("Service", const <String>['Twitch', 'Discord', 'Google', 'Twitter', 'None'], 'None'),
                const Padding(padding: EdgeInsets.only(
                    top: 10.0,
                    bottom: 10.0
                )),
                ListCustom("Action", const <String>['New message', 'New status', 'None'], 'None'),
                const Padding(padding: EdgeInsets.only(
                    top: 10.0,
                    bottom: 10.0
                )),
                ListCustom("Parameter", const <String>['Hello world', 'None'], 'None'),
                const Padding(padding: EdgeInsets.only(
                    top: 10.0,
                    bottom: 10.0
                )),
                Container(
                  padding: const EdgeInsets.only(
                      top: 20.0,
                      bottom: 20.0
                  ),
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      callbackSaveIfttt(context);
                    },
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
                ),
              ],
            ),
          )
        ]
      )
    );
  }

  Widget buildTopPage(BuildContext context) {
    return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Expanded(
            child: Stack(
              children: [
                const Center(
                  child: Text(
                    'New IFTTT',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.fourth,
                        fontSize: 50
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                Positioned(
                  right: 8,
                  child: IconButton(
                    icon: const Icon(
                        Icons.close,
                        size: 40.0
                    ),
                    tooltip: 'Close page',
                    onPressed: () {
                      callbackClose(context);
                    },
                  ),
                ),
              ],
            ),
          )
        ]
    );
  }
}