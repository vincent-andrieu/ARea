import 'package:mobile/api/apiService.dart';
import 'package:mobile/api/model/loginRequest.dart';
import 'package:mobile/api/model/loginResponse.dart';
import 'dart:developer' as developer;

import 'model/iftttRequest.dart';
import 'model/iftttResponse.dart';
import 'model/registerResponse.dart';
import 'model/tokenRequest.dart';

class areaService {
  late apiService api;
  String token = "";

  areaService(String url) {
    if (url.isNotEmpty) {
      api = apiService(url);
    }
  }

  void initConnexion(String url) {
    api = apiService(url);
  }

  Future<bool> tryConnexion(String user, String pass) async {
    try {
      loginResponse response = await api.makeRequestPost<loginResponse, loginRequest>("/auth/login", loginRequest(user, pass));
      token = response.token;
      return true;
    } catch (e) {
      developer.log('tryConnexion: Server failed invalid response');
      return false;
    }
  }

  Future<bool> createUserAndConnexion(String user, String pass) async {
    try {
      registerResponse response = await api.makeRequestPost<registerResponse, loginRequest>("/auth/register", loginRequest(user, pass));
      token = response.token;
      return true;
    } catch (e) {
      developer.log('createUserAndConnexion: Server failed invalid response');
      return false;
    }
  }

  Future<bool> createIfttt(String action, String reaction) async {
    try {
      iftttResponse _ = await api.makeRequestPost<iftttResponse, iftttRequest>("/auth/register", iftttRequest(action, true, reaction));
      return true;
    } catch (e) {
      developer.log('createIfttt: Server failed invalid response');
      return false;
    }
  }

  Future<bool> deleteIfttt() async {
    try {
      // TODO
      return true;
    } catch (e) {
      developer.log('deleteIfttt: Server failed invalid response');
      return false;
    }
  }

  Future<bool> updateIfttt() async {
    try {
      // TODO
      return true;
    } catch (e) {
      developer.log('updateIfttt: Server failed invalid response');
      return false;
    }
  }

  Future<List<iftttResponse>> getListIfttt() async {
    try {
      Future<List<iftttResponse>> list = api.makeRequestGetList<iftttResponse, tokenRequest>("/list");
      return list;
    } catch (e) {
      developer.log('getListIfttt: Server failed invalid response');
      return [];
    }
  }
}