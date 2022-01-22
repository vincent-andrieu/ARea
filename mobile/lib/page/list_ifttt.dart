import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

void callbackParams(BuildContext context) {
  Navigator.of(context).pushNamed('/Settings');
}

void callbackNew(BuildContext context) {
  Navigator.of(context).pushNamed('/Create');
}

class list_ifttt extends StatelessWidget {
  const list_ifttt({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            buildTopPage(context),
            buildListDisplay(context),
            FractionallySizedBox(
              widthFactor: 0.4,
              child: ElevatedButton(
                  onPressed: () {
                    callbackNew(context);
                  },
                  style: ElevatedButton.styleFrom(
                      primary: color_list.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      )
                  ),
                  child: Container(
                    padding: const EdgeInsets.all(20.0),
                    child: const Text(
                      'New',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: color_list.third,
                          fontSize: 20
                      ),
                    ),
                  )
              ),
            ),
          ]
      ),
    );
  }

  Widget buildListDisplay(BuildContext context) {
    List<Widget> toDisplay = <Widget>[
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
      buildCard("test", "test", "assets/discord.png", context),
    ];
    return Flexible(
        child: FractionallySizedBox(
          heightFactor: 0.9,
          widthFactor: 0.9,
          child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                children: toDisplay,
              )
          ),
        )
    );
  }

  Widget buildCard(String title, String params, String asset, BuildContext context) {
    return Container(
        padding: const EdgeInsets.only(
            bottom: 20.0
        ),
        child: Container(
          color: color_list.secondary,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              buildSubCard(title, params, asset, context),
              const Icon(
                Icons.arrow_forward_outlined,
                color: color_list.primary,
                size: 50.0,
              ),
              buildSubCard(title, params, asset, context)
            ],
          )
        )
      );
  }

  Widget buildSubCard(String title, String params, String asset, BuildContext context) {
    return Flexible(
      child: FractionallySizedBox(
        widthFactor: 0.9,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              title,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 40
              ),
            ),
            Text(
              params,
              style: const TextStyle(
                  fontWeight: FontWeight.normal,
                  color: color_list.fourth,
                  fontSize: 20
              ),
            ),
            Container(
              height: 50,
              width: 50,
              decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage(asset),
                      fit: BoxFit.fill
                  )
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildTopPage(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        Expanded(
          child: Stack(
            children: [
              const Center(
                child: Text(
                  'Liste des Areas',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: color_list.fourth,
                    fontSize: 50
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              Positioned(
                right: 8,
                child: IconButton(
                  icon: const Icon(
                    Icons.settings,
                    size: 40.0
                  ),
                  tooltip: 'Retour arrière',
                  onPressed: () {
                    callbackParams(context);
                  },
                ),
              ),
            ],
          ),
        )
      ]
    );
  }
}