import { useEffect, useRef, useState } from "react";

// The Spotify iFrame API (https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api)
// resizes whatever container element it's given once playback starts, and that resize can override any
// classes/styles we put on that same node. Running it inside its own nested <iframe> instead of directly in
// this page means whatever it resizes is still physically confined to that iframe's box — a real browser
// viewport boundary, not a CSS rule it (or its own script) could ever override — so it can never paint
// outside the tiny hidden box we give it.
const BRIDGE_SOURCE = "parelon-spotify-bridge";

function buildEmbedDoc(initialUri: string) {
  return `<!doctype html>
<html>
<head><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;}</style></head>
<body>
<div id="embed"></div>
<script src="https://open.spotify.com/embed/iframe-api/v1"></script>
<script>
(function () {
  var controller = null;

  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    IFrameAPI.createController(
      document.getElementById("embed"),
      { uri: ${JSON.stringify(initialUri)}, height: "80" },
      function (c) {
        controller = c;
        c.addListener("ready", function () {
          parent.postMessage({ source: "${BRIDGE_SOURCE}", type: "ready" }, "*");
        });
        c.addListener("playback_update", function (e) {
          var isPaused = e && e.data ? e.data.isPaused : undefined;
          parent.postMessage({ source: "${BRIDGE_SOURCE}", type: "playback_update", isPaused: isPaused }, "*");
        });
      }
    );
  };

  window.addEventListener("message", function (e) {
    var msg = e.data;
    if (!msg || msg.source !== "${BRIDGE_SOURCE}-cmd" || !controller) return;
    if (msg.type === "togglePlay") controller.togglePlay();
    if (msg.type === "pause") controller.pause();
    if (msg.type === "loadUri") {
      controller.loadUri(msg.uri);
      setTimeout(function () { controller.play(); }, 150);
    }
  });
})();
</script>
</body>
</html>`;
}

export function useSpotifyEmbed(initialUri: string) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [doc] = useState(() => buildEmbedDoc(initialUri));
  const [ready, setReady] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
      const msg = e.data;
      if (!msg || msg.source !== BRIDGE_SOURCE) return;
      if (msg.type === "ready") setReady(true);
      if (msg.type === "playback_update" && typeof msg.isPaused === "boolean") setIsPaused(msg.isPaused);
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

  function loadTrack(uri: string) {
    post({ type: "loadUri", uri });
  }

  return { iframeRef, doc, ready, isPaused, togglePlay, pause, loadTrack };
}
