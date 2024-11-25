# YT_PiP_chrome_ext
Google chrome extension allowing picture in picture (video popout) for any video, but added dedicated button for youtube videos. <br>
Use case:<br>
Allows popout video for better use of screen real-estate.<br>

To use it...Load the extension in Chrome:<br>

1. Create a new folder with three files: <br>
manifest.json <br>
background2.js <br>
content.js <br>
Your icon files (icon48.png and icon128.png)<br>

2. Go to chrome://extensions/ <br>
Enable "Developer mode" (top right) <br>
Click "Load unpacked" <br>
Select your extension directory<br>

3. To use click extention in the google chrome toolbar of the webpage containing a Video.<br>
Or use the dedicated PiP button on a youtube video's controls.<br>

Features: <br>
Works on any webpage with video elements <br>
Able to click and drag to move video <br>
Able to resize by clicking and dragging corners/edges<br>
Automatically finds the currently playing video, or defaults to the first video on the page <br>Handles errors gracefully with user feedback Supports toggling PiP mode on/off<br>

The extension uses Chrome's Manifest V3 and modern JavaScript features. <br>
It will work with most HTML5 video players, including YouTube, Vimeo, and other popular video platforms.<br>
