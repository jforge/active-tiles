# Active Tiles

This project provides a simple customizable HTML design for a responsive grid of hyperlink tiles. 
Dynamic replacement of hyperlinks is done using MQTT over Websockets.

![Active Tiles](./img/active-tiles.webp)


## Stack

- Simple HTML5, CSS and few lines of JavaScript
- MQTT over Websockets to dynamically set or replace links in tiles
- Docker Containerization

## Prerequisites

- A browser supporting JavaScript and Websockets
- A backend MQTT broker

## Build & Run

Run the application from any webserver, or create a docker image and start a container.

The initial image size will be ~45 MB based on the `nginx:alpine` base image.

```bash
docker build -t active-tiles .
```

```bash
docker run --rm -d --name active-tiles -p 8047:80 active-tiles
```

Then open `http://localhost:8047` in a browser.

## Structure

The goal of the project is to keep it stupid simple and add required complexity
to some backend as far as possible. 

However, some Javascript will be required to work with MQTT over Websockets.
And a backend server is required to avoid any disclosure of (broker) credentials.

### HTML

The `tile-container` class is used as a grid container. 
Each tile is an anchor element, allowing the whole tile to act as a link.

### CSS

The `tile-container` uses a CSS Grid layout to automatically adjust 
the number of columns based on screen width.

Each tile has a card-like appearance with rounded corners, 
shadow, and a hover effect that makes the tile lift slightly,
providing a visual cue that it is clickable.

For design preferences adjust colors, spacing and fonts.

## Specifics

### Hyperlink security recommendation

The anchor `target` attribute should be set to `_blank` to open the link in a new tab/window depending on the browser's settings.

Although modern browsers should not be affected anymore and some `rel` settings are meanwhile a HTML standard implicit rule, 
it might still be a good idea to prevent possible malicious attacks from the linked pages, by setting the `rel` attribute to `noreferrer noopener`.

The `rel` attribute sets the relationship between your page and the linked URL. 
Setting it to `noopener noreferrer` is to prevent a type of phishing known as `tabnabbing`.

#### What is tabnabbing?

Tabnabbing is an exploit that uses the browser's default behavior with `target="_blank"` to gain partial access to a page through the `window.object` API.

With `tabnabbing`, a linked page could cause your page to redirect to a fake login page. 
This would be hard for most users to notice because the focus would be on the tab that 
just opened – not the original tab with your page.

Then, when a person switches back to the tab with your page, they would see the fake login page instead and might enter their credentials.

For more information about `tabnabbing` see [Alex Yumashev's article](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/)
and [OWASP about tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing).

## References

- [Using MQTT over Websocket](https://www.emqx.com/en/blog/connect-to-mqtt-broker-with-websocket)

