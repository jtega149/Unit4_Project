# WEB103 Project 4 - *Unit 4 Project*

Submitted by: **John Ortega**

About this web app: **This is a web app that allows for CRUD operations. More specifically we allow users to build their own car, by being able to select specific exteriors, wheels, roofs, and interiors. Users are also allowed to view all their builds and edit or delete them.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `cars` table.**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `Car` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `car` updates to match the option the user chose.**
- [x] **The price of the `car` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `car`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `car`s.**
- [x] **Users can edit a submitted `car` from the list view of submitted `car`s.**
- [x] **Users can delete a submitted `car` from the list view of submitted `car`s.**
- [x] **Users can update or delete `car`s that have been created from the detail page.**


The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] Created specific tables for the exterior, roof, wheels, and interior. These tables in particular are seeded in

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='client/myGif.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [Kap](https://getkap.co/)
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Was really having trouble trying to copy the exact design the example showed and it was hard to work off of it as well because the example site kept crashing for some reason. I ended up making my own design. Additionally I had trouble deciding whether the parts should just be dynamic or static, but I ended up making it dynamic and having it stored as their own respective tables.

## License

Copyright [2026] [John Ortega]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.