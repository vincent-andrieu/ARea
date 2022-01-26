import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/widget/input_custom.dart';

class start_area extends StatelessWidget {
  areaService api;

  start_area(this.api, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    InputCustom input = InputCustom('IP address', 'Enter server IP address');
    return Scaffold(
        body: Center(
          child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                const Padding(
                    padding: EdgeInsets.only(top: 30.0)
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
                    input,
                    Container(
                      padding: const EdgeInsets.only(
                          top: 10.0,
                          left: 40.0,
                          right: 40.0
                      ),
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          api.initConnexion(input.controller.text);
                          Navigator.of(context).pushNamed('/SignIn');
                        },
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
          ),
        )
    );
  }
}