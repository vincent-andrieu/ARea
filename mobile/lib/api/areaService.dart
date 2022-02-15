import 'dart:developer';

import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/model/codeRequest.dart';
import 'package:mobile/api/model/createAreaRequest.dart';
import 'package:mobile/api/model/loginRequest.dart';
import 'package:mobile/api/model/serviceFetch/configFecth.dart';
import 'package:mobile/api/model/serviceFetch/serviceFetch.dart';
import 'dart:developer' as developer;
import 'model/area/Area.dart';
import 'model/registerResponse.dart';
import 'model/tokenRequest.dart';

class areaService {
  late apiService api;
  registerResponse? token;
  List<serviceFecth> listService = [];

  areaService(String url) {
    if (url.isNotEmpty) {
      api = apiService(url);
    }
  }

  Future<bool> updateServiceToken(String token, String url) async {
    try {
      developer.log("updateServiceToken START");
      dynamic response = await api.makeRequestPost<codeRequest>(url, "", codeRequest(token), 200);

      developer.log("updateServiceToken fromJson");
      this.token = registerResponse.fromJson(response);
      developer.log("updateServiceToken END");
      await fetchDataConfig();
      await getListIfttt();
      return true;
    } catch (e) {
      developer.log("updateServiceToken  -> ${e.toString()}");
      return false;
    }
  }

  void initConnexion(String url) {
    try {
      developer.log('initConnexion: IT\'S CALL MON KAKE');
      api = apiService(url);
    } catch (e) {
      developer.log('initConnexion: Invalid input');
    }
  }

  Future<bool> tryConnexion(String user, String pass) async {
    try {
      developer.log('tryConnexion: Start');
      dynamic response = await api.makeRequestPost<loginRequest>("/auth/login", "", loginRequest(user, pass), 200);
      developer.log('tryConnexion: request OK');
      token = registerResponse.fromJson(response);
      developer.log('tryConnexion: parse OK');
      await fetchDataConfig();
      await getListIfttt();
      return true;
    } catch (e) {
      developer.log('tryConnexion: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> createUserAndConnexion(String user, String pass) async {
    try {
      dynamic response = await api.makeRequestPost<loginRequest>("/auth/register", "", loginRequest(user, pass), 201);
      token = registerResponse.fromJson(response);
      await fetchDataConfig();
      await getListIfttt();
      return true;
    } catch (e) {
      developer.log('createUserAndConnexion: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> createIfttt(createAreaRequest newArea) async {
    try {
      dynamic _ = await api.makeRequestPost<createAreaRequest>("/area/", _getToken(), newArea, 201);

      // TODO CAN BE UPDATE IN LOCAL FOR SYSTEM OPTIMISATION
      return getListIfttt();
    } catch (e) {
      developer.log('createIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> deleteIfttt(String iftttId) async {
    try {
      dynamic _ = await api.makeRequestDelete("/area/$iftttId", _getToken(), {}, 200);

      // TODO CAN BE UPDATE IN LOCAL FOR SYSTEM OPTIMISATION
      return getListIfttt();
    } catch (e) {
      developer.log('deleteIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> updateIfttt(String iftttId, Area editedObj) async {
    try {
      dynamic _ = await api.makeRequestPut<Area>("/area/$iftttId", _getToken(), editedObj, 200);

      // TODO CAN BE UPDATE IN LOCAL FOR SYSTEM OPTIMISATION
      return getListIfttt();
    } catch (e) {
      developer.log('updateIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> getListIfttt() async {
    try {
      dynamic list = await api.makeRequestGet("/area/list", _getToken(), 200);

      log(list.toString());
      log("getListIfttt -> REQUEST OK");

      token?.areas = List.from(list).map((dynamic item) => createAreaRequest.fromJson(item)).toList();

      log("getListIfttt -> LIST OK");
      return true;
    } catch (e) {
      developer.log('getListIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> fetchDataConfig() async {
    try {
      dynamic service = await api.makeRequestGet("/service/list", _getToken(), 200);
      dynamic action = await api.makeRequestGet("/service/action", _getToken(), 200);
      dynamic reaction = await api.makeRequestGet("/service/reaction", _getToken(), 200);

      //developer.log("fetchDataConfig -> $service");
      List<serviceFecth> serviceList = List.from(service).map((dynamic item) => serviceFecth.fromJson(item)).toList();
      //developer.log("fetchDataConfig -> $action");
      List<configFetch> actionList = List.from(action).map((dynamic item) => configFetch.fromJson(item)).toList();
      //developer.log("fetchDataConfig -> $reaction");
      List<configFetch> reactionList = List.from(reaction).map((dynamic item) => configFetch.fromJson(item)).toList();

      for (var element in serviceList) {
        //developer.log("fetchDataConfig -> 1");
        element.reaction = _getInList(reactionList, element.label);
        //developer.log("fetchDataConfig -> 2");
        element.action = _getInList(actionList, element.label);
        //developer.log("fetchDataConfig -> 3");
        listService.add(element);
        //developer.log("fetchDataConfig -> 4");
      }
      //developer.log("fetchDataConfig -> $listService");
      return true;
    } catch (e) {
      developer.log("fetchDataConfig -> ${e.toString()}");
      throw "fetchDataConfig -> ${e.toString()}";
    }
  }

  List<configFetch> _getInList(List<configFetch> listSrc, String name) {
    List<configFetch> list = [];

    for (var element in listSrc) {
      if (element.service == name) {
        list.add(element);
      }
    }
    return list;
  }

  String _getToken() {
    return token!.token;
  }
}