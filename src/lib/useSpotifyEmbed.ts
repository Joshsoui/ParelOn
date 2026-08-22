import { useEffect, useRef, useState } from "react";

// Minimal shape of the Spotify iFrame API (https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api).
// There is no official @types package, so this is typed loosely on purpose.
type PlaybackUpdatePayload = {
  data?: {
    isPaused?: boolean;
    isBuffering?: boolean;
    duration?: number;
    position?: number;
  };
};

type EmbedController = {
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  loadUri: (uri: string) => void;
  addListener: (event: "ready" | "playback_update", cb: (e: PlaybackUpdatePayload) => void) => void;
  destroy: () => void;
};

type IFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: EmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: IFrameAPI) => void;
    SpotifyIframeApi?: IFrameAPI;
  }
}

const SCRIPT_SRC = "https://open.spotify.com/embed/iframe-api/v1";

function loadSpotifyIframeApi(): Promise<IFrameAPI> {
  return new Promise((resolve) => {
    if (window.SpotifyIframeApi) {
      resolve(window.SpotifyIframeApi);
      return;
    }

    const prev = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      window.SpotifyIframeApi = api;
      prev?.(api);
      resolve(api);
    };

    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

export function useSpotifyEmbed(initialUri: string) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<EmbedController | null>(null);
  const [ready, setReady] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let cancelled = false;

    loadSpotifyIframeApi().then((api) => {
      if (cancelled || !mountRef.current) return;

      api.createController(mountRef.current, { uri: initialUri, height: "80" }, (controller) => {
        if (cancelled) return;
        controllerRef.current = controller;

        controller.addListener("ready", () => setReady(true));
        controller.addListener("playback_update", (e) => {
          if (typeof e.data?.isPaused === "boolean") setIsPaused(e.data.isPaused);
        });
      });
    });

    return () => {
      cancelled = true;
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function togglePlay() {
    controllerRef.current?.togglePlay();
  }

  function loadTrack(uri: string) {
    controllerRef.current?.loadUri(uri);
    setTimeout(() => controllerRef.current?.play(), 150);
  }

  return { mountRef, ready, isPaused, togglePlay, loadTrack };
}
