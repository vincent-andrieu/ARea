import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'dart:developer' as developer;

class ListCustom extends StatelessWidget {
  List<String> list = <String>[];
  String defaultValue = "";
  String dropdownValue = "";
  String desc = "";
  void Function() onUpdate = () {};

  ListCustom(String descSrc, List<String> listSrc, String defaultValueSrc, void Function() onUpdateSrc, {Key? key}) : super(key: key) {
    list = listSrc;
    defaultValue = defaultValueSrc;
    dropdownValue = defaultValueSrc;
    desc = descSrc;
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
                developer.log(newValue!);
                dropdownValue = newValue;
                onUpdate();
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