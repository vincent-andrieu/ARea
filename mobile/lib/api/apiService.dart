import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart';

class apiService {
  String srvUrl = "";

  apiService(String url) {
    srvUrl = url;
  }

  Future<type> makeRequestGet<type>(String route, Map<String, String> params) async {
    params.addAll({
      HttpHeaders.contentTypeHeader: 'application/json'
    });
    Response result = await get(Uri.http(
        srvUrl,
        route,
        params
    ));

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  Future<type> makeRequestPost<type, query>(String route, query params) async {
    Response result = await post(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  Future<type> makeRequestPut<type, query>(String route, query params) async {
    Response result = await put(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  Future<type> makeRequestDelete<type, query>(String route, query params) async {
    Response result = await delete(
      Uri.parse(srvUrl + route),
      body: json.encode(params),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  Future<List<type>> makeRequestGetList<type, query>(String route) async {
    Response result = await get(Uri.parse(srvUrl + route));

    if (result.statusCode == 200) {
      dynamic body = jsonDecode(result.body);

      List<type> fetchList = body?.map((dynamic item) => jsonDecode(item)).toList();

      return fetchList;
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }
}