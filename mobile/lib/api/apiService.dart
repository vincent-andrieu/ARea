import 'dart:convert';
import 'package:http/http.dart';

class apiService {
  String srvUrl = "";

  apiService(String url) {
    srvUrl = url;
  }

  Future<type> makeRequestGet<type>(String route) async {
    Response result = await get(Uri.parse(srvUrl + route));

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  Future<type> makeRequestPost<type>(String route) async {
    Response result = await get(Uri.parse(srvUrl + route));

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  Future<type> makeRequestPut<type>(String route) async {
    Response result = await put(Uri.parse(srvUrl + route));

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  Future<type> makeRequestDelete<type>(String route) async {
    Response result = await delete(Uri.parse(srvUrl + route));

    if (result.statusCode == 200) {
      return jsonDecode(result.body);
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }

  /*Future<List<type>> makeRequestGetList<type>(String route) async {
    Response result = await get(Uri.parse(srvUrl + route));

    if (result.statusCode == 200) {
      type body = jsonDecode(result.body);

      List<type> fetchList = body?.map((dynamic item) => type.fromJson(item)).toList();

      return fetchList;
    } else {
      throw "Unable to make our request to $srvUrl$route exit with status ${result.statusCode}";
    }
  }*/
}