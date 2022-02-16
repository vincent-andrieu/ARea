import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/api/model/serviceFetch/serviceFetch.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/tools/preBuildTools.dart';
import 'package:mobile/widget/paramsListBuilder.dart';

class DynamicList {
  bool isService;
  String firstTitle;
  String secondTitle;
  List<IService> service;
  TextEditingController controllerFirst = TextEditingController(text: "None");
  TextEditingController controllerSecond = TextEditingController(text: "None");
  List<serviceFecth> listService;
  late paramsListBuilder actionParameter;
  late TestList widget;

  DynamicList(this.service, this.isService, this.firstTitle, this.secondTitle, this.listService, preBuildTools? tools) {
    if (tools == null) {
      actionParameter = paramsListBuilder(listService, controllerFirst.text, controllerSecond.text, isService, null);
    } else {
      actionParameter = paramsListBuilder(listService, tools.selectedFirst, tools.selectedSecond, isService, tools);
    }
    widget = TestList(service, isService, firstTitle, secondTitle, controllerFirst, controllerSecond, actionParameter, tools);
  }
}

class TestList extends StatefulWidget {
  List<IService> service;
  bool isService;
  String firstTitle;
  String secondTitle;

  preBuildTools? tools;

  final actionParameter;
  final controllerFirst;
  final controllerSecond;

  TestList(this.service, this.isService, this.firstTitle, this.secondTitle, this.controllerFirst, this.controllerSecond, this.actionParameter, this.tools, {Key? key}) : super(key: key);

  @override
  _TestListState createState() => _TestListState(service, isService, firstTitle, secondTitle, controllerFirst, controllerSecond, actionParameter, tools);
}

class _TestListState extends State<TestList> {
  List<IService> service;
  bool isService;

  List<String> list = ["None"];

  List<String> listChild = ["None"];

  String firstTitle = "";
  String secondTitle = "";


  paramsListBuilder actionParameter;
  TextEditingController textChild;
  TextEditingController controllerSecond;

  _TestListState(this.service, this.isService, this.firstTitle, this.secondTitle, this.textChild, this.controllerSecond, this.actionParameter, preBuildTools? tools) {
    list = getList();
    if (tools != null) {
      textChild.text = tools.selectedFirst;
      controllerSecond.text = tools.selectedSecond;
      if (isService) {
        listChild = getChildListAction(textChild.text);
      } else {
        listChild = getChildListReaction(textChild.text);
      }
      actionParameter.setService(textChild.text, controllerSecond.text);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        listBuilder(),
        const Padding(padding: EdgeInsets.only(
            top: 10.0,
            bottom: 10.0
        )),
        listBuilderChild(),
        const Padding(padding: EdgeInsets.only(
            top: 10.0,
            bottom: 10.0
        )),
        actionParameter.build(context)
      ],
    );
  }

  Widget listBuilder() {
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
              firstTitle,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 30
              ),
              textAlign: TextAlign.center,
            ),
            DropdownButton<String>(
              isExpanded: true,
              value: textChild.text,
              icon: const Icon(Icons.arrow_downward),
              style: const TextStyle(color: color_list.fourth),
              underline: Container(
                height: 2,
                color: color_list.fourth,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  textChild.text = newValue!;
                  controllerSecond.text = "None";
                  if (isService) {
                    listChild = getChildListAction(textChild.text);
                  } else {
                    listChild = getChildListReaction(textChild.text);
                  }
                  actionParameter.setService(textChild.text, controllerSecond.text);
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

  Widget listBuilderChild() {
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
              secondTitle,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 30
              ),
              textAlign: TextAlign.center,
            ),
            DropdownButton<String>(
              isExpanded: true,
              value: controllerSecond.text,
              icon: const Icon(Icons.arrow_downward),
              style: const TextStyle(color: color_list.fourth),
              underline: Container(
                height: 2,
                color: color_list.fourth,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  controllerSecond.text = newValue!;
                  actionParameter.setService(textChild.text, controllerSecond.text);
                });
              },
              items: listChild.map<DropdownMenuItem<String>>((String value) {
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

  List<String> getChildListAction(String serviceName) {
    for (var it in service) {
      if (it.getName() == serviceName) {
        return it.getAction();
      }
    }
    throw "Unknown truc";
  }

  List<String> getChildListReaction(String serviceName) {
    for (var it in service) {
      if (it.getName() == serviceName) {
        return it.getReaction();
      }
    }
    throw "Unknown truc";
  }

  List<String> getList() {
    List<String> list = [];

    for (var it in service) {
      list.add(it.getName());
    }
    return list;
  }
}