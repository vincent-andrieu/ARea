import 'dart:developer';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/dropbox.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/service/undefined.dart';
import 'package:mobile/service/unsplash.dart';

class test_page extends StatefulWidget {
  @override
  State<test_page> createState() => test_page_class();
}

class test_page_class extends State<test_page> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: FractionallySizedBox(
            widthFactor: 0.45,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                TestList([
                  github(false),
                  twitch(false),
                  twitter(false),
                  discord(false),
                  linkedin(false),
                  notion(false),
                  unsplash(false),
                  dropbox(false),
                  undefined(false),
                ], true, "Service", "Action"),
              ]
            ),
          )
        )
      )
    );
  }
}

class TestList extends StatefulWidget {
  List<IService> service;
  bool isService;
  String firstTitle;
  String secondTitle;

  TestList(this.service, this.isService, this.firstTitle, this.secondTitle, {Key? key}) : super(key: key);

  @override
  _TestListState createState() => _TestListState(service, isService, firstTitle, secondTitle);
}

class _TestListState extends State<TestList> {
  List<IService> service;
  bool isService;

  String text = "None";
  List<String> list = [];

  String textChild = "None";
  List<String> listChild = ["None"];

  String firstTitle = "";
  String secondTitle = "";

  _TestListState(this.service, this.isService, this.firstTitle, this.secondTitle) {
    list = getList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        listBuilder(),
        listBuilderChild()
      ],
    );
  }

  Widget listBuilder() {
    return Container(
        padding: const EdgeInsets.only(
            left: 40.0,
            right: 40.0,
            top: 10.0,
            bottom: 10.0
        ),
        width: double.infinity,
        decoration: BoxDecoration(
          color: color_list.third,
          border: Border.all(
            color: color_list.fourth,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: <Widget>[
            Text(
              firstTitle,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 30
              ),
              textAlign: TextAlign.center,
            ),
            DropdownButton<String>(
              isExpanded: true,
              value: text,
              icon: const Icon(Icons.arrow_downward),
              style: const TextStyle(color: color_list.fourth),
              underline: Container(
                height: 2,
                color: color_list.fourth,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  text = newValue!;
                  textChild = "None";
                  if (isService) {
                    listChild = getChildListAction(text);
                  } else {
                    listChild = getChildListReaction(text);
                  }
                });
              },
              items: list.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            )
          ],
        )
    );
  }

  Widget listBuilderChild() {
    return Container(
        padding: const EdgeInsets.only(
            left: 40.0,
            right: 40.0,
            top: 10.0,
            bottom: 10.0
        ),
        width: double.infinity,
        decoration: BoxDecoration(
          color: color_list.third,
          border: Border.all(
            color: color_list.fourth,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: <Widget>[
            Text(
              secondTitle,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 30
              ),
              textAlign: TextAlign.center,
            ),
            DropdownButton<String>(
              isExpanded: true,
              value: textChild,
              icon: const Icon(Icons.arrow_downward),
              style: const TextStyle(color: color_list.fourth),
              underline: Container(
                height: 2,
                color: color_list.fourth,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  textChild = newValue!;
                });
              },
              items: listChild.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            )
          ],
        )
    );
  }

  List<String> getChildListAction(String serviceName) {
    for (var it in service) {
      if (it.getName() == serviceName) {
        return it.getAction();
      }
    }
    throw "Unknown truc";
  }

  List<String> getChildListReaction(String serviceName) {
    for (var it in service) {
      if (it.getName() == serviceName) {
        return it.getReaction();
      }
    }
    throw "Unknown truc";
  }

  List<String> getList() {
    List<String> list = [];

    for (var it in service) {
      list.add(it.getName());
    } 
    return list;
  }
}