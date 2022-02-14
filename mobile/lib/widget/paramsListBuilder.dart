import 'package:flutter/cupertino.dart';
import 'package:mobile/api/model/area/ParameterType.dart';
import 'package:mobile/api/model/serviceFetch/configFecth.dart';
import 'package:mobile/api/model/serviceFetch/parameterFetch.dart';
import 'package:mobile/api/model/serviceFetch/serviceFetch.dart';
import 'package:mobile/widget/input_custom.dart';

class paramsListBuilder {
  serviceFecth service = serviceFecth();
  String actionTrigger = "";
  bool isAction;
  List<serviceFecth> list;

  paramsListBuilder(this.list, String srv, this.actionTrigger, this.isAction) {
    try {
      service = getFromType(list, srv);
    } catch(_) {
    }
  }

  void setService(String srv, String act) {
    actionTrigger = act;
    try {
      service = getFromType(list, srv);
    } catch(_) {
      service = serviceFecth();
    }
  }

  Widget build(BuildContext context) {
    List<Widget> list = [];

    try {
      list = getListToBuild();
    } catch(_) {
    }

    return Container(
        child: Center(
          child: SizedBox(
            height: 150,
            child: ListView(
              children: list,
            ),
          )
      ),
    );
  }

  configFetch getValue(List<configFetch> list, String act) {
    for (var it in list) {
      if (it.type == act) {
        return it;
      }
    }
    throw "Invalid action $act";
  }

  configFetch getConfig(bool fetchAction, String act) {
    if (fetchAction) {
      return getValue(service.action, act);
    }
    return getValue(service.reaction, act);
  }

  Widget textWidget(parameterFetch data) {
    return InputCustom(data.name, data.label, "");
  }


  List<Widget> getListToBuild() {
    configFetch conf = getConfig(isAction, actionTrigger);
    List<Widget> list = [];
    Map<ParameterType,  Widget Function(parameterFetch)>  link = {
      ParameterType.DATETIME: textWidget,
      ParameterType.NUMBER: textWidget,
      ParameterType.TEXT: textWidget,
      ParameterType.TIME: textWidget,
      ParameterType.URL: textWidget
    };

    for (var it in conf.parameters) {
      try {
        list.add(link[stringToEnum(it.type)]!(it));
      } catch(_) {
        throw "Unknown parameter type";
      }
    }
    return list;
  }
}