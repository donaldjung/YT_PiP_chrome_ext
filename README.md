# YT_PiP_chrome_ext
Google chrome extension allowing picture in picture (video popout) for any video

To use it...Load the extension in Chrome:

Create a new folder with three files: 
manifest.json 
background2.js 
content.js 
Your icon files (icon48.png and icon128.png)

Go to chrome://extensions/ 
Enable "Developer mode" (top right) 
Click "Load unpacked" 
Select your extension directory

To use click extention in the google chrome toolbar of the webpage containing a Video.
Or use the dedicated PiP button on a youtube video's controls.

Features: Works on any webpage with video elements 
Automatically finds the currently playing video, or defaults to the first video on the page Handles errors gracefully with user feedback Supports toggling PiP mode on/off

The extension uses Chrome's Manifest V3 and modern JavaScript features. 
It will work with most HTML5 video players, including YouTube, Vimeo, and other popular video platforms.
