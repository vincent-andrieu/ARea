import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/widget/list_custom.dart';

class create_ifttt extends StatefulWidget {
  const create_ifttt() : super();

  @override
  State<create_ifttt> createState() => _create_iftttState();
}

class _create_iftttState extends State<create_ifttt> {
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
          'Create a IFTTT',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: color_list.fourth,
            fontSize: 30
          ),
          textAlign: TextAlign.center,
        ),
        ListCustom(const <String>['One', 'Two', 'Free', 'Four'], 'one')
      ]
    );
  }
}