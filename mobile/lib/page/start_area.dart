import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/tools/ShakeYourDevice.dart';
import 'package:mobile/widget/input_custom.dart';
import 'package:fluttertoast/fluttertoast.dart';

class start_area extends StatelessWidget {
  areaService api;
  ShakeYourDevice? shake;

  start_area(this.api, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    shake ??= ShakeYourDevice(context);
    InputCustom input = InputCustom(
        'IP address', 'Enter server IP address', 'http://5.135.150.139:8080', false, null);
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Center(
          child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                const Padding(padding: EdgeInsets.only(top: 30.0)),
                const Text(
                  'AREA',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: color_list.fourth,
                      fontSize: 50),
                  textAlign: TextAlign.center,
                ),
                Container(
                  padding:
                      const EdgeInsets.only(top: 10.0, left: 40.0, right: 40.0),
                  width: double.infinity,
                  child: Column(
                    children: <Widget>[
                      input,
                      ElevatedButton(
                        onPressed: () {
                          api.initConnexion(input.controller.text);
                          api.api.ping().then((value) => {
                                if (value)
                                  {Navigator.of(context).pushNamed('/SignIn')}
                                else {
                                  Fluttertoast.showToast(
                                    msg: "${input.controller.text}: do not answer",
                                    toastLength: Toast.LENGTH_LONG,
                                    gravity: ToastGravity.BOTTOM,
                                    timeInSecForIosWeb: 5,
                                    backgroundColor: color_list.secondary,
                                    textColor: color_list.fifth,
                                    fontSize: 16.0
                                  )
                                }
                              });
                        },
                        style: ElevatedButton.styleFrom(
                            primary: color_list.primary,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10.0),
                            )),
                        child: const FittedBox(
                          fit: BoxFit.fitWidth,
                          child: Text(
                            'Start',
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: color_list.third),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const Text(
                  'Welcome',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: color_list.fourth,
                      fontSize: 30),
                  textAlign: TextAlign.center,
                ),
                const Padding(padding: EdgeInsets.only(bottom: 40.0)),
              ]),
        ));
  }
}
