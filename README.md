# Neighborhood Map Project

Neighborhood map is a fully functional website developed using KnockoutJS, Google Maps JavaScript API and MediaWiki action API. It displays a list of locations on a map as a set of markers. This list is filterable by using the provided search box. Neighborhood map has the following capabilities :-
  - Fliter list of locations in real time
  - Get information for a location from Wikipedia
  - Responsive design which works well on smartphones

### Installation

Neighborhood map only requires a modern browser and an internet connection to run. Extract the project and run `index.html`. 

### Adding Custom Data

Adding your own locations to the neighborhood map website is quite simple. Add an entry to the `locations` array in the `script.js` in the following format.

```sh
{
    name: <name>,
    coordinates: {lat: <latitude>, lng: <logitude>},
    wikiName: <name of corresponding Wikipedia article>
}
```