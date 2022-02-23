import 'dart:developer';

import 'package:flutter/cupertino.dart';
import 'package:mobile/api/model/area/ParameterType.dart';
import 'package:mobile/api/model/serviceFetch/configFecth.dart';
import 'package:mobile/api/model/serviceFetch/parameterFetch.dart';
import 'package:mobile/api/model/serviceFetch/serviceFetch.dart';
import 'package:mobile/tools/ITransfer.dart';
import 'package:mobile/tools/preBuildTools.dart';

class paramsListBuilder {
  serviceFecth service = serviceFecth();
  String actionTrigger = "";
  bool isAction;
  List<serviceFecth> list;
  List<ITransfer> params = [];

  preBuildTools? tools;

  paramsListBuilder(
      this.list, String srv, this.actionTrigger, this.isAction, this.tools) {
    try {
      service = getFromType(list, srv);
    } catch (_) {}
  }

  void setService(String srv, String act) {
    actionTrigger = act;
    try {
      service = getFromType(list, srv);
    } catch (_) {
      service = serviceFecth();
    }
  }

  Widget build(BuildContext context) {
    List<Widget> list = [];

    try {
      list = getListToBuild();
    } catch (_) {}

    return Container(
      child: Center(
          child: SizedBox(
        height: 150,
        child: ListView(
          children: list,
        ),
      )),
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

  ITransfer textWidget(parameterFetch data, String defaultValue) {
    return textInputTransfer(data.name, data.label, data.type, defaultValue);
  }

  ITransfer numberWidget(parameterFetch data, String defaultValue) {
    return numberInputTransfer(data.name, data.label, data.type, defaultValue);
  }

  ITransfer urlWidget(parameterFetch data, String defaultValue) {
    return urlInputTransfer(data.name, data.label, data.type, defaultValue);
  }

  ITransfer timePickerWidget(parameterFetch data, String defaultValue) {
    return timePickerInputTransfer(data.name, data.label, data.type, defaultValue);
  }

  ITransfer datePickerWidget(parameterFetch data, String defaultValue) {
    return datePickerInputTransfer(data.name, data.label, data.type, defaultValue);
  }

  String getValueInPreBuild(String type) {
    for (var it in tools!.params.keys) {
      log("$it == $type");
      if (it == type) {
        return tools!.params[it]!;
      }
    }
    return "";
  }

  List<Widget> getListToBuild() {
    configFetch conf = getConfig(isAction, actionTrigger);
    List<Widget> list = [];
    Map<ParameterType, ITransfer Function(parameterFetch, String defaultValue)>
        link = {
      ParameterType.DATETIME: datePickerWidget,
      ParameterType.NUMBER: numberWidget,
      ParameterType.TEXT: textWidget,
      ParameterType.TIME: timePickerWidget,
      ParameterType.URL: urlWidget
    };

    params.clear();
    for (var it in conf.parameters) {
      log(it.type);
      try {
        ITransfer tmp = ITransfer();

        if (tools != null) {
          tmp = link[stringToEnum(it.type)]!(it, getValueInPreBuild(it.name));
        } else {
          tmp = link[stringToEnum(it.type)]!(it, "");
        }

        params.add(tmp);
        list.add(tmp.getWidget());
        list.add(
            const Padding(padding: EdgeInsets.only(top: 10.0, bottom: 10.0)));
      } catch (_) {
        throw "Unknown parameter type";
      }
    }
    return list;
  }

  Map<String, String> getParams() {
    Map<String, String> toRet = {};

    for (var it in params) {
      toRet[it.getKey()] = it.getValue();
    }
    return toRet;
  }
}
