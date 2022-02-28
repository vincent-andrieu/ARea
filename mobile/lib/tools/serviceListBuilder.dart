import 'dart:developer';

import 'package:mobile/api/areaService.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/loaded.dart';
import 'package:mobile/service/undefined.dart';

List<IService> serviceListBuilder(areaService api, bool addNone) {
  List<IService> services = [];

  log("${api.user?.oauth}");
  for (var it in api.listService) {
    bool? tmp = api.user?.oauth[it.label.toLowerCase()];

    log("${it.label} -> $tmp");

    if (tmp == null) {
      services.add(loaded(true, it));
    } else {
      services.add(loaded(tmp, it));
    }
  }
  if (addNone) {
    services.add(undefined(true));
  }
  return services;
}
