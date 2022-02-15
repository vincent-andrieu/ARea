import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:http/http.dart';
import 'dart:developer' as developer;

class apiService {
  String srvUrl = "";

  apiService(String url) {
    srvUrl = url;
  }

  Future<bool> ping() async {
    try {
      dynamic _ = await makeRequestGet("/about.json", "", 200);
      return true;
    } catch(e) {
      log('ping: ${e.toString()}');
      return false;
    }
  }

  Future<dynamic> makeRequestGet(String route, String token, int exitExpect) async {
    Response result = await get(
        Uri.parse(srvUrl + route),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
          HttpHeaders.authorizationHeader: 'Bearer $token'
        }
    );

    if (result.statusCode == exitExpect) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }

  Future<dynamic> makeRequestPost<query>(String route, String token, query params, int exitExpect) async {
    developer.log("$srvUrl$route ${json.encode(params)}");
    Response result = await post(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json',
        HttpHeaders.authorizationHeader: 'Bearer $token'
      }
    );

    if (result.statusCode == exitExpect) {
      developer.log(result.body);
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }

  Future<dynamic> makeRequestPut<query>(String route, String token, query params, int exitExpect) async {
    Response result = await put(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json',
        HttpHeaders.authorizationHeader: 'Bearer $token'
      }
    );

    if (result.statusCode == exitExpect) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }

  Future<dynamic> makeRequestDelete<query>(String route, String token, query params, int exitExpect) async {
    Response result = await delete(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json',
        HttpHeaders.authorizationHeader: 'Bearer $token'
      }
    );

    if (result.statusCode == exitExpect) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }
}