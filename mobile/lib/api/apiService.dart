import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart';
import 'dart:developer' as developer;

class apiService {
  String srvUrl = "";

  apiService(String url) {
    srvUrl = url;
  }

  Future<dynamic> makeRequestGet<type>(String route, Map<String, String> params, int exitExpect) async {
    params.addAll({
      HttpHeaders.contentTypeHeader: 'application/json'
    });
    Response result = await get(Uri.http(
        srvUrl,
        route,
        params
    ));

    if (result.statusCode == exitExpect) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }

  Future<dynamic> makeRequestPost<query>(String route, query params, int exitExpect) async {
    developer.log("$srvUrl$route ${json.encode(params)}");
    Response result = await post(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );

    if (result.statusCode == exitExpect) {
      developer.log(result.body);
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }

  Future<dynamic> makeRequestPut<query>(String route, query params, int exitExpect) async {
    Response result = await put(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );

    if (result.statusCode == exitExpect) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }

  Future<dynamic> makeRequestDelete<query>(String route, query params, int exitExpect) async {
    Response result = await delete(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );

    if (result.statusCode == exitExpect) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }

  Future<List<dynamic>> makeRequestGetList<query>(String route, int exitExpect) async {
    Response result = await get(Uri.parse(srvUrl + route));

    if (result.statusCode == exitExpect) {
      dynamic body = jsonDecode(result.body);

      List<dynamic> fetchList = body?.map((dynamic item) => jsonDecode(item)).toList();

      return fetchList;
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode} error: ${result.body}";
    }
  }
}