import { useEffect, useRef, useState } from "react";

// Mirrors useSpotifyEmbed.ts: the SoundCloud Widget API (https://developers.soundcloud.com/docs/api/html5-widget)
// runs inside its own nested <iframe> so nothing it does can ever paint outside the tiny hidden box we give it.
const BRIDGE_SOURCE = "parelon-soundcloud-bridge";

function buildEmbedDoc(initialUrl: string) {
  const playerSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(initialUrl)}&auto_play=false&show_artwork=false&visual=false&show_comments=false&show_user=false&show_reposts=false&hide_related=true&sharing=false&download=false&buying=false`;

  return `<!doctype html>
<html>
<head><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;}</style></head>
<body>
<iframe id="sc" src="${playerSrc}" width="1" height="1" style="border:0;" allow="autoplay"></iframe>
<script src="https://w.soundcloud.com/player/api.js"></script>
<script>
(function () {
  var widget = null;
  var iframe = document.getElementById("sc");

  function reportCurrentSound() {
    if (!widget) return;
    widget.getCurrentSound(function (sound) {
      if (!sound) return;
      parent.postMessage(
        {
          source: "${BRIDGE_SOURCE}",
          type: "track_info",
          title: sound.title || "",
          artist: sound.user && sound.user.username ? sound.user.username : "",
        },
        "*"
      );
    });
  }

  iframe.addEventListener("load", function () {
    widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.READY, function () {
      parent.postMessage({ source: "${BRIDGE_SOURCE}", type: "ready" }, "*");
      reportCurrentSound();
    });
    widget.bind(SC.Widget.Events.PLAY, function () {
      parent.postMessage({ source: "${BRIDGE_SOURCE}", type: "playback_update", isPaused: false }, "*");
      reportCurrentSound();
    });
    widget.bind(SC.Widget.Events.PAUSE, function () {
      parent.postMessage({ source: "${BRIDGE_SOURCE}", type: "playback_update", isPaused: true }, "*");
    });
    widget.bind(SC.Widget.Events.FINISH, function () {
      parent.postMessage({ source: "${BRIDGE_SOURCE}", type: "playback_update", isPaused: true }, "*");
    });
  });

  window.addEventListener("message", function (e) {
    var msg = e.data;
    if (!msg || msg.source !== "${BRIDGE_SOURCE}-cmd" || !widget) return;
    if (msg.type === "togglePlay") widget.toggle();
    if (msg.type === "pause") widget.pause();
    if (msg.type === "loadUrl") {
      widget.load(msg.url, { auto_play: true, show_artwork: false, visual: false });
    }
  });
})();
</script>
</body>
</html>`;
}

export function useSoundCloudEmbed(initialUrl: string | undefined) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [doc] = useState(() => (initialUrl ? buildEmbedDoc(initialUrl) : undefined));
  const [ready, setReady] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [trackInfo, setTrackInfo] = useState<{ artist: string; title: string } | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
      const msg = e.data;
      if (!msg || msg.source !== BRIDGE_SOURCE) return;
      if (msg.type === "ready") setReady(true);
      if (msg.type === "playback_update" && typeof msg.isPaused === "boolean") setIsPaused(msg.isPaused);
      if (msg.type === "track_info") setTrackInfo({ artist: msg.artist ?? "", title: msg.title ?? "" });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function post(message: Record<string, unknown>) {
    iframeRef.current?.contentWindow?.postMessage({ source: `${BRIDGE_SOURCE}-cmd`, ...message }, "*");
  }

  function togglePlay() {
    post({ type: "togglePlay" });
  }

  function pause() {
    post({ type: "pause" });
  }

  function loadTrack(url: string) {
    post({ type: "loadUrl", url });
  }

  return { iframeRef, doc, ready, isPaused, trackInfo, togglePlay, pause, loadTrack };
}
