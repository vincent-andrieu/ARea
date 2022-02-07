import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/model/codeRequest.dart';
import 'package:mobile/api/model/loginRequest.dart';
import 'dart:developer' as developer;
import 'model/area.dart';
import 'model/registerResponse.dart';
import 'model/tokenRequest.dart';

class areaService {
  late apiService api;
  registerResponse? token;

  areaService(String url) {
    if (url.isNotEmpty) {
      api = apiService(url);
    }
  }

  Future<bool> updateServiceToken(String token, String url) async {
    try {
      Future<dynamic> response = await api.makeRequestPost<codeRequest>(url, codeRequest(token), 200);

      this.token = registerResponse.fromJson(response);
      return true;
    } catch (e) {
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
      dynamic response = await api.makeRequestPost<loginRequest>("/auth/login", loginRequest(user, pass), 200);
      developer.log('tryConnexion: request OK');
      token = registerResponse.fromJson(response);
      developer.log('tryConnexion: parse OK');
      return true;
    } catch (e) {
      developer.log('tryConnexion: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> createUserAndConnexion(String user, String pass) async {
    try {
      dynamic response = await api.makeRequestPost<loginRequest>("/auth/register", loginRequest(user, pass), 201);
      token = registerResponse.fromJson(response);
      return true;
    } catch (e) {
      developer.log('createUserAndConnexion: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> createIfttt(Area newArea) async {
    try {
      dynamic _ = await api.makeRequestPost<Area>("/area/", newArea, 201);

      // TODO CAN BE UPDATE IN LOCAL FOR SYSTEM OPTIMISATION
      return getListIfttt();
    } catch (e) {
      developer.log('createIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> deleteIfttt(String iftttId) async {
    try {
      dynamic _ = await api.makeRequestDelete("/area/$iftttId", {}, 200);

      // TODO CAN BE UPDATE IN LOCAL FOR SYSTEM OPTIMISATION
      return getListIfttt();
    } catch (e) {
      developer.log('deleteIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> updateIfttt(String iftttId, Area editedObj) async {
    try {
      dynamic _ = await api.makeRequestPut<Area>("/area/$iftttId", editedObj, 200);

      // TODO CAN BE UPDATE IN LOCAL FOR SYSTEM OPTIMISATION
      return getListIfttt();
    } catch (e) {
      developer.log('updateIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }

  Future<bool> getListIfttt() async {
    try {
      dynamic list = api.makeRequestGetList<tokenRequest>("/area/list", 200);
      // TODO exctract data Future<List<iftttResponse>>
      token?.areas = list;
      return true;
    } catch (e) {
      developer.log('getListIfttt: Server failed invalid response -> ' + e.toString());
      return false;
    }
  }
}