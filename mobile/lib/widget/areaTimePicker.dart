import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class areaTimePicker extends StatefulWidget {
  TimeOfDay time = TimeOfDay.now();
  String desc;
  String hint;
  late TextEditingController controller;

  areaTimePicker(this.desc, this.hint, String defaultValue, {Key? key}) : super(key: key) {
    if (defaultValue.isEmpty) {
      controller = TextEditingController(text: "${time.hour}:${time.minute}");
    } else {
      controller = TextEditingController(text: defaultValue);
      time = TimeOfDay(
          hour: int.parse(defaultValue.split(':')[0]),
          minute: int.parse(defaultValue.split(':')[1])
      );
    }
  }

  @override
  _areaTimePickerState createState() => _areaTimePickerState(desc, hint, time, controller);
}

class _areaTimePickerState extends State<areaTimePicker> {
  String desc;
  String hint;
  TimeOfDay time;
  final TextEditingController controller;

  _areaTimePickerState(this.desc, this.hint, this.time, this.controller);

  void _selectTime() async {
    final TimeOfDay? newTime = await showTimePicker(
      context: context,
      initialTime: time,
      builder: (BuildContext context, Widget? child) {
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(alwaysUse24HourFormat: true),
          child: Center(child: child),
        );
      },
    );
    if (newTime != null) {
      setState(() {
        time = newTime;
        controller.text = "${time.hour}:${time.minute}";
      });
    }
  }

  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: _selectTime,
          child: Text(hint),
        ),
        const SizedBox(height: 8),
        Text(
          '$desc: ${controller.text}',
        ),
      ],
    );
  }
}
