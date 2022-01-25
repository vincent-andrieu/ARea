import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class ListCustom extends StatefulWidget {
  List<String> list = <String>[];
  String defaultValue = "";
  String desc = "";
  void Function() onUpdate = () {};

  ListCustom(String descSrc, List<String> listSrc, String defaultValueSrc, void Function() onUpdateSrc, {Key? key}) : super(key: key) {
    list = listSrc;
    defaultValue = defaultValueSrc;
    desc = descSrc;
    onUpdate = onUpdateSrc;
  }

  @override
  State<ListCustom> createState() => ListCustomState(desc, list, defaultValue, onUpdate);
}

class ListCustomState extends State<ListCustom> {
  String desc = "";
  String dropdownValue = "";
  List<String> list = <String>[];
  void Function() onUpdate = () {};

  ListCustomState(String descSrc, List<String> listSrc, String defaultValue, void Function() onUpdateSrc) {
    desc = descSrc;
    list = listSrc;
    dropdownValue = defaultValue;
    onUpdate = onUpdateSrc;
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
                  dropdownValue = newValue!;
                  onUpdate();
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