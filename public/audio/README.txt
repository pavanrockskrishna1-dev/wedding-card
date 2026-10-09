PLACEHOLDER AUDIO FOLDER
========================

The Blessing scene (scene 7) references a background music file at:

  audio/background-music.mp3

No audio file is included in this demo build (no royalty-free track was
bundled to keep the repository small and to avoid licensing issues).

To enable music:
1. Add a royalty-free / licensed MP3 file to this folder.
2. Name it exactly "background-music.mp3" (or update MUSIC_SRC in
   src/config.ts to match your file name).
3. Rebuild the site (npm run build).

Until a file is added, the mute/unmute button in the Blessing scene will
toggle its icon/label, but playback will silently fail (this is handled
gracefully in src/scenes/BlessingScene.tsx — it catches the play() promise
rejection and shows a small hint instead of breaking the page).
