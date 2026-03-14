import { useCallback, useEffect, useRef, useState } from "react";

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionResultListLike {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
  addEventListener: (type: "end", listener: () => void) => void;
  removeEventListener: (type: "end", listener: () => void) => void;
}

interface SpeechRecognitionConstructorLike {
  new (): SpeechRecognitionLike;
}

interface BrowserSpeechWindow extends Window {
  SpeechRecognition?: SpeechRecognitionConstructorLike;
  webkitSpeechRecognition?: SpeechRecognitionConstructorLike;
}

interface UseVoiceRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => Promise<string>;
  resetTranscript: () => void;
  isSupported: boolean;
}

function getSpeechRecognitionConstructor():
  | SpeechRecognitionConstructorLike
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  const browserWindow = window as BrowserSpeechWindow;
  return (
    browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null
  );
}

export function useVoiceRecognition(): UseVoiceRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef("");
  const interimTranscriptRef = useRef("");

  const speechRecognitionConstructor = getSpeechRecognitionConstructor();
  const isSupported = speechRecognitionConstructor !== null;

  useEffect(() => {
    if (!speechRecognitionConstructor) {
      recognitionRef.current = null;
      return;
    }

    try {
      const recognition = new speechRecognitionConstructor();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        transcriptRef.current = "";
        interimTranscriptRef.current = "";
      };

      recognition.onresult = (event) => {
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const transcriptSegment = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            transcriptRef.current += `${transcriptSegment} `;
            setTranscript(transcriptRef.current.trim());
          } else {
            interim += transcriptSegment;
          }
        }

        interimTranscriptRef.current = interim;
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        let errorMsg = `Speech recognition error: ${event.error}`;

        if (event.error === "no-speech") {
          errorMsg = "No speech detected. Please try again and speak clearly.";
        } else if (event.error === "network") {
          errorMsg = "Network error. Please check your internet connection.";
        } else if (event.error === "not-allowed") {
          errorMsg =
            "Microphone access denied. Please allow microphone permissions.";
        }

        setError(errorMsg);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to initialize speech recognition";
      setTimeout(() => setError(errorMsg), 0);
      recognitionRef.current = null;
    }

    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, [speechRecognitionConstructor]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      setError(
        "Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari on iOS.",
      );
      return;
    }

    if (!isListening) {
      try {
        transcriptRef.current = "";
        interimTranscriptRef.current = "";
        setTranscript("");
        setInterimTranscript("");
        setError(null);
        recognitionRef.current.start();
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to start listening";
        setError(errorMsg);
      }
    }
  }, [isListening, isSupported]);

  const stopListening = useCallback(async (): Promise<string> => {
    return new Promise((resolve) => {
      if (recognitionRef.current) {
        const timeoutId = setTimeout(() => {
          const finalStr =
            `${transcriptRef.current} ${interimTranscriptRef.current}`.trim();
          resolve(finalStr);
        }, 300);

        const onEndHandler = () => {
          clearTimeout(timeoutId);
          recognitionRef.current?.removeEventListener("end", onEndHandler);
          const finalStr =
            `${transcriptRef.current} ${interimTranscriptRef.current}`.trim();
          resolve(finalStr);
        };

        recognitionRef.current.addEventListener("end", onEndHandler);

        try {
          recognitionRef.current.stop();
        } catch (err) {
          clearTimeout(timeoutId);
          const errorMsg =
            err instanceof Error ? err.message : "Failed to stop listening";
          setError(errorMsg);
          const finalStr =
            `${transcriptRef.current} ${interimTranscriptRef.current}`.trim();
          resolve(finalStr);
        }
      } else {
        const finalStr =
          `${transcriptRef.current} ${interimTranscriptRef.current}`.trim();
        resolve(finalStr);
      }
    });
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    transcriptRef.current = "";
    interimTranscriptRef.current = "";
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  };
}
