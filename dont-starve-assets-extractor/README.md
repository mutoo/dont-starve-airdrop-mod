# Don't Starve Assets Extractor

## Description

For the Don't Starve AirDrop app, we only needs the inventoy images. Which can be found in the Don's Starve installation folder. This tool will extract all the inventory images from the game files.

The default `inventoryimages.tex` can be found at `dontstarve_steam.app/Contents/data/images/inventoryimages.tex`. While it's atlas xml file can be found at `dontstarve_steam.app/Contents/data/databundles/images/inventoryimages.xml`, which comes from `dontstarve_steam.app/Contents/data/databundles/images.zip`.

### Usage

Ensure you have node environment installed.

To extract or update the Don't Starve assets, we firstly copy all the inventory images from above zip to the `dont-starve-assets-extractor/assets` folder. Then run `yarn run extract` command.

All the assets will be extracted to the `dont-starve-assets-client/public/inventory` folder.
