import 'dart:math';

import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'dart:developer' as developer;

class ListCustom extends StatefulWidget {
  List<String> list = <String>[];
  String defaultValue = "";
  String dropdownValue = "";
  String desc = "";
  void Function(String selected) onUpdateTest;
  static List<String> of (BuildContext context) => context.dependOnInheritedWidgetOfExactType() as List<String>;

  ListCustom(this.desc, this.list, String defaultValueSrc, this.onUpdateTest, {Key? key}) : super(key: key) {
    developer.log("Too much build");
    defaultValue = defaultValueSrc;
    dropdownValue = defaultValueSrc;
  }

  @override
  State<ListCustom> createState() => list_custom_class(desc, list, defaultValue, onUpdateTest);
}

class list_custom_class extends State<ListCustom> {
  List<String> list = <String>[];
  String defaultValue = "";
  String dropdownValue = "";
  String desc = "";
  void Function(String selected) onUpdateTest;

  list_custom_class(this.desc, this.list, String defaultValueSrc, this.onUpdateTest, {Key? key}){
    defaultValue = defaultValueSrc;
    dropdownValue = defaultValueSrc;
  }

  void onMyFieldChange(List<String> src) {
    setState(() {
      list = src;
    });
  }

  @override
  void setState(VoidCallback fn) {
    developer.log("mdr");
    super.setState(fn);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.only(
            left: 40.0,
            right: 40.0,
            top: 10.0,
            bottom: 10.0
        ),
        width: double.infinity,
        decoration: BoxDecoration(
          color: color_list.third,
          border: Border.all(
            color: color_list.fourth,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: <Widget>[
            Text(
              desc,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 30
              ),
              textAlign: TextAlign.center,
            ),
            DropdownButton<String>(
              isExpanded: true,
              value: dropdownValue,
              icon: const Icon(Icons.arrow_downward),
              style: const TextStyle(color: color_list.fourth),
              underline: Container(
                height: 2,
                color: color_list.fourth,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  developer.log(newValue!);
                  dropdownValue = newValue;
                  onUpdateTest(newValue);
                });
              },
              items: list.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            )
          ],
        )
    );
  }
}