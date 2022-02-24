import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class areaDatePicker extends StatefulWidget {
  DateTime selectedDate = DateTime.now();
  String desc;
  String hint;
  late TextEditingController controller;

  areaDatePicker(this.desc, this.hint, String defaultValue, {Key? key}) : super(key: key) {
    if (defaultValue.isEmpty) {
      controller = TextEditingController(
          text: "${selectedDate.day}/${selectedDate.month}/${selectedDate.year} ${selectedDate.hour}:${selectedDate.minute}:${selectedDate.second}"
      );
    } else {
      String date = defaultValue.split(' ')[0];
      String time = defaultValue.split(' ')[1];
      controller = TextEditingController(text: defaultValue);
      selectedDate = DateTime.utc(
        int.parse(date.split('/')[2]),
        int.parse(date.split('/')[1]),
        int.parse(date.split('/')[0]),
        int.parse(time.split(':')[0]),
        int.parse(time.split(':')[1]),
        int.parse(time.split(':')[2]),
        0,
        0,
      );
    }
  }

  @override
  _areaDatePickerState createState() => _areaDatePickerState(desc, hint, selectedDate, controller);
}

class _areaDatePickerState extends State<areaDatePicker> {
  String desc;
  String hint;
  DateTime selectedDate;
  final TextEditingController controller;

  _areaDatePickerState(this.desc, this.hint, this.selectedDate, this.controller);

  void _selectTime() async {
    final DateTime? selected = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2020),
      lastDate: DateTime(2025),

    );
    if (selected != null && selected != selectedDate) {
      setState(() {
        selectedDate = selected;
        controller.text = "${selectedDate.day}/${selectedDate.month}/${selectedDate.year} ${selectedDate.hour}:${selectedDate.minute}:${selectedDate.second}";
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
