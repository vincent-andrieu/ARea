import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/widget/input_custom.dart';

void callbackStartArea() {
  // TODO FILL THIS
}

class start_area extends StatefulWidget {
  const start_area() : super();

  @override
  State<start_area> createState() => _start_areaState();
}

class _start_areaState extends State<start_area> {
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
            'AREA',
            style: TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.fourth,
                fontSize: 50
            ),
            textAlign: TextAlign.center,
          ),
          Column(
            children: <Widget>[
              InputCustom('IP address', 'Enter server IP address'),
              Container(
                padding: const EdgeInsets.only(
                    top: 10.0,
                    left: 40.0,
                    right: 40.0
                ),
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: callbackStartArea,
                  style: ElevatedButton.styleFrom(
                      primary: color_list.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      )
                  ),
                  child: const Text(
                    'Start',
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
          const Text(
            'Welcome',
            style: TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.fourth,
                fontSize: 30
            ),
            textAlign: TextAlign.center,
          ),
          const Padding(
              padding: EdgeInsets.only(bottom: 40.0)
          ),
        ]
    );
  }
}