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
          text: (selectedDate.millisecondsSinceEpoch).toString()
      );
    } else {
      int milli = int.parse(defaultValue);
      controller = TextEditingController(text: defaultValue);
      selectedDate = DateTime.fromMillisecondsSinceEpoch(milli);
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
      firstDate: DateTime.now(),
      lastDate: DateTime(2042),

    );
    if (selected != null && selected != selectedDate) {
      setState(() {
        selectedDate = selected;
        controller.text = (selectedDate.millisecondsSinceEpoch).toString();
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
